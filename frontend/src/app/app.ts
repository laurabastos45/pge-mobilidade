
import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser,
  CurrencyPipe,
  DecimalPipe
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';

import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import type * as L from 'leaflet';

interface Ride {
  id: number;
  clientId: number;
  clientName?: string;
  driverId?: number;
  driverName?: string;
  origin: string;
  destination: string;
  status: string;
  createdAt?: string;
  distanceKm?: number;
  estimatedPrice?: number;
  estimatedDurationMinutes?: number;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteEstimate {
  distanceKm: number;
  durationMinutes: number;
  estimatedPrice: number;
  coordinates: [number, number][];
}

interface AddressSuggestion {
  label: string;
  lat: number;
  lng: number;
}

interface PhotonFeature {
  properties: {
    name?: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
    city?: string;
    district?: string;
    suburb?: string;
    locality?: string;
    county?: string;
    state?: string;
    country?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

interface PhotonResponse {
  features: PhotonFeature[];
}

type UserRole = 'CLIENT' | 'DRIVER' | null;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  private readonly api = 'https://api-gateway-neov.onrender.com/api/rides';

  private readonly geocodingApi =
    'https://photon.komoot.io/api/';

  private readonly reverseGeocodingApi =
    'https://photon.komoot.io/reverse';

  private reverseGeocodingRequestId = 0;

  private stompClient: Client | null = null;
  private subscriptions = new Set<number>();

  // MAPA
  private leaflet: typeof import('leaflet') | null = null;

  private map: L.Map | null = null;
  private originMarker: L.CircleMarker | null = null;
  private destinationMarker: L.CircleMarker | null = null;
  private routeLine: L.Polyline | null = null;

  originCoordinates: Coordinates | null = null;
  destinationCoordinates: Coordinates | null = null;
  routeEstimate: RouteEstimate | null = null;
  mapMessage = '';
  calculatingRoute = false;

  // BUSCA DE ENDEREÇOS
  originSuggestions: AddressSuggestion[] = [];
  destinationSuggestions: AddressSuggestion[] = [];

  mostrarSugestoesPartida = false;
  mostrarSugestoesDestino = false;

  searchingOrigin = false;
  searchingDestination = false;

  private originSearchTimer: ReturnType<typeof setTimeout> | null = null;
  private destinationSearchTimer: ReturnType<typeof setTimeout> | null = null;

  private originSearchId = 0;
  private destinationSearchId = 0;

  role: UserRole = null;

  clientId = 1;
  driverId = 2;

  clientName = 'Ana Laura';
  driverName = 'Motorista de teste';

  origin = '';
  destination = '';

  currentRide: Ride | null = null;
  rides: Ride[] = [];

  message = '';
  connected = false;
  loading = false;

  acceptingRideId: number | null = null;

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.conectarWebSocket();
    }
  }

  ngOnDestroy(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }

    if (this.originSearchTimer) {
      clearTimeout(this.originSearchTimer);
    }

    if (this.destinationSearchTimer) {
      clearTimeout(this.destinationSearchTimer);
    }

    this.destruirMapa();
  }

  // ==========================================
  // WEBSOCKET
  // ==========================================

  conectarWebSocket(): void {
    this.stompClient = new Client({
      webSocketFactory: () =>
        new SockJS('https://api-gateway-neov.onrender.com/ws') as WebSocket,

      reconnectDelay: 5000,
      debug: () => {}
    });

    this.stompClient.onConnect = () => {
      this.connected = true;

      this.stompClient?.subscribe('/topic/rides', (message: IMessage) => {
        this.receberCorrida(message);
      });

      if (this.role === 'DRIVER') {
        this.carregarCorridasDisponiveis();
      }

      this.changeDetector.detectChanges();
    };

    this.stompClient.onDisconnect = () => {
      this.connected = false;
      this.changeDetector.detectChanges();
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Erro no WebSocket:', frame);
      this.connected = false;
      this.changeDetector.detectChanges();
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('Erro de conexão WebSocket:', error);
      this.connected = false;
      this.changeDetector.detectChanges();
    };

    this.stompClient.activate();
  }

  receberCorrida(message: IMessage): void {
    try {
      const ride: Ride = JSON.parse(message.body);

      if (this.role === 'DRIVER') {
        if (
          ride.status === 'WAITING' ||
          ride.driverId === this.driverId
        ) {
          this.atualizarLista(ride);
        } else {
          this.removerCorrida(ride.id);
        }
      } else if (this.role === 'CLIENT') {
        if (this.currentRide?.id === ride.id) {
          this.currentRide = ride;
        }
      }

      this.changeDetector.detectChanges();

    } catch (error) {
      console.error('Erro ao processar atualização:', error);
    }
  }

  inscreverAtualizacoes(rideId: number): void {
    if (!this.stompClient?.connected) {
      return;
    }

    if (this.subscriptions.has(rideId)) {
      return;
    }

    this.subscriptions.add(rideId);

    this.stompClient.subscribe(
      `/topic/rides/${rideId}`,
      (message: IMessage) => {
        try {
          const ride: Ride = JSON.parse(message.body);

          if (this.role === 'CLIENT') {
            if (this.currentRide?.id === ride.id) {
              this.currentRide = ride;
            }
          } else if (this.role === 'DRIVER') {
            if (
              ride.status === 'WAITING' ||
              ride.driverId === this.driverId
            ) {
              this.atualizarLista(ride);
            } else {
              this.removerCorrida(ride.id);
            }
          }

          this.changeDetector.detectChanges();

        } catch (error) {
          console.error(
            'Erro ao receber atualização da corrida:',
            error
          );
        }
      }
    );
  }

  // ==========================================
  // PERFIS
  // ==========================================

  escolherPerfil(role: 'CLIENT' | 'DRIVER'): void {
    this.role = role;
    this.message = '';

    if (role === 'DRIVER') {
      this.carregarCorridasDisponiveis();
    } else {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          void this.inicializarMapa();
        }, 200);
      }
    }

    this.changeDetector.detectChanges();
  }

  voltarInicio(): void {
    this.destruirMapa();

    this.role = null;
    this.message = '';
    this.acceptingRideId = null;

    this.changeDetector.detectChanges();
  }

  // ==========================================
  // MAPA - INICIALIZAÇÃO
  // ==========================================

  async inicializarMapa(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const elemento = document.getElementById('ride-map');

    if (!elemento) {
      return;
    }

    this.destruirMapa();

    try {
      const L = await import('leaflet');

      this.leaflet = L;

      this.map = L.map(elemento).setView(
        [-14.235, -51.925],
        4
      );

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19
        }
      ).addTo(this.map);

      this.map.on('click', (event: L.LeafletMouseEvent) => {
        this.selecionarPontoNoMapa({
          lat: event.latlng.lat,
          lng: event.latlng.lng
        });
      });

      if (this.originCoordinates) {
        this.atualizarMarcadorPartida();
      }

      if (this.destinationCoordinates) {
        this.atualizarMarcadorDestino();
      }

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);

    } catch (error) {
      console.error('Erro ao inicializar o mapa:', error);
      this.mapMessage = 'Não foi possível carregar o mapa.';
      this.changeDetector.detectChanges();
    }
  }

  destruirMapa(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    this.originMarker = null;
    this.destinationMarker = null;
    this.routeLine = null;
  }

  // ==========================================
  // BUSCA DE ENDEREÇOS
  // ==========================================

  mostrarSugestoes(tipo: 'origin' | 'destination'): void {
    if (tipo === 'origin') {
      this.mostrarSugestoesPartida =
        this.originSuggestions.length > 0;
    } else {
      this.mostrarSugestoesDestino =
        this.destinationSuggestions.length > 0;
    }
  }

  buscarEnderecos(tipo: 'origin' | 'destination'): void {
    const texto = tipo === 'origin'
      ? this.origin.trim()
      : this.destination.trim();

    this.invalidarPonto(tipo);

    if (tipo === 'origin') {
      if (this.originSearchTimer) {
        clearTimeout(this.originSearchTimer);
      }

      this.originSuggestions = [];
      this.mostrarSugestoesPartida = false;

      const requestId = ++this.originSearchId;

      if (texto.length < 3) {
        this.searchingOrigin = false;
        return;
      }

      this.searchingOrigin = true;

      this.originSearchTimer = setTimeout(() => {
        this.consultarEnderecos(texto, tipo, requestId);
      }, 800);

    } else {
      if (this.destinationSearchTimer) {
        clearTimeout(this.destinationSearchTimer);
      }

      this.destinationSuggestions = [];
      this.mostrarSugestoesDestino = false;

      const requestId = ++this.destinationSearchId;

      if (texto.length < 3) {
        this.searchingDestination = false;
        return;
      }

      this.searchingDestination = true;

      this.destinationSearchTimer = setTimeout(() => {
        this.consultarEnderecos(texto, tipo, requestId);
      }, 800);
    }
  }

  private formatarEndereco(feature: PhotonFeature): string {
    const p = feature.properties || {};

    const rua = [
      p.street,
      p.housenumber
    ].filter(Boolean).join(', ');

    const nome = p.name && p.name !== p.street
      ? p.name
      : rua || p.name;

    const partes = [
      nome,
      p.district || p.suburb,
      p.city || p.locality || p.county,
      p.state,
      p.country
    ].filter(Boolean);

    return [...new Set(partes)].join(' - ');
  }

  private consultarEnderecos(
    texto: string,
    tipo: 'origin' | 'destination',
    requestId: number
  ): void {

    const params = new HttpParams()
      .set('q', texto)
      .set('limit', '5')
      .set('lang', 'default');

    this.http.get<PhotonResponse>(
      this.geocodingApi,
      { params }
    ).subscribe({
      next: (response) => {

        if (
          tipo === 'origin' &&
          requestId !== this.originSearchId
        ) {
          return;
        }

        if (
          tipo === 'destination' &&
          requestId !== this.destinationSearchId
        ) {
          return;
        }

        const sugestoes: AddressSuggestion[] =
          (response.features || []).map(feature => {
            const coordenadas = feature.geometry.coordinates;

            return {
              label: this.formatarEndereco(feature),
              lng: coordenadas[0],
              lat: coordenadas[1]
            };
          }).filter(item =>
            item.label &&
            Number.isFinite(item.lat) &&
            Number.isFinite(item.lng)
          );

        if (tipo === 'origin') {
          this.originSuggestions = sugestoes;
          this.mostrarSugestoesPartida =
            sugestoes.length > 0;
          this.searchingOrigin = false;
        } else {
          this.destinationSuggestions = sugestoes;
          this.mostrarSugestoesDestino =
            sugestoes.length > 0;
          this.searchingDestination = false;
        }

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao buscar endereço:', error);

        if (
          tipo === 'origin' &&
          requestId === this.originSearchId
        ) {
          this.originSuggestions = [];
          this.mostrarSugestoesPartida = false;
          this.searchingOrigin = false;
        }

        if (
          tipo === 'destination' &&
          requestId === this.destinationSearchId
        ) {
          this.destinationSuggestions = [];
          this.mostrarSugestoesDestino = false;
          this.searchingDestination = false;
        }

        this.changeDetector.detectChanges();
      }
    });
  }

  selecionarEndereco(
    tipo: 'origin' | 'destination',
    endereco: AddressSuggestion
  ): void {

    const coordinates: Coordinates = {
      lat: endereco.lat,
      lng: endereco.lng
    };

    if (tipo === 'origin') {
      this.origin = endereco.label;
      this.originSuggestions = [];
      this.mostrarSugestoesPartida = false;
      this.searchingOrigin = false;

      this.originSearchId++;

      if (this.originSearchTimer) {
        clearTimeout(this.originSearchTimer);
      }

      this.definirPartida(coordinates, endereco.label);

    } else {
      this.destination = endereco.label;
      this.destinationSuggestions = [];
      this.mostrarSugestoesDestino = false;
      this.searchingDestination = false;

      this.destinationSearchId++;

      if (this.destinationSearchTimer) {
        clearTimeout(this.destinationSearchTimer);
      }

      this.definirDestino(coordinates, endereco.label);
    }

    this.mapMessage = '';

    if (
      this.originCoordinates &&
      this.destinationCoordinates
    ) {
      this.mapMessage = 'Calculando sua rota...';
      this.calcularEstimativa();
    } else if (this.map) {
      this.map.setView(
        [coordinates.lat, coordinates.lng],
        15
      );
    }

    this.changeDetector.detectChanges();
  }

  private invalidarPonto(
    tipo: 'origin' | 'destination'
  ): void {

    if (tipo === 'origin') {
      this.originCoordinates = null;
      this.originMarker?.remove();
      this.originMarker = null;
      this.originSearchId++;
    } else {
      this.destinationCoordinates = null;
      this.destinationMarker?.remove();
      this.destinationMarker = null;
      this.destinationSearchId++;
    }

    this.routeLine?.remove();
    this.routeLine = null;
    this.routeEstimate = null;
    this.mapMessage = '';
  }

  // ==========================================
  // MAPA - SELECIONAR PARTIDA E DESTINO
  // ==========================================

  selecionarPontoNoMapa(coordinates: Coordinates): void {
    if (!this.originCoordinates) {
      this.definirPartida(coordinates);
      this.buscarNomeDoEndereco(coordinates);

      this.mapMessage =
        'Partida selecionada! Buscando endereço...';

      this.changeDetector.detectChanges();
      return;
    }

    if (!this.destinationCoordinates) {
      this.definirDestino(coordinates);
      this.buscarNomeDoDestino(coordinates);

      this.mapMessage = 'Calculando sua rota...';
      this.calcularEstimativa();
      return;
    }

    this.limparRota();
    this.definirPartida(coordinates);
    this.buscarNomeDoEndereco(coordinates);

    this.mapMessage =
      'Nova partida selecionada! Buscando endereço...';

    this.changeDetector.detectChanges();
  }

  definirPartida(
    coordinates: Coordinates,
    label?: string
  ): void {

    this.originCoordinates = coordinates;

    this.origin = label || 'Buscando endereço...';

    this.atualizarMarcadorPartida();
  }

  definirDestino(
    coordinates: Coordinates,
    label?: string
  ): void {

    this.destinationCoordinates = coordinates;

    this.destination = label || 'Buscando endereço...';

    this.atualizarMarcadorDestino();
  }

  private atualizarMarcadorPartida(): void {
    if (!this.leaflet || !this.map || !this.originCoordinates) {
      return;
    }

    const coordinates = this.originCoordinates;

    this.originMarker?.remove();

    this.originMarker = this.leaflet.circleMarker(
      [coordinates.lat, coordinates.lng],
      {
        radius: 9,
        color: '#ffffff',
        weight: 3,
        fillColor: '#16a34a',
        fillOpacity: 1
      }
    ).addTo(this.map);

    this.originMarker.bindPopup('Local de partida');
  }

  private atualizarMarcadorDestino(): void {
    if (!this.leaflet || !this.map || !this.destinationCoordinates) {
      return;
    }

    const coordinates = this.destinationCoordinates;

    this.destinationMarker?.remove();

    this.destinationMarker = this.leaflet.circleMarker(
      [coordinates.lat, coordinates.lng],
      {
        radius: 9,
        color: '#ffffff',
        weight: 3,
        fillColor: '#dc2626',
        fillOpacity: 1
      }
    ).addTo(this.map);

    this.destinationMarker.bindPopup('Destino');
  }

  // ==========================================
  // CONVERTER COORDENADAS EM ENDEREÇO
  // ==========================================

  private buscarNomeDoEndereco(coordinates: Coordinates): void {
    const requestId = ++this.reverseGeocodingRequestId;

    const params = new HttpParams()
      .set('lat', coordinates.lat.toString())
      .set('lon', coordinates.lng.toString())
      .set('lang', 'default');

    this.http.get<PhotonResponse>(
      this.reverseGeocodingApi,
      { params }
    ).subscribe({
      next: (response) => {
        console.log('Resposta da busca de endereço:', response);

        if (requestId !== this.reverseGeocodingRequestId) {
          return;
        }

        if (
          !this.originCoordinates ||
          this.originCoordinates.lat !== coordinates.lat ||
          this.originCoordinates.lng !== coordinates.lng
        ) {
          return;
        }

        const feature = response.features?.[0];

        if (feature) {
          const endereco = this.formatarEndereco(feature);

          if (endereco) {
            this.origin = endereco;
            this.mapMessage =
              'Endereço da sua localização identificado. Escolha o destino.';
          } else {
            this.origin = 'Endereço não identificado';
            this.mapMessage =
              'Não foi possível identificar o endereço. Você pode digitá-lo manualmente.';
          }
        } else {
          this.origin = 'Endereço não identificado';
          this.mapMessage =
            'Não foi possível identificar o endereço. Você pode digitá-lo manualmente.';
        }

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao converter localização em endereço:', error);

        if (requestId === this.reverseGeocodingRequestId) {
          this.origin = 'Endereço não identificado';
          this.mapMessage =
            'Não foi possível buscar o nome da rua. Você pode informar o endereço manualmente.';

          this.changeDetector.detectChanges();
        }
      }
    });
  }

  private buscarNomeDoDestino(coordinates: Coordinates): void {
    const params = new HttpParams()
      .set('lat', coordinates.lat.toString())
      .set('lon', coordinates.lng.toString())
      .set('lang', 'default');

    this.http.get<PhotonResponse>(
      this.reverseGeocodingApi,
      { params }
    ).subscribe({
      next: (response) => {
        if (
          !this.destinationCoordinates ||
          this.destinationCoordinates.lat !== coordinates.lat ||
          this.destinationCoordinates.lng !== coordinates.lng
        ) {
          return;
        }

        const feature = response.features?.[0];
        const endereco = feature
          ? this.formatarEndereco(feature)
          : '';

        this.destination = endereco || 'Endereço não identificado';

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao buscar endereço do destino:', error);
        this.destination = 'Endereço não identificado';
        this.changeDetector.detectChanges();
      }
    });
  }

  // ==========================================
  // MAPA - LOCALIZAÇÃO ATUAL
  // ==========================================

  usarMinhaLocalizacao(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!navigator.geolocation) {
      this.mapMessage =
        'Seu navegador não oferece suporte à localização.';
      return;
    }

    this.mapMessage = 'Obtendo sua localização...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.limparRota();
        this.definirPartida(coordinates);

        this.map?.setView(
          [coordinates.lat, coordinates.lng],
          16
        );

        this.mapMessage =
          'Localização definida. Buscando o endereço...';

        this.buscarNomeDoEndereco(coordinates);
        this.changeDetector.detectChanges();
      },

      (error) => {
        console.error('Erro ao obter localização:', error);

        if (error.code === error.PERMISSION_DENIED) {
          this.mapMessage =
            'Permita o acesso à localização no navegador para utilizar esse recurso.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          this.mapMessage =
            'Não foi possível identificar sua localização.';
        } else {
          this.mapMessage =
            'O tempo para obter sua localização terminou. Tente novamente.';
        }

        this.changeDetector.detectChanges();
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  }

  // ==========================================
  // MAPA - CALCULAR DISTÂNCIA E PREÇO
  // ==========================================

  calcularEstimativa(): void {
    if (!this.originCoordinates || !this.destinationCoordinates) {
      return;
    }

    if (this.calculatingRoute) {
      return;
    }

    this.calculatingRoute = true;
    this.routeEstimate = null;

    const params = new HttpParams()
      .set('originLat', this.originCoordinates.lat.toString())
      .set('originLng', this.originCoordinates.lng.toString())
      .set('destinationLat', this.destinationCoordinates.lat.toString())
      .set('destinationLng', this.destinationCoordinates.lng.toString());

    this.http.get<RouteEstimate>(
      `${this.api}/estimate`,
      { params }
    )
    .pipe(
      finalize(() => {
        this.calculatingRoute = false;
        this.changeDetector.detectChanges();
      })
    )
    .subscribe({
      next: (estimate) => {
        this.routeEstimate = estimate;

        this.desenharRota(estimate.coordinates);

        this.mapMessage = 'Rota calculada com sucesso!';

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao calcular rota:', error);

        this.routeEstimate = null;

        this.mapMessage =
          error.error?.detail ||
          error.error?.message ||
          'Não foi possível calcular a rota. Verifique se o serviço de rotas está disponível.';

        this.changeDetector.detectChanges();
      }
    });
  }

  desenharRota(coordinates: [number, number][]): void {
    if (
      !this.map ||
      !this.leaflet ||
      !coordinates ||
      coordinates.length === 0
    ) {
      return;
    }

    this.routeLine?.remove();

    const pontos = coordinates.map(
      coordinate => [
        coordinate[1],
        coordinate[0]
      ] as L.LatLngExpression
    );

    this.routeLine = this.leaflet.polyline(
      pontos,
      {
        color: '#2563eb',
        weight: 5,
        opacity: 0.85
      }
    ).addTo(this.map);

    this.map.fitBounds(
      this.routeLine.getBounds(),
      {
        padding: [35, 35]
      }
    );
  }

  // ==========================================
  // MAPA - LIMPAR ROTA
  // ==========================================

  limparRota(): void {
    this.reverseGeocodingRequestId++;

    this.originCoordinates = null;
    this.destinationCoordinates = null;

    this.routeEstimate = null;

    this.origin = '';
    this.destination = '';

    this.originSuggestions = [];
    this.destinationSuggestions = [];

    this.mostrarSugestoesPartida = false;
    this.mostrarSugestoesDestino = false;

    this.searchingOrigin = false;
    this.searchingDestination = false;

    this.originSearchId++;
    this.destinationSearchId++;

    if (this.originSearchTimer) {
      clearTimeout(this.originSearchTimer);
      this.originSearchTimer = null;
    }

    if (this.destinationSearchTimer) {
      clearTimeout(this.destinationSearchTimer);
      this.destinationSearchTimer = null;
    }

    this.mapMessage = '';

    this.originMarker?.remove();
    this.destinationMarker?.remove();
    this.routeLine?.remove();

    this.originMarker = null;
    this.destinationMarker = null;
    this.routeLine = null;

    this.changeDetector.detectChanges();
  }

  // ==========================================
  // SOLICITAR CORRIDA - CLIENTE
  // ==========================================

  solicitarCorrida(): void {
    if (!this.origin.trim() || !this.destination.trim()) {
      this.message =
        'Selecione o local de partida e o destino.';
      return;
    }

    if (!this.originCoordinates || !this.destinationCoordinates) {
      this.message =
        'Selecione um endereço válido nas sugestões ou escolha os pontos no mapa.';
      return;
    }

    if (!this.routeEstimate) {
      this.message =
        'Aguarde o cálculo da distância e do valor da corrida.';
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.message = 'Solicitando corrida...';

    const request = {
      clientId: this.clientId,
      origin: this.origin.trim(),
      destination: this.destination.trim(),
      originLat: this.originCoordinates.lat,
      originLng: this.originCoordinates.lng,
      destinationLat: this.destinationCoordinates.lat,
      destinationLng: this.destinationCoordinates.lng
    };

    this.http.post<Ride>(this.api, request)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetector.detectChanges();
        })
      )
      .subscribe({
        next: (ride) => {
          this.currentRide = ride;

          this.inscreverAtualizacoes(ride.id);

          this.message =
            'Corrida solicitada com sucesso!';

          this.limparRota();

          this.changeDetector.detectChanges();
        },

        error: (error) => {
          console.error('Erro ao solicitar corrida:', error);

          this.message =
            error.error?.message ||
            error.error?.detail ||
            'Não foi possível solicitar a corrida.';

          this.changeDetector.detectChanges();
        }
      });
  }

  // ==========================================
  // CARREGAR CORRIDAS DISPONÍVEIS - MOTORISTA
  // ==========================================

  carregarCorridasDisponiveis(): void {
    this.http.get<Ride[]>(`${this.api}/available`)
      .subscribe({
        next: (corridas) => {

          const minhasAtivas = this.rides.filter(ride =>
            ride.driverId === this.driverId &&
            (
              ride.status === 'ACCEPTED' ||
              ride.status === 'IN_PROGRESS'
            )
          );

          const corridasDisponiveis = corridas.filter(
            corrida => corrida.status === 'WAITING'
          );

          this.rides = [
            ...corridasDisponiveis,
            ...minhasAtivas.filter(ativa =>
              !corridasDisponiveis.some(
                disponivel => disponivel.id === ativa.id
              )
            )
          ];

          this.rides.forEach(ride => {
            this.inscreverAtualizacoes(ride.id);
          });

          this.changeDetector.detectChanges();
        },

        error: (error) => {
          console.error('Erro ao carregar corridas:', error);

          this.message =
            'Não foi possível carregar as solicitações.';

          this.changeDetector.detectChanges();
        }
      });
  }

  // ==========================================
  // ACEITAR CORRIDA - MOTORISTA
  // ==========================================

  aceitarCorrida(rideId: number): void {
    if (this.acceptingRideId !== null) {
      return;
    }

    if (this.possuiCorridaAtiva) {
      this.message =
        'Você já possui uma corrida ativa. Finalize-a antes de aceitar outra.';

      this.changeDetector.detectChanges();
      return;
    }

    this.acceptingRideId = rideId;
    this.message = 'Aceitando corrida...';

    this.http.patch<Ride>(
      `${this.api}/${rideId}/accept`,
      {
        driverId: this.driverId
      }
    )
    .pipe(
      finalize(() => {
        this.acceptingRideId = null;
        this.changeDetector.detectChanges();
      })
    )
    .subscribe({
      next: (ride) => {
        this.atualizarLista(ride);
        this.inscreverAtualizacoes(ride.id);

        this.message =
          `Corrida #${rideId} aceita com sucesso!`;

        this.carregarCorridasDisponiveis();

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao aceitar corrida:', error);

        if (error.status === 409) {
          this.message =
            error.error?.detail ||
            error.error?.message ||
            'Você já possui uma corrida ativa ou esta corrida não está mais disponível.';
        } else {
          this.message =
            error.error?.detail ||
            error.error?.message ||
            'Não foi possível aceitar a corrida.';
        }

        this.carregarCorridasDisponiveis();

        this.changeDetector.detectChanges();
      }
    });
  }

  // ==========================================
  // INICIAR CORRIDA
  // ==========================================

  iniciarCorrida(rideId: number): void {
    this.http.patch<Ride>(
      `${this.api}/${rideId}/start`,
      {}
    ).subscribe({
      next: (ride) => {
        this.atualizarLista(ride);

        this.message =
          `Corrida #${rideId} iniciada!`;

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao iniciar corrida:', error);

        this.message =
          error.error?.detail ||
          'Não foi possível iniciar a corrida.';

        this.changeDetector.detectChanges();
      }
    });
  }

  // ==========================================
  // FINALIZAR CORRIDA
  // ==========================================

  finalizarCorrida(rideId: number): void {
    this.http.patch<Ride>(
      `${this.api}/${rideId}/complete`,
      {}
    ).subscribe({
      next: (ride) => {
        this.atualizarLista(ride);

        this.message =
          `Corrida #${rideId} finalizada com sucesso!`;

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao finalizar corrida:', error);

        this.message =
          error.error?.detail ||
          'Não foi possível finalizar a corrida.';

        this.changeDetector.detectChanges();
      }
    });
  }

  // ==========================================
  // ATUALIZAR LISTA DE CORRIDAS
  // ==========================================

  atualizarLista(ride: Ride): void {
    const index = this.rides.findIndex(
      item => item.id === ride.id
    );

    if (index >= 0) {
      this.rides[index] = ride;
    } else {
      this.rides = [...this.rides, ride];
    }

    this.changeDetector.detectChanges();
  }

  removerCorrida(rideId: number): void {
    this.rides = this.rides.filter(
      ride => ride.id !== rideId
    );

    this.changeDetector.detectChanges();
  }

  // ==========================================
  // GETTERS
  // ==========================================

  get corridasDisponiveis(): Ride[] {
    return this.rides.filter(
      ride => ride.status === 'WAITING'
    );
  }

  get minhasCorridas(): Ride[] {
    return this.rides.filter(
      ride =>
        ride.driverId === this.driverId &&
        (
          ride.status === 'ACCEPTED' ||
          ride.status === 'IN_PROGRESS'
        )
    );
  }

  get possuiCorridaAtiva(): boolean {
    return this.minhasCorridas.some(
      ride =>
        ride.status === 'ACCEPTED' ||
        ride.status === 'IN_PROGRESS'
    );
  }

  // ==========================================
  // TRADUZIR STATUS
  // ==========================================

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      WAITING: 'Aguardando motorista',
      ACCEPTED: 'Motorista a caminho',
      IN_PROGRESS: 'Viagem em andamento',
      COMPLETED: 'Viagem finalizada',
      CANCELLED: 'Viagem cancelada'
    };

    return labels[status] || status;
  }
}

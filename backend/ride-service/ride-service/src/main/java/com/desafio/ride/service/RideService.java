
package com.desafio.ride.service;

import com.desafio.ride.client.AccountClient;
import com.desafio.ride.dto.RideRequest;
import com.desafio.ride.entity.Ride;
import com.desafio.ride.entity.RideStatus;
import com.desafio.ride.repository.RideRepository;
import com.desafio.ride.messaging.RideMessageProducer;
import com.desafio.ride.messaging.RideNotificationService;
import com.desafio.ride.redis.RideRedisService;

import feign.FeignException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
public class RideService {

    private static final Logger log = LoggerFactory.getLogger(RideService.class);

    private final RideRepository rideRepository;
    private final AccountClient accountClient;
    private final RideMessageProducer rideMessageProducer;
    private final RideRedisService rideRedisService;
    private final RideNotificationService rideNotificationService;
    private final RouteService routeService;

    public RideService(
            RideRepository rideRepository,
            AccountClient accountClient,
            RideMessageProducer rideMessageProducer,
            RideRedisService rideRedisService,
            RideNotificationService rideNotificationService,
            RouteService routeService) {

        this.rideRepository = rideRepository;
        this.accountClient = accountClient;
        this.rideMessageProducer = rideMessageProducer;
        this.rideRedisService = rideRedisService;
        this.rideNotificationService = rideNotificationService;
        this.routeService = routeService;
    }

    public Ride solicitarCorrida(RideRequest request) {

        if (request.origin() == null || request.origin().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O endereço de origem é obrigatório"
            );
        }

        if (request.destination() == null || request.destination().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O endereço de destino é obrigatório"
            );
        }

        if (request.origin().trim().equalsIgnoreCase(request.destination().trim())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A origem e o destino não podem ser iguais"
            );
        }

        validarCoordenadas(
                request.originLat(),
                request.originLng(),
                request.destinationLat(),
                request.destinationLng()
        );

        Map<String, Object> cliente =
                buscarContaValidada(request.clientId(), "CLIENTE");

        RouteService.RouteResult estimativa;

        try {
            estimativa = routeService.calcularRota(
                    request.originLat(),
                    request.originLng(),
                    request.destinationLat(),
                    request.destinationLng()
            );
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Não foi possível calcular a rota informada"
            );
        }

        Ride ride = new Ride();

        ride.setClientId(request.clientId());
        ride.setClientName(obterNome(cliente, request.clientId(), "Cliente"));

        ride.setOrigin(request.origin().trim());
        ride.setDestination(request.destination().trim());

        ride.setOriginLat(request.originLat());
        ride.setOriginLng(request.originLng());
        ride.setDestinationLat(request.destinationLat());
        ride.setDestinationLng(request.destinationLng());

        ride.setDistanceKm(estimativa.distanceKm());
        ride.setEstimatedDurationMinutes(estimativa.durationMinutes());
        ride.setEstimatedPrice(estimativa.estimatedPrice());

        ride.setStatus(RideStatus.WAITING);

        Ride corridaSalva = rideRepository.save(ride);

        rideRedisService.salvarStatus(
                corridaSalva.getId(),
                corridaSalva.getStatus().name()
        );

        rideNotificationService.notificarMotoristas(corridaSalva);
        rideNotificationService.notificarCliente(corridaSalva);

        rideMessageProducer.enviarCorrida(corridaSalva.getId());

        return corridaSalva;
    }

    private void validarCoordenadas(
            Double originLat,
            Double originLng,
            Double destinationLat,
            Double destinationLng) {

        if (originLat == null || originLng == null
                || destinationLat == null || destinationLng == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Selecione a partida e o destino no mapa"
            );
        }

        if (!Double.isFinite(originLat) || !Double.isFinite(originLng)
                || !Double.isFinite(destinationLat) || !Double.isFinite(destinationLng)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "As coordenadas informadas são inválidas"
            );
        }

        if (originLat < -90 || originLat > 90
                || destinationLat < -90 || destinationLat > 90
                || originLng < -180 || originLng > 180
                || destinationLng < -180 || destinationLng > 180) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "As coordenadas estão fora dos limites permitidos"
            );
        }

        if (originLat.equals(destinationLat)
                && originLng.equals(destinationLng)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A partida e o destino não podem ser o mesmo ponto"
            );
        }
    }

    public List<Ride> listarCorridasDisponiveis() {
        return rideRepository.findByStatus(RideStatus.WAITING);
    }

    public List<Ride> listarCorridasAtivasDoMotorista(Long driverId) {
        return rideRepository.findByDriverIdAndStatusIn(
                driverId,
                List.of(RideStatus.ACCEPTED, RideStatus.IN_PROGRESS)
        );
    }

    public Ride aceitarCorrida(Long rideId, Long driverId) {

        Map<String, Object> motorista =
                buscarContaValidada(driverId, "MOTORISTA");

        Boolean bloqueada = rideRedisService.bloquearCorrida(rideId);

        if (!Boolean.TRUE.equals(bloqueada)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Outro motorista está tentando aceitar essa corrida"
            );
        }

        try {
            Ride ride = rideRepository.findById(rideId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Corrida não encontrada"
                    ));

            if (ride.getStatus() != RideStatus.WAITING) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Essa corrida não está disponível"
                );
            }

            boolean motoristaPossuiCorridaAtiva =
                    rideRepository.existsByDriverIdAndStatusIn(
                            driverId,
                            List.of(RideStatus.ACCEPTED, RideStatus.IN_PROGRESS)
                    );

            if (motoristaPossuiCorridaAtiva) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Você já possui uma corrida ativa. Finalize-a antes de aceitar outra."
                );
            }

            ride.setDriverId(driverId);
            ride.setDriverName(obterNome(motorista, driverId, "Motorista"));
            ride.setStatus(RideStatus.ACCEPTED);

            Ride corridaSalva = rideRepository.save(ride);

            rideRedisService.salvarStatus(
                    corridaSalva.getId(),
                    corridaSalva.getStatus().name()
            );

            rideNotificationService.notificarCliente(corridaSalva);

            return corridaSalva;

        } finally {
            rideRedisService.desbloquearCorrida(rideId);
        }
    }

    public Ride iniciarCorrida(Long rideId) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Corrida não encontrada"
                ));

        if (ride.getStatus() != RideStatus.ACCEPTED) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A corrida precisa estar aceita para iniciar"
            );
        }

        ride.setStatus(RideStatus.IN_PROGRESS);

        Ride corridaSalva = rideRepository.save(ride);

        rideRedisService.salvarStatus(
                corridaSalva.getId(),
                corridaSalva.getStatus().name()
        );

        rideNotificationService.notificarCliente(corridaSalva);

        return corridaSalva;
    }

    public Ride finalizarCorrida(Long rideId) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Corrida não encontrada"
                ));

        if (ride.getStatus() != RideStatus.IN_PROGRESS) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A corrida precisa estar em andamento para finalizar"
            );
        }

        ride.setStatus(RideStatus.COMPLETED);

        Ride corridaSalva = rideRepository.save(ride);

        rideRedisService.salvarStatus(
                corridaSalva.getId(),
                corridaSalva.getStatus().name()
        );

        rideNotificationService.notificarCliente(corridaSalva);

        return corridaSalva;
    }

    private Map<String, Object> buscarContaValidada(
            Long accountId,
            String tipoEsperado) {

        if (accountId == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O ID da conta é obrigatório"
            );
        }

        try {
            Map<String, Object> conta = accountClient.buscarConta(accountId);

            String tipo = (String) conta.get("tipo");

            if (!tipoEsperado.equals(tipo)) {
                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "Usuário não possui permissão para essa operação"
                );
            }

            return conta;

        } catch (FeignException.NotFound exception) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Conta não encontrada"
            );
        } catch (FeignException exception) {
            log.error("Falha ao consultar o Account Service (conta {}): status={} mensagem={}",
                    accountId, exception.status(), exception.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Serviço de contas temporariamente indisponível. Tente novamente."
            );
        }
    }

    private String obterNome(
            Map<String, Object> conta,
            Long accountId,
            String tipo) {

        Object nome = conta.get("nome");

        if (nome == null || nome.toString().isBlank()) {
            return tipo + " " + accountId;
        }

        return nome.toString();
    }
}

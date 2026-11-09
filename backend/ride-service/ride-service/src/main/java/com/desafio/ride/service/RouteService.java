
package com.desafio.ride.service;

import tools.jackson.databind.JsonNode;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class RouteService {

    private final RestClient restClient;

    private static final BigDecimal TARIFA_BASE =
            new BigDecimal("5.00");

    private static final BigDecimal PRECO_POR_KM =
            new BigDecimal("2.00");

    // Cache para evitar consultas repetidas ao OSRM
    private final ConcurrentMap<RouteKey, RouteResult> cache =
            new ConcurrentHashMap<>();

    public RouteService() {

        SimpleClientHttpRequestFactory requestFactory =
                new SimpleClientHttpRequestFactory();

        // Tempo máximo para estabelecer conexão
        requestFactory.setConnectTimeout(Duration.ofSeconds(3));

        // Tempo máximo aguardando resposta
        requestFactory.setReadTimeout(Duration.ofSeconds(8));

        this.restClient = RestClient.builder()
                .requestFactory(requestFactory)
                .build();
    }

    public RouteResult calcularRota(
            double origemLat,
            double origemLng,
            double destinoLat,
            double destinoLng) {

        validarCoordenadas(origemLat, origemLng);
        validarCoordenadas(destinoLat, destinoLng);

        RouteKey chave = criarChave(
                origemLat,
                origemLng,
                destinoLat,
                destinoLng
        );

        // Verifica se a rota já está armazenada
        RouteResult rotaSalva = cache.get(chave);

        if (rotaSalva != null) {
            return rotaSalva;
        }

        String url = String.format(
                Locale.US,
                "https://router.project-osrm.org/route/v1/driving/%f,%f;%f,%f?overview=full&geometries=geojson",
                origemLng,
                origemLat,
                destinoLng,
                destinoLat
        );

        JsonNode response = restClient.get()
                .uri(url)
                .retrieve()
                .body(JsonNode.class);

        if (response == null ||
                !"Ok".equals(response.path("code").asText()) ||
                response.path("routes").isEmpty()) {

            throw new IllegalArgumentException(
                    "Não foi possível encontrar uma rota entre os locais informados."
            );
        }

        JsonNode route = response.path("routes").get(0);

        double distanceMeters = route.path("distance").asDouble();
        double durationSeconds = route.path("duration").asDouble();

        double distanceKm = distanceMeters / 1000.0;
        double durationMinutes = durationSeconds / 60.0;

        BigDecimal distance = BigDecimal.valueOf(distanceKm);

        BigDecimal price = TARIFA_BASE.add(
                distance.multiply(PRECO_POR_KM)
        ).setScale(2, RoundingMode.HALF_UP);

        List<List<Double>> coordinates = new ArrayList<>();

        JsonNode points = route.path("geometry").path("coordinates");

        for (JsonNode point : points) {

            List<Double> coordinate = new ArrayList<>();

            coordinate.add(point.get(0).asDouble());
            coordinate.add(point.get(1).asDouble());

            coordinates.add(List.copyOf(coordinate));
        }

        RouteResult resultado = new RouteResult(
                distanceKm,
                durationMinutes,
                price,
                List.copyOf(coordinates)
        );

        // Limita o tamanho do cache
        if (cache.size() >= 500) {
            cache.clear();
        }

        cache.put(chave, resultado);

        return resultado;
    }

    private RouteKey criarChave(
            double origemLat,
            double origemLng,
            double destinoLat,
            double destinoLng) {

        return new RouteKey(
                arredondarCoordenada(origemLat),
                arredondarCoordenada(origemLng),
                arredondarCoordenada(destinoLat),
                arredondarCoordenada(destinoLng)
        );
    }

    private double arredondarCoordenada(double valor) {
        return BigDecimal.valueOf(valor)
                .setScale(5, RoundingMode.HALF_UP)
                .doubleValue();
    }

    private void validarCoordenadas(
            double latitude,
            double longitude) {

        if (!Double.isFinite(latitude) ||
                !Double.isFinite(longitude) ||
                latitude < -90 || latitude > 90 ||
                longitude < -180 || longitude > 180) {

            throw new IllegalArgumentException(
                    "Coordenadas inválidas."
            );
        }
    }

    private record RouteKey(
            double origemLat,
            double origemLng,
            double destinoLat,
            double destinoLng
    ) {}

    public record RouteResult(
            double distanceKm,
            double durationMinutes,
            BigDecimal estimatedPrice,
            List<List<Double>> coordinates
    ) {}
}


package com.desafio.ride.service;

import com.desafio.ride.client.AccountClient;
import com.desafio.ride.dto.RideRequest;
import com.desafio.ride.entity.Ride;
import com.desafio.ride.entity.RideStatus;
import com.desafio.ride.messaging.RideMessageProducer;
import com.desafio.ride.messaging.RideNotificationService;
import com.desafio.ride.redis.RideRedisService;
import com.desafio.ride.repository.RideRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RideServiceTest {

    @Mock
    private RideRepository rideRepository;

    @Mock
    private AccountClient accountClient;

    @Mock
    private RideMessageProducer rideMessageProducer;

    @Mock
    private RideRedisService rideRedisService;

    @Mock
    private RideNotificationService rideNotificationService;

    @Mock
    private RouteService routeService;

    private RideService rideService;

    @BeforeEach
    void configurar() {
        rideService = new RideService(
                rideRepository,
                accountClient,
                rideMessageProducer,
                rideRedisService,
                rideNotificationService,
                routeService
        );
    }

    private RideRequest criarRequest(
            Long clientId,
            String origin,
            String destination) {

        return new RideRequest(
                clientId,
                origin,
                destination,
                -3.7319,
                -38.5267,
                -3.7400,
                -38.5200
        );
    }

    @Test
    void deveCriarCorridaComSucesso() {

        when(accountClient.buscarConta(1L))
                .thenReturn(Map.of("tipo", "CLIENTE"));

        when(routeService.calcularRota(
                -3.7319, -38.5267, -3.7400, -38.5200
        )).thenReturn(
                new RouteService.RouteResult(
                        10.0,
                        20.0,
                        new BigDecimal("25.00"),
                        List.of(
                                List.of(-38.5267, -3.7319),
                                List.of(-38.5200, -3.7400)
                        )
                )
        );

        when(rideRepository.save(any(Ride.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        RideRequest request = criarRequest(
                1L,
                "Centro",
                "Aeroporto"
        );

        Ride resultado = rideService.solicitarCorrida(request);

        assertNotNull(resultado);
        assertEquals(RideStatus.WAITING, resultado.getStatus());
        assertEquals("Centro", resultado.getOrigin());
        assertEquals("Aeroporto", resultado.getDestination());
        assertEquals(10.0, resultado.getDistanceKm());
        assertEquals(20.0, resultado.getEstimatedDurationMinutes());
        assertEquals(new BigDecimal("25.00"), resultado.getEstimatedPrice());

        verify(routeService).calcularRota(
                -3.7319, -38.5267, -3.7400, -38.5200
        );

        verify(rideRepository).save(any(Ride.class));

        verify(rideRedisService).salvarStatus(
                resultado.getId(), "WAITING"
        );

        verify(rideMessageProducer).enviarCorrida(resultado.getId());
        verify(rideNotificationService).notificarMotoristas(resultado);
        verify(rideNotificationService).notificarCliente(resultado);
    }

    @Test
    void naoDeveCriarCorridaSemOrigem() {

        RideRequest request = criarRequest(
                1L,
                "",
                "Aeroporto"
        );

        assertThrows(
                ResponseStatusException.class,
                () -> rideService.solicitarCorrida(request)
        );

        verify(rideRepository, never()).save(any());
        verify(routeService, never()).calcularRota(
                anyDouble(), anyDouble(), anyDouble(), anyDouble()
        );
    }

    @Test
    void naoDeveCriarCorridaSemDestino() {

        RideRequest request = criarRequest(
                1L,
                "Centro",
                " "
        );

        assertThrows(
                ResponseStatusException.class,
                () -> rideService.solicitarCorrida(request)
        );

        verify(rideRepository, never()).save(any());
        verify(routeService, never()).calcularRota(
                anyDouble(), anyDouble(), anyDouble(), anyDouble()
        );
    }

    @Test
    void naoDeveCriarCorridaComOrigemEDestinoIguais() {

        RideRequest request = criarRequest(
                1L,
                "Centro",
                " centro "
        );

        assertThrows(
                ResponseStatusException.class,
                () -> rideService.solicitarCorrida(request)
        );

        verify(rideRepository, never()).save(any());
        verify(routeService, never()).calcularRota(
                anyDouble(), anyDouble(), anyDouble(), anyDouble()
        );
    }

    @Test
    void naoDevePermitirMotoristaComoCliente() {

        when(accountClient.buscarConta(2L))
                .thenReturn(Map.of("tipo", "MOTORISTA"));

        RideRequest request = criarRequest(
                2L,
                "Centro",
                "Aeroporto"
        );

        assertThrows(
                ResponseStatusException.class,
                () -> rideService.solicitarCorrida(request)
        );

        verify(rideRepository, never()).save(any());
        verify(routeService, never()).calcularRota(
                anyDouble(), anyDouble(), anyDouble(), anyDouble()
        );
    }

    @Test
    void deveAceitarCorridaComSucesso() {

        Ride ride = new Ride();
        ride.setStatus(RideStatus.WAITING);

        when(accountClient.buscarConta(2L))
                .thenReturn(Map.of("tipo", "MOTORISTA"));

        when(rideRedisService.bloquearCorrida(10L))
                .thenReturn(true);

        when(rideRepository.findById(10L))
                .thenReturn(Optional.of(ride));

        when(rideRepository.save(any(Ride.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Ride resultado = rideService.aceitarCorrida(10L, 2L);

        assertEquals(RideStatus.ACCEPTED, resultado.getStatus());
        assertEquals(2L, resultado.getDriverId());

        verify(rideRedisService).salvarStatus(
                resultado.getId(), "ACCEPTED"
        );

        verify(rideNotificationService).notificarCliente(resultado);
        verify(rideRedisService).desbloquearCorrida(10L);
    }
}

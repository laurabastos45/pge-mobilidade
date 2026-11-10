
package com.desafio.ride.controller;

import com.desafio.ride.dto.RideRequest;
import com.desafio.ride.dto.AcceptRideRequest;
import com.desafio.ride.dto.RouteEstimateResponse;
import com.desafio.ride.entity.Ride;
import com.desafio.ride.service.RideService;
import com.desafio.ride.service.RouteService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;
    private final RouteService routeService;

    public RideController(
            RideService rideService,
            RouteService routeService) {

        this.rideService = rideService;
        this.routeService = routeService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ride solicitarCorrida(@RequestBody RideRequest request) {
        return rideService.solicitarCorrida(request);
    }

    @GetMapping("/available")
    public List<Ride> listarCorridasDisponiveis() {
        return rideService.listarCorridasDisponiveis();
    }

    @GetMapping("/driver/{driverId}/active")
    public List<Ride> listarCorridasAtivasDoMotorista(@PathVariable Long driverId) {
        return rideService.listarCorridasAtivasDoMotorista(driverId);
    }

    @GetMapping("/estimate")
    public RouteEstimateResponse estimarCorrida(
            @RequestParam double originLat,
            @RequestParam double originLng,
            @RequestParam double destinationLat,
            @RequestParam double destinationLng) {

        RouteService.RouteResult resultado = routeService.calcularRota(
                originLat,
                originLng,
                destinationLat,
                destinationLng
        );

        return new RouteEstimateResponse(
                resultado.distanceKm(),
                resultado.durationMinutes(),
                resultado.estimatedPrice(),
                resultado.coordinates()
        );
    }

    @PatchMapping("/{id}/accept")
    public Ride aceitarCorrida(
            @PathVariable Long id,
            @RequestBody AcceptRideRequest request) {

        return rideService.aceitarCorrida(id, request.driverId());
    }

    @PatchMapping("/{id}/start")
    public Ride iniciarCorrida(@PathVariable Long id) {
        return rideService.iniciarCorrida(id);
    }

    @PatchMapping("/{id}/complete")
    public Ride finalizarCorrida(@PathVariable Long id) {
        return rideService.finalizarCorrida(id);
    }
}

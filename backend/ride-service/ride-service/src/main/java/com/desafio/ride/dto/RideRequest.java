package com.desafio.ride.dto;

public record RideRequest(
        Long clientId,
        String origin,
        String destination,
        Double originLat,
        Double originLng,
        Double destinationLat,
        Double destinationLng
) {
}

//O dto representa os dados que o frontend enviara para solicitar a corrida
package com.desafio.ride.entity;

public enum RideStatus {
    WAITING,
    ACCEPTED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}

//Criando esse Enum porque a corrida aceita determinado tipo de valor,
// e com o Enum evita que informe acidentalmente um status invalido
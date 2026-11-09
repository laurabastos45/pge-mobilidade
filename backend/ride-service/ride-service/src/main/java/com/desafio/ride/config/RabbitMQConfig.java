package com.desafio.ride.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean   //registra a fila
    public Queue rideQueue() {
        return new Queue("rides.queue", true);
    }
}
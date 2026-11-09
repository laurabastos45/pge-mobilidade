package com.desafio.ride.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class RideMessageProducer {

    private final RabbitTemplate rabbitTemplate;

    public RideMessageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void enviarCorrida(Long rideId) {
        rabbitTemplate.convertAndSend("rides.queue", rideId);
    }
}

//quando chmar o enviarCorrida(), ele vai enviar o id para a fila rides.queue do RabbitMQ
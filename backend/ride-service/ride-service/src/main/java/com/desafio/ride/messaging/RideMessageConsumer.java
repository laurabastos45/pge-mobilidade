package com.desafio.ride.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RideMessageConsumer {

    @RabbitListener(queues = "rides.queue")  //essa anotaçao fica escutando a fila, e a ,mensagem indica qual fila sera monitorada
    public void receberCorrida(Long rideId) {
        System.out.println("Nova corrida recebida na fila: " + rideId);
    }
}
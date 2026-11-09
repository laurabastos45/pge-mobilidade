package com.desafio.ride.messaging;

import com.desafio.ride.entity.Ride;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class RideNotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    public RideNotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Notifica todos os motoristas sobre nova corrida
    public void notificarMotoristas(Ride ride) {
        messagingTemplate.convertAndSend("/topic/rides", ride);
    }

    // Notifica o cliente sobre as atualizações da sua corrida
    public void notificarCliente(Ride ride) {
        messagingTemplate.convertAndSend(
                "/topic/rides/" + ride.getId(),
                ride
        );
    }
}
package com.desafio.ride.redis;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RideRedisService {

    private final StringRedisTemplate redisTemplate;

    public RideRedisService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void salvarStatus(Long rideId, String status) { //guarda o status da corrida por 24h
        redisTemplate.opsForValue().set(
                "ride:" + rideId + ":status",
                status,
                Duration.ofHours(24)
        );
    }

    public String buscarStatus(Long rideId) {
        return redisTemplate.opsForValue().get(
                "ride:" + rideId + ":status"
        );
    }
    public Boolean bloquearCorrida(Long rideId) {
        return redisTemplate.opsForValue().setIfAbsent(
                "ride:" + rideId + ":lock",
                "LOCKED",
                Duration.ofSeconds(30)
        );
    }
    public void desbloquearCorrida(Long rideId) {
        redisTemplate.delete("ride:" + rideId + ":lock");
    }
}
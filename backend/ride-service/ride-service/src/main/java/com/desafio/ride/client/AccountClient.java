package com.desafio.ride.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "account-service")  //identifica o serviço pelo nome registrado no Eureka
public interface AccountClient {

    @GetMapping("/api/accounts/{id}")
    Map<String, Object> buscarConta(@PathVariable("id") Long id);
}
package com.desafio.ride.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

// Sem ACCOUNT_SERVICE_URL (Docker/local): encontra o serviço pelo nome registrado no Eureka.
// Com ACCOUNT_SERVICE_URL (Render): chama a URL pública direto, porque lá o endereço
// registrado no Eureka é o nome interno da máquina, que o Ride Service não alcança.
@FeignClient(name = "account-service", url = "${ACCOUNT_SERVICE_URL:}")
public interface AccountClient {

    @GetMapping("/api/accounts/{id}")
    Map<String, Object> buscarConta(@PathVariable("id") Long id);
}
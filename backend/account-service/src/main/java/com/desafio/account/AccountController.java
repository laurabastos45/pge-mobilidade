
package com.desafio.account;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @GetMapping("/{id}")
    public Map<String, Object> buscarConta(@PathVariable Long id) {

        if (id == 1) {
            return Map.of(
                    "id", 1,
                    "nome", "Ana Laura",
                    "tipo", "CLIENTE"
            );
        }

        if (id == 2) {
            return Map.of(
                    "id", 2,
                    "nome", "Motorista de teste",
                    "tipo", "MOTORISTA"
            );
        }

        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Conta não encontrada"
        );
    }
}

//nesse codigo ele busca o id e depois mostra a resposta dos dados da conta pelo termo Map
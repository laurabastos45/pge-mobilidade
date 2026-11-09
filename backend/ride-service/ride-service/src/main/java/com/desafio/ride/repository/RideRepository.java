
package com.desafio.ride.repository;

import com.desafio.ride.entity.Ride;
import com.desafio.ride.entity.RideStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {

    // Lista todas as corridas que ainda estão aguardando um motorista
    List<Ride> findByStatus(RideStatus status);

    // Verifica se o motorista já possui alguma corrida aceita ou em andamento
    boolean existsByDriverIdAndStatusIn(
            Long driverId,
            List<RideStatus> statuses
    );
}

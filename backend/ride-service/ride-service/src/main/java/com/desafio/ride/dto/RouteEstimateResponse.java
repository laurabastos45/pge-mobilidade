
package com.desafio.ride.dto;

import java.math.BigDecimal;
import java.util.List;

public record RouteEstimateResponse(
        double distanceKm,
        double durationMinutes,
        BigDecimal estimatedPrice,
        List<List<Double>> coordinates
) {}

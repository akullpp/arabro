package de.akull.controller.conversion;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConversionResponse {

    private Integer arabic;

    private String roman;

    private Boolean isPrime;
}

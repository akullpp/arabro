package de.akull.controller.conversion;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class ConversionRequest {

    @NotNull
    @Min(1)
    @Max(3999)
    private Integer number;
}

package de.akull.controller.conversion;

public class ConversionMapper {

    public static ConversionResponse mapToResponse(Integer arabic, String roman, Boolean isPrime) {
        return ConversionResponse.builder()
                .arabic(arabic)
                .roman(roman)
                .isPrime(isPrime)
                .build();
    }
}

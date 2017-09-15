package de.akull.controller.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ValidationException {

    private String field;

    private String message;
}

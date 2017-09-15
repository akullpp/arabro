package de.akull.controller.exception;

import lombok.Data;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

@Data
public class ValidationExceptionResponse {

    private final long timestamp;

    private String reason;

    private List<ValidationException> errors;

    public ValidationExceptionResponse(String message, List<FieldError> errors) {
        timestamp = System.currentTimeMillis();
        this.reason = message;
        this.errors = new ArrayList<>();

        for (FieldError error : errors) {
            this.errors.add(ValidationException.builder()
                    .field(error.getField())
                    .message(error.getDefaultMessage())
                    .build());
        }
    }
}

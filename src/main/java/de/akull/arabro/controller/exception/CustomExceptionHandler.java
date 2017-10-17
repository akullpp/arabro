package de.akull.arabro.controller.exception;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.annotation.Priority;

import static org.springframework.core.Ordered.HIGHEST_PRECEDENCE;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ControllerAdvice
@Priority(HIGHEST_PRECEDENCE)
public class CustomExceptionHandler {

    @ResponseBody
    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ValidationExceptionResponse handle(MethodArgumentNotValidException manve) {
        return new ValidationExceptionResponse("ValidationException", manve.getBindingResult().getFieldErrors());
    }
}

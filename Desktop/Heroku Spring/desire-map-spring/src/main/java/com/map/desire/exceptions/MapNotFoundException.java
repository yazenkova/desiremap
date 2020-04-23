package com.map.desire.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MapNotFoundException extends RuntimeException {
    public MapNotFoundException(String message) {
        super(message);
    }
}

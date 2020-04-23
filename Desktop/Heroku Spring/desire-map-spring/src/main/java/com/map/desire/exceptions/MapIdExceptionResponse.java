package com.map.desire.exceptions;

public class MapIdExceptionResponse {

    private String mapIdentifier;

    public MapIdExceptionResponse(String mapIdentifier) {
        this.mapIdentifier = mapIdentifier;
    }

    public String getMapIdentifier() {
        return mapIdentifier;
    }

    public void setMapIdentifier(String mapIdentifier) {
        this.mapIdentifier = mapIdentifier;
    }
}

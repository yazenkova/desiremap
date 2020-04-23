package com.map.desire.exceptions;

public class MapNotFoundExceptionResponse {

    private String MapNotFound;

    public MapNotFoundExceptionResponse(String mapNotFound) {
        MapNotFound = mapNotFound;
    }

    public String getMapNotFound() {
        return MapNotFound;
    }

    public void setMapNotFound(String mapNotFound) {
        MapNotFound = mapNotFound;
    }
}

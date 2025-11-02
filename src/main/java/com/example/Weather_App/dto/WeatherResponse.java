package com.example.Weather_App.dto;

public class WeatherResponse {
    private String city;
    private String region;
    private String country;
    private String condition;
    private Double temperature;

    public WeatherResponse() {
    }

    public WeatherResponse(String city, String condition, String country, String region, Double temperature) {
        this.city = city;
        this.condition = condition;
        this.country = country;
        this.region = region;
        this.temperature = temperature;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }
}

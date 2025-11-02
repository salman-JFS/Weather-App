package com.example.Weather_App.dto;

import java.util.List;

public class MyForeCast {

    private WeatherResponse weatherResponse;

    private List<DayTemp> dayTemp;

    public List<DayTemp> getDayTemp() {
        return dayTemp;
    }

    public void setDayTemp(List<DayTemp> dayTemp) {
        this.dayTemp = dayTemp;
    }

    public WeatherResponse getWeatherResponse() {
        return weatherResponse;
    }

    public void setWeatherResponse(WeatherResponse weatherResponse) {
        this.weatherResponse = weatherResponse;
    }
}

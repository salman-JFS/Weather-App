package com.example.Weather_App.service;

import com.example.Weather_App.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.api.forecast}")
    private String apiForcastUrl;

    private RestTemplate template = new RestTemplate();
    public String test(){
        return "Good";
    }
    public WeatherResponse getData (String city){
        String url = apiUrl +"?key="+apiKey+"&q="+city;

        Root response  = template.getForObject(url, Root.class);

        WeatherResponse weatherResponse = new WeatherResponse();

        weatherResponse.setCity(response.getLocation().name);
        weatherResponse.setRegion(response.getLocation().region);
        weatherResponse.setCountry(response.getLocation().country);

        String condition = response.getCurrent().getCondition().getText();
        weatherResponse.setCondition(condition);
        weatherResponse.setTemperature(response.getCurrent().getTemp_c());
        return weatherResponse;
    }
    public MyForeCast getForeCast (String city, int days){

        MyForeCast forCast = new MyForeCast();
        WeatherResponse data = getData(city);
        MyForeCast response = new MyForeCast();
        response.setWeatherResponse(data);
        List<DayTemp> dayTemps = new ArrayList<>();

        String url = apiForcastUrl +"?key="+apiKey+"&q="+city +"&days="+days;
        Root apiResponse = template.getForObject(url, Root.class);
        assert apiResponse != null;
        Forecast forecast = apiResponse.getForecast();
        ArrayList<Forecastday> forecastdays = forecast.getForecastday();
        for(Forecastday day: forecastdays){
            DayTemp d = new DayTemp();
            d.setDate(day.getDate());
            d.setMinTemp(day.getDay().mintemp_c);
            d.setAvgTemp(day.getDay().avgtemp_c);
            d.setMaxTemp(day.getDay().maxtemp_c);

            dayTemps.add(d);
        }
        response.setDayTemp(dayTemps);
        return response;
    }
}


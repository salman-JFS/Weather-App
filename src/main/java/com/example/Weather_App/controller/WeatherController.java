package com.example.Weather_App.controller;

import com.example.Weather_App.dto.MyForeCast;
import com.example.Weather_App.dto.WeatherResponse;
import com.example.Weather_App.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
@CrossOrigin
public class WeatherController {
    @Autowired
    private WeatherService service;

    @GetMapping("/{city}")
    public String getWeatherData (@PathVariable String city){
        return service.test();
    }
    @GetMapping("/my/{city}")
    public WeatherResponse getWeather (@PathVariable String city){
        return service.getData(city);
    }
    @GetMapping("/forecast")
    public MyForeCast getForecast (@RequestParam String city, @RequestParam int days){
        return service.getForeCast(city,days);
    }
}

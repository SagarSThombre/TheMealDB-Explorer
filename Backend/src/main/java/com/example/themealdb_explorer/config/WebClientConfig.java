package com.example.themealdb_explorer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient mealWebClient() {
        return WebClient.builder()
                .baseUrl("https://www.themealdb.com/api/json/v1/1")
                .build();
    }
}

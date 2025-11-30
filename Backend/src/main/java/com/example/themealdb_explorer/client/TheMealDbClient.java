package com.example.themealdb_explorer.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Map;

@Component
public class TheMealDbClient {
    private final WebClient webClient;

    public TheMealDbClient(WebClient mealWebClient) {
        this.webClient = mealWebClient;
    }

    public Mono<Map> searchByName(String name) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/search.php")
                        .queryParam("s", name)
                        .build())
                .retrieve()
                .bodyToMono(Map.class);
    }

    public Mono<Map> getRandom() {
        return webClient.get().uri("/random.php")
                .retrieve()
                .bodyToMono(Map.class);
    }

    public Mono<Map> listCategories() {
        return webClient.get().uri("/list.php?c=list")
                .retrieve()
                .bodyToMono(Map.class);
    }

    public Mono<Map> filterByCategory(String category) {
        return webClient.get().uri(uriBuilder -> uriBuilder.path("/filter.php")
                        .queryParam("c", category).build())
                .retrieve()
                .bodyToMono(Map.class);
    }

    public Mono<Map> lookupById(String id) {
        return webClient.get().uri(uriBuilder -> uriBuilder.path("/lookup.php")
                        .queryParam("i", id).build())
                .retrieve()
                .bodyToMono(Map.class);
    }
}

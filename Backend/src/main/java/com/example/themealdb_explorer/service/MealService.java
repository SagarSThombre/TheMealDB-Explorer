package com.example.themealdb_explorer.service;

import com.example.themealdb_explorer.client.TheMealDbClient;
import com.example.themealdb_explorer.dto.MealDto;
import com.example.themealdb_explorer.dto.MealSummaryDto;
import com.example.themealdb_explorer.util.MealParser;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MealService {
    private final TheMealDbClient client;

    public MealService(TheMealDbClient client) {
        this.client = client;
    }

    @Cacheable(value = "searchByName", key = "#name")
    public Mono<List<MealSummaryDto>> searchByName(String name) {
        return client.searchByName(name)
                .map(response -> {
                    Object mealsObj = response.get("meals");
                    if (mealsObj == null) return Collections.emptyList();
                    List<Map<String,Object>> meals = (List<Map<String,Object>>) mealsObj;
                    return meals.stream().map(this::toSummary).collect(Collectors.toList());
                });
    }

    @Cacheable(value = "randomMeal")
    public Mono<MealDto> randomMeal() {
        return client.getRandom()
                .map(response -> {
                    List<Map<String,Object>> meals = (List<Map<String,Object>>) response.get("meals");
                    return toMeal(meals.get(0));
                });
    }

    @Cacheable(value = "categories")
    public Mono<List<String>> categories() {
        return client.listCategories().map(response -> {
            List<Map<String,String>> list = (List<Map<String,String>>) response.get("meals");
            return list.stream().map(x -> x.get("strCategory")).collect(Collectors.toList());
        });
    }

    @Cacheable(value = "byCategory", key = "#category")
    public Mono<List<MealSummaryDto>> getByCategory(String category) {
        return client.filterByCategory(category)
                .map(response -> {
                    Object mealsObj = response.get("meals");
                    if (mealsObj == null) return Collections.emptyList();
                    List<Map<String,Object>> meals = (List<Map<String,Object>>) mealsObj;
                    return meals.stream().map(this::toSummary).collect(Collectors.toList());
                });
    }

    @Cacheable(value = "lookup", key = "#id")
    public Mono<MealDto> getMealById(String id) {
        return client.lookupById(id)
                .map(response -> {
                    List<Map<String,Object>> meals = (List<Map<String,Object>>) response.get("meals");
                    if (meals == null || meals.isEmpty()) return null;
                    return toMeal(meals.get(0));
                });
    }

    private MealSummaryDto toSummary(Map<String,Object> raw) {
        MealSummaryDto m = new MealSummaryDto();
        m.setId(Objects.toString(raw.get("idMeal"), null));
        m.setName(Objects.toString(raw.get("strMeal"), null));
        m.setThumbnail(Objects.toString(raw.get("strMealThumb"), null));
        return m;
    }

    private MealDto toMeal(Map<String,Object> raw) {
        MealDto dto = new MealDto();
        dto.setId(Objects.toString(raw.get("idMeal"), null));
        dto.setName(Objects.toString(raw.get("strMeal"), null));
        dto.setCategory(Objects.toString(raw.get("strCategory"), null));
        dto.setArea(Objects.toString(raw.get("strArea"), null));
        dto.setInstructions(Objects.toString(raw.get("strInstructions"), null));
        dto.setThumbnail(Objects.toString(raw.get("strMealThumb"), null));
        dto.setYoutube(Objects.toString(raw.get("strYoutube"), null));
        dto.setIngredients(MealParser.parseIngredients(raw));
        return dto;
    }
}

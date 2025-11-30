package com.example.themealdb_explorer.util;

import java.util.*;
import java.util.stream.IntStream;
import java.util.stream.Collectors;

public class MealParser {

    @SuppressWarnings("unchecked")
    public static List<String> parseIngredients(Map<String, Object> mealRaw) {
        List<String> ingredients = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            String ingKey = "strIngredient" + i;
            String measureKey = "strMeasure" + i;
            Object ingObj = mealRaw.get(ingKey);
            Object measureObj = mealRaw.get(measureKey);
            if (ingObj != null) {
                String ing = ingObj.toString().trim();
                if (!ing.isEmpty() && !"null".equalsIgnoreCase(ing)) {
                    String measure = measureObj == null ? "" : measureObj.toString().trim();
                    String combined = (measure + " " + ing).trim();
                    ingredients.add(combined);
                }
            }
        }
        return ingredients;
    }

    public static String safeGet(Map<String, Object> map, String key) {
        Object o = map.get(key);
        return o == null ? null : o.toString();
    }
}

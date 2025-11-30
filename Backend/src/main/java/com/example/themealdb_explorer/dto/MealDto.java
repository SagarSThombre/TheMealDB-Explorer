package com.example.themealdb_explorer.dto;

import lombok.Data;
import java.util.List;

@Data
public class MealDto {
    private String id;
    private String name;
    private String category;
    private String area;
    private String instructions;
    private String thumbnail;
    private String youtube; // youtube url
    private List<String> ingredients; // "1 cup sugar", ...
}

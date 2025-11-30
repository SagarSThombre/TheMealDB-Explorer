    package com.example.themealdb_explorer.controller;

    import com.example.themealdb_explorer.dto.MealDto;
    import com.example.themealdb_explorer.dto.MealSummaryDto;
    import com.example.themealdb_explorer.service.MealService;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import reactor.core.publisher.Mono;

    import java.util.List;
    @CrossOrigin(origins = "http://localhost:3000/meal/53099")
    @RestController
    @RequestMapping("/api/v1")
    public class MealController {

        private final MealService mealService;

        public MealController(MealService mealService) {
            this.mealService = mealService;
        }

        @GetMapping("/meals/search")
        public Mono<ResponseEntity<List<MealSummaryDto>>> search(@RequestParam String q) {
            return mealService.searchByName(q).map(list -> ResponseEntity.ok(list));
        }

        @GetMapping("/meals/random")
        public Mono<ResponseEntity<MealDto>> random() {
            return mealService.randomMeal().map(m -> ResponseEntity.ok(m));
        }

        @GetMapping("/categories")
        public Mono<ResponseEntity<List<String>>> categories() {
            return mealService.categories().map(list -> ResponseEntity.ok(list));
        }

        @GetMapping("/meals/category/{category}")
        public Mono<ResponseEntity<List<MealSummaryDto>>> byCategory(@PathVariable String category) {
            return mealService.getByCategory(category).map(list -> ResponseEntity.ok(list));
        }

        @GetMapping("/meals/{id}")
        public Mono<ResponseEntity<MealDto>> detail(@PathVariable String id) {
            return mealService.getMealById(id)
                    .map(meal -> {
                        if (meal == null) return ResponseEntity.notFound().build();
                        return ResponseEntity.ok(meal);
                    });
        }
    }

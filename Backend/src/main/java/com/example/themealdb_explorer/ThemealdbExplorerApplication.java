package com.example.themealdb_explorer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ThemealdbExplorerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ThemealdbExplorerApplication.class, args);
	}

}
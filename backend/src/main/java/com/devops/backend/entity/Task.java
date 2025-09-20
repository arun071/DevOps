package com.devops.backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status;   // "todo", "in-progress", "done"
    private String priority; // "low", "medium", "high"
    private String assignee;
    private LocalDate dueDate;
    private LocalDate createdAt;

    @ElementCollection
    private List<String> tags;

    // Getters and setters
}


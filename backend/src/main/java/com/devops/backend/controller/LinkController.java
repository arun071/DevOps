package com.devops.backend.controller;

import com.devops.backend.entity.Category;
import com.devops.backend.entity.Link;
import com.devops.backend.repository.CategoryRepository;
import com.devops.backend.repository.LinkRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/links")
@CrossOrigin
public class LinkController {

    private final LinkRepository linkRepo;
    private final CategoryRepository categoryRepo;

    public LinkController(LinkRepository linkRepo, CategoryRepository categoryRepo) {
        this.linkRepo = linkRepo;
        this.categoryRepo = categoryRepo;
    }

    // 🔍 Get all links (flat list)
    @GetMapping
    public List<Link> getAllLinks() {
        return linkRepo.findAll();
    }

    // ➕ Add new link under specific category
    @PostMapping("/{categoryId}")
    public Link addLink(@PathVariable Long categoryId, @RequestBody Link link) {
        Category category = categoryRepo.findById(categoryId).orElseThrow();
        link.setCategory(category);
        return linkRepo.save(link);
    }

    // 📝 Update link (including category)
    @PutMapping("/{id}")
    public ResponseEntity<Link> updateLink(@PathVariable Long id, @RequestBody Link updatedLink) {
        return linkRepo.findById(id)
                .map(existing -> {
                    existing.setTitle(updatedLink.getTitle());
                    existing.setUrl(updatedLink.getUrl());

                    if (updatedLink.getCategory() != null && updatedLink.getCategory().getId() != null) {
                        Category category = categoryRepo.findById(updatedLink.getCategory().getId())
                                .orElseThrow(() -> new RuntimeException("Category not found"));
                        existing.setCategory(category);
                    }

                    return ResponseEntity.ok(linkRepo.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 🗑️ Delete a link
    @DeleteMapping("/{id}")
    public void deleteLink(@PathVariable Long id) {
        linkRepo.deleteById(id);
    }

    // 📂 Grouped links by category
    @GetMapping("/getAllLinks")
    public Map<String, List<Link>> getLinksGroupedByCategory() {
        List<Link> allLinks = linkRepo.findAll();
        return allLinks.stream()
                .filter(link -> link.getCategory() != null)
                .collect(Collectors.groupingBy(link -> link.getCategory().getName()));
    }
    @DeleteMapping("/category/{categoryName}")
    public ResponseEntity<Void> deleteAllLinksByCategory(@PathVariable String categoryName) {
        List<Link> links = linkRepo.findAll().stream()
                .filter(link -> link.getCategory() != null && link.getCategory().getName().equalsIgnoreCase(categoryName))
                .toList();

        linkRepo.deleteAll(links);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/clearAllLinks")
    public ResponseEntity<Void> deleteAllLinks() {
        linkRepo.deleteAll();
        categoryRepo.deleteAll();
        return ResponseEntity.ok().build();
    }

}

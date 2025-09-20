package com.devops.backend.controller;

import com.devops.backend.entity.Issue;
import com.devops.backend.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
@CrossOrigin
public class IssueController {
    private final IssueService issueService;

    @GetMapping
    public List<Issue> getAll() {
        return issueService.getAllIssues();
    }

    @PostMapping
    public Issue create(@RequestBody Issue issue) {
        return issueService.createIssue(issue);
    }

    @PutMapping("/{id}")
    public Issue update(@PathVariable Long id, @RequestBody Issue issue) {
        return issueService.updateIssue(id, issue);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        issueService.deleteIssue(id);
    }
}


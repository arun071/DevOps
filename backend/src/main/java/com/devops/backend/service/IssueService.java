package com.devops.backend.service;

import com.devops.backend.entity.Issue;
import com.devops.backend.enums.Status;
import com.devops.backend.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {
    private final IssueRepository issueRepository;

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Issue createIssue(Issue issue) {
        issue.setCreatedAt(LocalDateTime.now());
        issue.setStatus(Status.OPEN);
        return issueRepository.save(issue);
    }

    public Issue updateIssue(Long id, Issue issue) {
        Issue existing = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        existing.setTitle(issue.getTitle());
        existing.setDescription(issue.getDescription());
        existing.setPriority(issue.getPriority());
        existing.setThreadLink(issue.getThreadLink());
        existing.setStatus(issue.getStatus());
        existing.setAssignedTo(issue.getAssignedTo());
        existing.setUpdatedAt(LocalDateTime.now());
        return issueRepository.save(existing);
    }

    public void deleteIssue(Long id) {
        issueRepository.deleteById(id);
    }
}

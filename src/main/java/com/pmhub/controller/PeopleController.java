package com.pmhub.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pmhub.Entity.PeopleEntity;
import com.pmhub.Entity.ProjectEntity;
import com.pmhub.Repository.PeopleRepository;
import com.pmhub.Repository.ProjectRepository;
import com.pmhub.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PeopleController {

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private PeopleService peopleService;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/addpeople")
    public ResponseEntity<?> addPersonToProject(@RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String email = payload.get("email");
        String userIdStr = payload.get("userId");

        String projectId = payload.get("projectId");


        if (name == null || email == null || projectId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required fields");
        }

        Long projectIdLong;
        try {
            projectIdLong = Long.parseLong(projectId);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid project ID format");
        }

        // Fetch project from DB (optional but recommended if foreign key constraint exists)
        ProjectEntity project = projectRepository.findById(projectIdLong).orElse(null);
        if (project == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }

        PeopleEntity person = new PeopleEntity();
        person.setName(name);
        person.setEmail(email);
        person.setAssignedProject(project);

        peopleRepository.save(person);

        return ResponseEntity.ok("Person added successfully");
    }

    @GetMapping("/people/by-project/{projectId}")
    public ResponseEntity<List<PeopleEntity>> getPeopleByProject(@PathVariable Long projectId) {
        List<PeopleEntity> people = peopleService.getPeopleByProjectId(projectId);
        return ResponseEntity.ok(people);
    }

    @GetMapping("/people")
    public ResponseEntity<List<PeopleEntity>> getAllPeople() {
        List<PeopleEntity> people = peopleRepository.findAll();
        return ResponseEntity.ok(people);
    }

}

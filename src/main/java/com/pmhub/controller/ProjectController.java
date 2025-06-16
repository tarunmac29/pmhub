package com.pmhub.controller;

import com.pmhub.Entity.ProjectEntity;
import com.pmhub.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")

public class ProjectController {
    @Autowired
    private ProjectService projectService;

    // Create or Update Project
    @PostMapping
    public ResponseEntity<ProjectEntity> createProject(@RequestBody ProjectEntity project) {
        ProjectEntity savedProject = projectService.saveProject(project);
        return ResponseEntity.ok(savedProject);
    }

    // Get specific fields of a project by ID without using DTO
    @GetMapping("/{id}/summary")
    public ResponseEntity<?> getProjectSummary(@PathVariable Long id) {
        Optional<ProjectEntity> projectOptional = projectService.getProjectById(id);

        if (projectOptional.isPresent()) {
            ProjectEntity project = projectOptional.get();

            Map<String, Object> response = new HashMap<>();
            response.put("projectKey", project.getProjectKey());
            response.put("projectType", project.getProjectType());
            response.put("name", project.getName());
            response.put("access", project.getAccess());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    //Get All Projects
    @GetMapping
    public ResponseEntity<List<ProjectEntity>> getAllProjects() {
        List<ProjectEntity> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    // GET project by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id){
        Optional<ProjectEntity> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update project
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody ProjectEntity project){
        Optional<ProjectEntity> existing  = projectService.getProjectById(id);
        if(existing.isPresent() ){
            project.setProjectId(id);
            ProjectEntity updatedProject = projectService.saveProject(project);
            return ResponseEntity.ok(updatedProject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Delete project
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        Optional<ProjectEntity> existing = projectService.getProjectById(id);
        if (existing.isPresent()) {
            projectService.deleteProject(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Search projects by name
    @GetMapping("/searchProjects")
    public  ResponseEntity<List<ProjectEntity>> searchProjectByName(@RequestParam String projectName){
        return ResponseEntity.ok(projectService.searchProjectsByName(projectName));
    }

}

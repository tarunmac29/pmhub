package com.pmhub.controller;

import com.pmhub.Entity.ProjectEntity;
import com.pmhub.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pmhub.dto.ProjectDto;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    // Create or Update project
    @PostMapping
    public ResponseEntity<ProjectEntity> createProject(@Valid ProjectEntity project) {
        ProjectEntity savedProject = projectService.saveProject(project);
        return ResponseEntity.ok(savedProject);
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
    public ResponseEntity<?> updateProject(@Valid @PathVariable Long id, @RequestBody ProjectEntity project){
        Optional<ProjectEntity> existing  = projectService.getProjectById(id);
        if(existing.isPresent() ){
            project.setId(id);
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

    // Optional: Get projects by owner ID
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<ProjectEntity>> getProjectByOwnerId(@PathVariable Long ownerId){
        return ResponseEntity.ok(projectService.getProjectsByOwnerId(ownerId));
    }

    //Search projects by name
    @GetMapping("/searchProjects")
    public  ResponseEntity<List<ProjectEntity>> searchProjectByName(@RequestParam String projectName){
        return ResponseEntity.ok(projectService.searchProjectsByName(projectName));
    }

}

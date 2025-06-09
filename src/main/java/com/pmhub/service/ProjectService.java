package com.pmhub.service;

import com.pmhub.Entity.ProjectEntity;
import com.pmhub.Repository.ProjectRepository;
import com.pmhub.dto.ProjectDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    //Create or Update project
    public ProjectEntity saveProject(ProjectEntity project) {
        return projectRepository.save(project);
    }

    //Get project by ID
    public Optional<ProjectEntity> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    // Get all projects
    public List<ProjectEntity> getAllProjects() {
        return projectRepository.findAll();
    }

    // Delete project
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    // Optional: Get projects by owner ID
    public List<ProjectEntity> getProjectsByOwnerId(Long ownerId) {
        return projectRepository.findByOwnerId(ownerId);
    }

    // Optional: Search projects by name
    public List<ProjectEntity> searchProjectsByName(String keyword) {
        return projectRepository.findByNameContainingIgnoreCase(keyword);
    }




}

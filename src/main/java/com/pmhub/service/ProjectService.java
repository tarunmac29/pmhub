package com.pmhub.service;

import com.pmhub.Entity.ProjectEntity;
import com.pmhub.Entity.Tenant;
import com.pmhub.Repository.ProjectRepository;
import com.pmhub.Repository.TenantRepository;
import com.pmhub.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TenantRepository tenantRepository;


    //Create or Update project
    public ProjectEntity saveProject(ProjectEntity project) {
        // Validate tenant existence before saving
        Tenant tenant = project.getTenant();
        if (tenant == null || tenant.getTenantId() == null || !tenantRepository.existsById(tenant.getTenantId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tenant does not exist. Please provide a valid tenantId.");
        }
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


    // Optional: Search projects by name
    public List<ProjectEntity> searchProjectsByName(String keyword) {
        return projectRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<ProjectEntity> getProjectsByTenant(Long tenantId) {
        return projectRepository.findByTenant_TenantId(tenantId);
    }

    public ProjectEntity updateProject(Long id, ProjectEntity updatedProject) {
        return projectRepository.findById(id)
                .map(existingProject -> {
                    existingProject.setName(updatedProject.getName());
                    existingProject.setProjectType(updatedProject.getProjectType());
                    existingProject.setProjectKey(updatedProject.getProjectKey());
                    existingProject.setDescription(updatedProject.getDescription());
                    existingProject.setStartDate(updatedProject.getStartDate());
                    existingProject.setEndDate(updatedProject.getEndDate());

                    existingProject.setAccess(updatedProject.getAccess());
                    existingProject.setCreatedBy(updatedProject.getCreatedBy());
                    existingProject.setTenant(updatedProject.getTenant());
                    return projectRepository.save(existingProject);
                })
                .orElse(null); // or throw custom exception
    }

}

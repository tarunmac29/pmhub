package com.pmhub.service;

import com.pmhub.Entity.PeopleEntity;
import com.pmhub.Entity.ProjectEntity;
import com.pmhub.Repository.PeopleRepository;
import com.pmhub.Repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PeopleService {
    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public void addPerson(String name, String email, Long projectId) {
        ProjectEntity project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        PeopleEntity person = new PeopleEntity();
        person.setName(name);
        person.setEmail(email);
        person.setAssignedProject(project);

        peopleRepository.save(person);
    }
}

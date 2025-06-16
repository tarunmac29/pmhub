package com.pmhub.service;

import com.pmhub.Entity.ProjectEntity;
import com.pmhub.Entity.TeamEntity;
import com.pmhub.Entity.TeamMemberEntity;
import com.pmhub.Entity.UserEntity;
import com.pmhub.Repository.ProjectRepository;
import com.pmhub.Repository.TeamMemberRepository;
import com.pmhub.Repository.TeamRepository;
import com.pmhub.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TeamMemberRepository teamMemberRepository;

    // Add methods to handle team-related operations, such as creating a team, adding members, etc.

    // create a team
    public TeamEntity createTeam(String teamName, Long projectId) {
        ProjectEntity project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        TeamEntity team = TeamEntity.builder()
                .teamName(teamName)
                .project(project)
                .build();

        TeamEntity savedTeam = teamRepository.save(team);


        return savedTeam;
    }

    public void deleteTeam(Long teamId) {
        teamRepository.deleteById(teamId);
    }


    // get a team by id
    public TeamEntity getTeamById(Long teamId) {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
    }

    public List<TeamEntity> getAllTeams() {
        return teamRepository.findAll();
    }

}

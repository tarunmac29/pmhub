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
    public TeamEntity createTeam(String teamName, Long projectId, Long adminId, List<Long> memberIds) {
        ProjectEntity project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        UserEntity admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin user not found"));

        TeamEntity team = TeamEntity.builder()
                .teamName(teamName)
                .project(project)
                .admin(admin)
                .build();

        TeamEntity savedTeam = teamRepository.save(team);

        for (Long userId : memberIds) {
            UserEntity member = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found: " + userId));

            TeamMemberEntity teamMember = TeamMemberEntity.builder()
                    .team(savedTeam)
                    .user(member)
                    .build();

            teamMemberRepository.save(teamMember);
        }

        return savedTeam;
    }

}

package com.pmhub.service;

import com.pmhub.Entity.TeamEntity;
import com.pmhub.Entity.TeamMemberEntity;
import com.pmhub.Entity.UserEntity;
import com.pmhub.Repository.TeamMemberRepository;
import com.pmhub.Repository.TeamRepository;
import com.pmhub.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamMemberService {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;


    public List<UserEntity> getMembersByTeamId(Long teamId) {
        return teamMemberRepository.findMembersByTeamId(teamId);
    }


    public void addMemberToTeam(Long userId, Long teamId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        TeamEntity team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        TeamMemberEntity member = new TeamMemberEntity();
        member.setUser(user);
        member.setTeam(team);
        teamMemberRepository.save(member);
    }
}

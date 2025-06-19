package com.pmhub.controller;

import com.pmhub.Entity.TeamEntity;
import com.pmhub.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/teams")
public class TeamController {
    @Autowired
    private TeamService teamService;

    @PostMapping
    public TeamEntity createTeam(@RequestBody Map<String, Object> request) {
        String teamName = (String) request.get("teamName");
        Long projectId = Long.valueOf(request.get("projectId").toString());

        return teamService.createTeam(teamName, projectId);
    }

    @DeleteMapping("/{teamId}")
    public void deleteTeam(@PathVariable Long teamId) {
        teamService.deleteTeam(teamId);
    }


    @GetMapping("/project/{projectId}/teams")
    public List<TeamEntity> getTeamsByProjectId(@PathVariable Long projectId) {
        return teamService.getTeamsByProjectId(projectId);
    }

    @GetMapping("/{teamId}/members")
    public List<Map<String, Object>> getTeamMembers(@PathVariable Long teamId) {
        return teamService.getTeamMembersByTeamId(teamId);
    }


    @GetMapping("/{teamId}")
    public TeamEntity getTeamById(@PathVariable Long teamId) {
        return teamService.getTeamById(teamId);
    }

    @GetMapping
    public List<TeamEntity> getAllTeams() {
        return teamService.getAllTeams();
    }

}

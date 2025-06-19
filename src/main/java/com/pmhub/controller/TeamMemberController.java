package com.pmhub.controller;

import com.pmhub.service.TeamMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/teams/members")
@CrossOrigin(origins = "*")
public class TeamMemberController {

    @Autowired
    private TeamMemberService teamMemberService;

    @GetMapping("/{teamId}")
    public ResponseEntity<?> getAllMembersByTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(teamMemberService.getMembersByTeamId(teamId));
    }

    @PostMapping("/addpeople")
    public ResponseEntity<String> addPersonToTeam(@RequestBody Map<String, Object> payload) {
        Long userId = Long.parseLong(payload.get("userId").toString());
        Long teamId = Long.parseLong(payload.get("teamId").toString());

        teamMemberService.addMemberToTeam(userId, teamId);
        return ResponseEntity.ok("Member added successfully");
    }
}

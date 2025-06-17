package com.pmhub.Repository;

import com.pmhub.Entity.TeamEntity;
import com.pmhub.Entity.TeamMemberEntity;
import com.pmhub.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamMemberRepository extends JpaRepository<TeamMemberEntity, Long> {

    @Query("SELECT tm.user FROM TeamMemberEntity tm WHERE tm.team.teamId = :teamId")
    List<UserEntity> findMembersByTeamId(@Param("teamId") Long teamId);

    List<TeamMemberEntity> findByTeam(TeamEntity team);

}

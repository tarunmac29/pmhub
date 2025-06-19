package com.pmhub.Repository;

import com.pmhub.Entity.TeamEntity;
import com.pmhub.Entity.TeamMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {



    List<TeamEntity> findByProject_ProjectId(Long projectId);


}

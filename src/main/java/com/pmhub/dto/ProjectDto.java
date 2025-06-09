package com.pmhub.dto;

import com.pmhub.Entity.UserEntity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto {

    @NotBlank(message = "Project name is required")
    @Size(min = 3, max = 30, message = "Project name must be less than 30 characters")
    private String projectName;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    private String description;

    @Id
    private Long Id;



}

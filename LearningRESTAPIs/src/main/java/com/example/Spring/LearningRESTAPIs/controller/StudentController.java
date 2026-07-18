package com.example.Spring.LearningRESTAPIs.controller;

import com.example.Spring.LearningRESTAPIs.dto.StudentDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    @GetMapping("/student")
    public StudentDto getStudent(){
        return new StudentDto(4L,"Priya","abc@gmail.com" );
    }
}


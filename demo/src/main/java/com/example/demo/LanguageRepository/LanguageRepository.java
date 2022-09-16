package com.example.demo.LanguageRepository;


import com.example.demo.VO.Language;
import com.example.demo.VO.Language2;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LanguageRepository extends JpaRepository<Language2, Integer> {

}
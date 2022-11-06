package com.SmartHack.demo.infra.jpa.repositorys.jpa;

import com.SmartHack.demo.infra.jpa.entities.CampaignJPA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignsJPARepository extends JpaRepository<CampaignJPA, String>{
}

package com.SmartHack.demo.domain.repository;


import com.SmartHack.demo.domain.model.Campaign;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

public interface CampaignsRepository {

    String save(Campaign campaign);

    void delete(String id);

    Optional<Campaign> getById(String id);

    boolean existsById(String id);

    List<Campaign> getAll();
}

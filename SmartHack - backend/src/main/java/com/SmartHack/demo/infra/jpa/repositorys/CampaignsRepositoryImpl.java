package com.SmartHack.demo.infra.jpa.repositorys;


import com.SmartHack.demo.domain.model.Campaign;
import com.SmartHack.demo.domain.repository.CampaignsRepository;
import com.SmartHack.demo.infra.jpa.entities.CampaignJPA;
import com.SmartHack.demo.infra.jpa.entities.mappers.CampaignJPAMapper;
import com.SmartHack.demo.infra.jpa.repositorys.jpa.CampaignsJPARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Repository

public class CampaignsRepositoryImpl implements CampaignsRepository {

    private CampaignsJPARepository campaignsJPARepository;
    private CampaignJPAMapper campaignsJPAMapper;

    @Override
    public String save(Campaign campaign) {

        CampaignJPA  campaignJPA = campaignsJPAMapper.toDto(campaign);

        if(StringUtils.hasText(campaign.getId())) {
            campaignJPA.setId(campaign.getId());
        }
        return campaignsJPARepository.save(campaignJPA).getId();
    }

    @Override
    public void delete(String id) {
        campaignsJPARepository.delete(campaignsJPARepository.getById(id));
    }

    @Override
    public Optional<Campaign> getById(String id) {
        Optional<CampaignJPA> campaignJPAOptional = campaignsJPARepository.findById(id);
        if(campaignJPAOptional.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(campaignsJPAMapper.toDomain(campaignJPAOptional.get()));
        }
    }

    @Override
    public boolean existsById(String id) {
        Optional<CampaignJPA> campaignsJPAOptional = campaignsJPARepository.findById(id);
        if(campaignsJPAOptional.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public List<Campaign> getAll() {
        return campaignsJPARepository.findAll().stream().map(x -> campaignsJPAMapper.toDomain(x)).toList();

    }
}

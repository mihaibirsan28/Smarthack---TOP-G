package com.SmartHack.demo.exposition.IQuerry;

import com.SmartHack.demo.domain.model.Campaign;
import com.SmartHack.demo.domain.repository.CampaignsRepository;
import com.SmartHack.demo.exposition.exceptions.CustomErrorHandler;
import com.SmartHack.demo.exposition.exceptions.ExceptionEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CampaignIQuerryImpl implements IQuerry<Campaign> {


    private  CampaignsRepository campaignsRepository;

    @Override
    public Campaign getById(String id){

        if(!StringUtils.hasText(id)) {
            throw new CustomErrorHandler(ExceptionEnum.OBJECT_NOT_FOUND);
        }

        Optional<Campaign> campaignOptional = campaignsRepository.getById(id);
        if(campaignOptional.isEmpty()) {
            throw new CustomErrorHandler(ExceptionEnum.OBJECT_NOT_FOUND);
        } else {
            return campaignOptional.get();
        }
    }

    @Override
    public List<Campaign> getAll() {
        return campaignsRepository.getAll();
    }
}

package com.SmartHack.demo.exposition.ICommand;

import com.SmartHack.demo.domain.model.Campaign;
import com.SmartHack.demo.domain.repository.CampaignsRepository;
import com.SmartHack.demo.exposition.exceptions.CustomErrorHandler;
import com.SmartHack.demo.exposition.exceptions.ExceptionEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CampaignIcommandImpl implements ICommand<Campaign> {


    private CampaignsRepository campaignsRepository;
    @Override
    public String save(Campaign body) {
        fieldVerification(body);

        return campaignsRepository.save(body);
    }

    @Override
    public String update(Campaign body, String id) {

        if(!StringUtils.hasText(id)
         || !StringUtils.hasText(body.getId()) ||
                !body.getId().equals(id)) {
            throw  new CustomErrorHandler(ExceptionEnum.INVALID_FIELD);
        }
        fieldVerification(body);

        return campaignsRepository.save(body);
    }

    @Override
    public void delete(String id) {
        if(!StringUtils.hasText(id)) {
            throw new CustomErrorHandler(ExceptionEnum.OBJECT_NOT_FOUND);
        }
        campaignsRepository.delete(id);
    }

    public void fieldVerification(Campaign body) {

        if(!StringUtils.hasText(body.getName()) ||
                !ObjectUtils.isEmpty(body.getReleaseDate())) {
            throw new CustomErrorHandler(ExceptionEnum.EMPTY_FIELD);
        }
    }
}


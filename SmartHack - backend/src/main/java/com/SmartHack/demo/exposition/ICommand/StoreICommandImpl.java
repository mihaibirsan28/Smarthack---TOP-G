package com.SmartHack.demo.exposition.ICommand;

import com.SmartHack.demo.domain.model.Store;
import com.SmartHack.demo.domain.repository.StoresRepository;
import com.SmartHack.demo.exposition.exceptions.CustomErrorHandler;
import com.SmartHack.demo.exposition.exceptions.ExceptionEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class StoreICommandImpl implements ICommand<Store> {
    private final StoresRepository storesRepository;

    @Override
    public String save(Store body) {
        fieldVerification(body);

        return storesRepository.save(body);
    }

    @Override
    public String update(Store body, String id) {

        if(!StringUtils.hasText(id) ||
            !StringUtils.hasText(body.getId()) ||
                !body.getId().equals(id)){
            throw new CustomErrorHandler(ExceptionEnum.INVALID_FIELD);
        }
        fieldVerification(body);

        return storesRepository.save(body);
    }

    @Override
    public void delete(String id) {
        if(!StringUtils.hasText(id)) {
            throw new CustomErrorHandler(ExceptionEnum.OBJECT_NOT_FOUND);
        }
        storesRepository.delete(id);
    }

    public void fieldVerification(Store body) {

        if(!StringUtils.hasText(body.getName())
            || !StringUtils.hasText(body.getLocation())) {
            throw new CustomErrorHandler(ExceptionEnum.EMPTY_FIELD);
        }
    }
}

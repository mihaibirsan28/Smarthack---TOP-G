package com.SmartHack.demo.exposition.IQuerry;


import com.SmartHack.demo.domain.model.Store;
import com.SmartHack.demo.domain.repository.StoresRepository;
import com.SmartHack.demo.exposition.exceptions.CustomErrorHandler;
import com.SmartHack.demo.exposition.exceptions.ExceptionEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class StoreIQuerryImpl implements IQuerry<Store>{

    private final StoresRepository storesRepository;

    @Override
    public Store getById(String id) {

        if(!StringUtils.hasText(id)) {
            throw new CustomErrorHandler(ExceptionEnum.OBJECT_NOT_FOUND);
        }

        Optional<Store> storeOptional = storesRepository.getById(id);
        if(storeOptional.isEmpty()){
            throw new CustomErrorHandler(ExceptionEnum.OBJECT_NOT_FOUND);
        }
        else {
            return storeOptional.get();
        }
    }

    @Override
    public List<Store> getAll() {
        return  storesRepository.getAll();
    }
}

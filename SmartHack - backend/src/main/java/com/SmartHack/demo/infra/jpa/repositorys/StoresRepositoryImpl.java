package com.SmartHack.demo.infra.jpa.repositorys;

import com.SmartHack.demo.domain.model.Store;
import com.SmartHack.demo.domain.repository.StoresRepository;
import com.SmartHack.demo.infra.jpa.entities.StoreJPA;
import com.SmartHack.demo.infra.jpa.entities.mappers.StoresJPAMapper;
import com.SmartHack.demo.infra.jpa.repositorys.jpa.StoresJPARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Repository
public class StoresRepositoryImpl implements StoresRepository {

    private final StoresJPARepository storesJPARepository;
    private final StoresJPAMapper storesJPAMapper;

    @Override
    public String save(Store store) {

        StoreJPA storeJPA = storesJPAMapper.toDto(store);

        if(StringUtils.hasText(store.getId())){
            store.setId(store.getId());
        }
        return storesJPARepository.save(storeJPA).getId();
    }

    @Override
    public void delete(String id) {
        storesJPARepository.delete(storesJPARepository.getById(id));
    }

    @Override
    public Optional<Store> getById(String id) {
        Optional<StoreJPA> storeJPAOptional = storesJPARepository.findById(id);
        if(storeJPAOptional.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(storesJPAMapper.toDomain(storeJPAOptional.get()));
        }
    }

    @Override
    public boolean existsById(String id) {
        Optional<StoreJPA> storeJPAOptional = storesJPARepository.findById(id);
        if(storeJPAOptional.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public List<Store> getAll() {
        return storesJPARepository.findAll().stream().map(x-> storesJPAMapper.toDomain(x)).toList();
    }
}

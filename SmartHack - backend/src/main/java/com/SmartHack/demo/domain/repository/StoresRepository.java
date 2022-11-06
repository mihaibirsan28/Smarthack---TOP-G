package com.SmartHack.demo.domain.repository;

import com.SmartHack.demo.domain.model.Store;

import java.util.List;
import java.util.Optional;

public interface StoresRepository {
    String save(Store store);

    void delete(String id);

    Optional<Store> getById(String id);

    boolean existsById(String id);

    List<Store>getAll();

}

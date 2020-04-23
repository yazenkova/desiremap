package com.map.desire.repositories;

import com.map.desire.domain.Map;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapRepository extends CrudRepository<Map, Long> {

    Map findByMapIdentifier(String mapId);

    @Override
    Iterable<Map> findAll();

    Iterable<Map> findAllByMapOwner(String username);
}

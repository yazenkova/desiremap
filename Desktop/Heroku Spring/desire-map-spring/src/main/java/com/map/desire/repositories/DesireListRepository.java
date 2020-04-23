package com.map.desire.repositories;

import com.map.desire.domain.DesireList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesireListRepository extends CrudRepository<DesireList, Long> {

    DesireList findByMapIdentifier(String Identifier);
}

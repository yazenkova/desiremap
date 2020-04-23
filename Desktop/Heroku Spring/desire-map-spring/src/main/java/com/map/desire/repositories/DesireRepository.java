package com.map.desire.repositories;

import com.map.desire.domain.Desire;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesireRepository extends CrudRepository<Desire, Long> {

    List<Desire> findByMapIdentifierOrderByTag(String id);

    Desire findByDesireSequence(String sequence);
}

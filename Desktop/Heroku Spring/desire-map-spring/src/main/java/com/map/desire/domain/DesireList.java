package com.map.desire.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class DesireList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer desiresNumber = 0;
    private String mapIdentifier;

    //OneToOne with map
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="map_id",nullable = false)
    @JsonIgnore
    private Map map;


    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "desireList", orphanRemoval = true)
    private List<Desire> desires = new ArrayList<>();


    public DesireList() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDesiresNumber() {
        return desiresNumber;
    }

    public void setDesiresNumber(Integer PTSequence) {
        this.desiresNumber = PTSequence;
    }

    public String getMapIdentifier() {
        return mapIdentifier;
    }

    public void setMapIdentifier(String mapIdentifier) {
        this.mapIdentifier = mapIdentifier;
    }

    public Map getMap() {
        return map;
    }

    public void setMap(Map map) {
        this.map = map;
    }

    public List<Desire> getDesires() {
        return desires;
    }

    public void setDesires(List<Desire> desires) {
        this.desires = desires;
    }


}

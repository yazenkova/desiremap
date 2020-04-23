package com.map.desire.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Map {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Map name is required")
    private String mapName;
    @NotBlank(message ="Map Identifier is required")
    @Size(min=4, max=10, message = "Please use 4 to 10 characters")
    @Column(updatable = false, unique = true)
    private String mapIdentifier;
    @NotBlank(message = "Map description is required")
    private String description;
    @JsonFormat(pattern = "yyyy-mm-dd")
    @NotNull(message = "Start Date is required")
    private Date start_date;
    @NotNull(message = "Estimated Finish Date is required")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date end_date;
    @JsonFormat(pattern = "yyyy-mm-dd")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "map")
    @JsonIgnore
    private DesireList desireList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;


    private String mapOwner;


    public Map() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMapName() {
        return mapName;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }

    public String getMapIdentifier() {
        return mapIdentifier;
    }

    public void setMapIdentifier(String mapIdentifier) {
        this.mapIdentifier = mapIdentifier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    public DesireList getDesireList() {
        return desireList;
    }

    public void setDesireList(DesireList mapList) {
        this.desireList = mapList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMapOwner() {
        return mapOwner;
    }

    public void setMapOwner(String mapOwner) {
        this.mapOwner = mapOwner;
    }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }

}

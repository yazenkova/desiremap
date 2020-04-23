package com.map.desire.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Desire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false, unique = true)
    private String desireSequence;
    @NotBlank(message = "Please include a map summary")
    private String description;
    @NotNull(message = "Please choose a tag")
    @Min(value=1, message = "Please choose a tag ")
    private Integer tag;
    @NotNull(message = "Finish Date is required")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date dueDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="desire_list_id", updatable = false, nullable = false)
    @JsonIgnore
    private DesireList desireList;

    @Column(updatable = false)
    private String mapIdentifier;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date create_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date update_At;

    public Desire() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesireSequence() {
        return desireSequence;
    }

    public void setDesireSequence(String mapSequence) {
        this.desireSequence = mapSequence;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String summary) {
        this.description = summary;
    }

    public Integer getTag() {
        return tag;
    }

    public void setTag(Integer tag) {
        this.tag = tag;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getMapIdentifier() {
        return mapIdentifier;
    }

    public void setMapIdentifier(String mapIdentifier) {
        this.mapIdentifier = mapIdentifier;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    public DesireList getDesireList() {
        return desireList;
    }

    public void setDesireList(DesireList desireList) {
        this.desireList = desireList;
    }

    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }

    @Override
    public String toString() {
        return "Desire{" +
                "id=" + id +
                ", mapSequence='" + desireSequence + '\'' +
                ", summary='" + description + '\'' +
                ", tag='" + tag + '\'' +
                ", dueDate=" + dueDate +
                ", desireList=" + desireList +
                ", mapIdentifier='" + mapIdentifier + '\'' +
                ", create_At=" + create_At +
                ", update_At=" + update_At +
                '}';
    }
}

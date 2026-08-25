package com.example.backend.dto;

import java.time.LocalDate;

public class PostRequest {

    private Long birdId;
    private  LocalDate observedDate;
    private Long areaId;
    private String comment;

    public Long getBirdId() {
        return birdId;
    }

    public Long getAreaId() {
        return areaId;
    }

    public LocalDate getObservedDate() {
        return observedDate;
    }

    public String getComment() {
        return comment;
    }


    public void setBirdId(Long birdId) {
        this.birdId = birdId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public void setObservedDate(LocalDate observedDate) {
        this.observedDate = observedDate;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}

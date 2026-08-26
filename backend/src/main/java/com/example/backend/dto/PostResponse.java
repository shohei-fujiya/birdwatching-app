package com.example.backend.dto;

import java.time.LocalDate;

public class PostResponse {

    private Long postId;
    private Long birdId;
    private String birdName;
    private Long areaId;
    private String areaName;
    private LocalDate observedDate;
    private String comment;

    public PostResponse(
            Long postId,
            Long birdId,
            String birdName,
            Long areaId,
            String areaName,
            LocalDate observedDate,
            String comment) {

        this.postId = postId;
        this.birdId = birdId;
        this.birdName = birdName;
        this.areaId = areaId;
        this.areaName = areaName;
        this.observedDate = observedDate;
        this.comment = comment;
    }

    public Long getPostId() {
        return postId;
    }

    public Long getBirdId() { return birdId;}

    public String getBirdName() {
        return birdName;
    }

    public Long getAreaId() { return areaId;}

    public String getAreaName() {
        return areaName;
    }

    public LocalDate getObservedDate() {
        return observedDate;
    }

    public String getComment() {
        return comment;
    }
}

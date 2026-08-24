package com.example.backend.dto;

import java.time.LocalDate;

public class PostResponse {

    private Long postId;
    private String birdName;
    private LocalDate observedDate;
    private String areaName;
    private String comment;

    public PostResponse(
            Long postId,
            String birdName,
            LocalDate observedDate,
            String areaName,
            String comment) {

        this.postId = postId;
        this.birdName = birdName;
        this.observedDate = observedDate;
        this.areaName = areaName;
        this.comment = comment;
    }

    public Long getPostId() {
        return postId;
    }

    public String getBirdName() {
        return birdName;
    }

    public LocalDate getObservedDate() {
        return observedDate;
    }

    public String getAreaName() {
        return areaName;
    }

    public String getComment() {
        return comment;
    }
}

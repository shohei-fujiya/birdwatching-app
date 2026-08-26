package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private Long birdId;

    private Long areaId;

    private LocalDate observedDate;

    private String comment;

    private LocalDateTime createdAt;

    public Long getPostId() {
        return postId;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
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



    public Post() {
    }

    public Post(Long birdId, Long areaId, LocalDate observedDate, String comment) {
        this.birdId = birdId;
        this.areaId = areaId;
        this.observedDate = observedDate;
        this.comment = comment;
    }
}
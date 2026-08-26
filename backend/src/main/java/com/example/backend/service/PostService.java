package com.example.backend.service;

import com.example.backend.dto.PostRequest;
import com.example.backend.dto.PostResponse;
import com.example.backend.entity.Area;
import com.example.backend.entity.Bird;
import com.example.backend.entity.Post;
import com.example.backend.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final BirdService birdService;
    private final AreaService areaService;

    public PostService(
            PostRepository postRepository,
            BirdService birdService,
            AreaService areaService
    ) {
        this.postRepository = postRepository;
        this.birdService = birdService;
        this.areaService = areaService;
    }

    public List<PostResponse> getAllPosts() {

        List<Post> posts = postRepository.findAll();

        return posts.stream()
                .map(post -> {

                    Bird bird = birdService.getBirdById(post.getBirdId());
                    Area area = areaService.getAreaById(post.getAreaId());

                    String birdName = bird.getNameJa();
                    String areaName = area.getName();

                    return new PostResponse(
                            post.getPostId(),
                            birdName,
                            post.getObservedDate(),
                            areaName,
                            post.getComment()
                    );
                })
                .toList();

    }

    public void createPost(PostRequest postRequest) {

        Post post = new Post(
                postRequest.getBirdId(),
                postRequest.getAreaId(),
                postRequest.getObservedDate(),
                postRequest.getComment()
        );

        postRepository.save(post);
    }

    public List<PostResponse> getPostsByBirdId(Long birdId) {
        List<Post> posts = postRepository.findByBirdId(birdId);

        return posts.stream()
                .map(post -> {

                    Bird bird = birdService.getBirdById(post.getBirdId());
                    Area area = areaService.getAreaById(post.getAreaId());

                    String birdName = bird.getNameJa();
                    String areaName = area.getName();

                    return new PostResponse(
                            post.getPostId(),
                            birdName,
                            post.getObservedDate(),
                            areaName,
                            post.getComment()
                    );
                })
                .toList();
    }

    public List<PostResponse> getPostsByAreaId(Long areaId) {
        List<Post> posts = postRepository.findByAreaId(areaId);

        return posts.stream()
                .map(post -> {

                    Bird bird = birdService.getBirdById(post.getBirdId());
                    Area area = areaService.getAreaById(post.getAreaId());

                    String birdName = bird.getNameJa();
                    String areaName = area.getName();

                    return new PostResponse(
                            post.getPostId(),
                            birdName,
                            post.getObservedDate(),
                            areaName,
                            post.getComment()
                    );
                })
                .toList();
    }

}
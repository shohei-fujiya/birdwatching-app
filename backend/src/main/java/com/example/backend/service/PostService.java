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
                            post.getBirdId(),
                            birdName,
                            post.getAreaId(),
                            areaName,
                            post.getObservedDate(),
                            post.getComment()
                    );
                })
                .toList();

    }

    public PostResponse createPost(PostRequest postRequest) {

        Post post = new Post(
                postRequest.getBirdId(),
                postRequest.getAreaId(),
                postRequest.getObservedDate(),
                postRequest.getComment()
        );

        Post savedPost = postRepository.save(post);

        Bird bird = birdService.getBirdById(savedPost.getBirdId());
        Area area = areaService.getAreaById(savedPost.getAreaId());

        String birdName = bird.getNameJa();
        String areaName = area.getName();

        return new PostResponse(
                savedPost.getPostId(),
                savedPost.getBirdId(),
                birdName,
                savedPost.getAreaId(),
                areaName,
                savedPost.getObservedDate(),
                savedPost.getComment()
        );
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
                            post.getBirdId(),
                            birdName,
                            post.getAreaId(),
                            areaName,
                            post.getObservedDate(),
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
                            post.getBirdId(),
                            birdName,
                            post.getAreaId(),
                            areaName,
                            post.getObservedDate(),
                            post.getComment()
                    );
                })
                .toList();
    }

    public PostResponse getPostById(Long postId) {
        Post foundPost = postRepository.findById(postId).orElse(null);

        Bird bird = birdService.getBirdById(foundPost.getBirdId());
        Area area = areaService.getAreaById(foundPost.getAreaId());

        String birdName = bird.getNameJa();
        String areaName = area.getName();

        return new PostResponse(
                foundPost.getPostId(),
                foundPost.getBirdId(),
                birdName,
                foundPost.getAreaId(),
                areaName,
                foundPost.getObservedDate(),
                foundPost.getComment()
        );
    }

    public void deletePostById(Long postId) {
        postRepository.deleteById(postId);
    }

    public PostResponse updatePost(Long postId,PostRequest postRequest) {
        Post post = postRepository.findById(postId).orElse(null);

        post.setBirdId(postRequest.getBirdId());
        post.setAreaId(postRequest.getAreaId());
        post.setObservedDate(postRequest.getObservedDate());
        post.setComment(postRequest.getComment());

        postRepository.save(post);

        Bird bird = birdService.getBirdById(post.getBirdId());
        Area area = areaService.getAreaById(post.getAreaId());

        return new PostResponse(
                post.getPostId(),
                post.getBirdId(),
                bird.getNameJa(),
                post.getAreaId(),
                area.getName(),
                post.getObservedDate(),
                post.getComment()
        );
    }
}
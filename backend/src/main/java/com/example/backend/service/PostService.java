package com.example.backend.service;

import com.example.backend.dto.PostResponse;
import com.example.backend.entity.Bird;
import com.example.backend.entity.Post;
import com.example.backend.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final BirdService birdService;

    public PostService(
            PostRepository postRepository,
            BirdService birdService
    ) {
        this.postRepository = postRepository;
        this.birdService = birdService;
    }

    public List<PostResponse> getAllPosts() {

        List<Post> posts = postRepository.findAll();

        return posts.stream()
                .map(post -> {

                    Bird bird = birdService.getBirdById(post.getBirdId());

                    String birdName = bird.getNameJa();

                    return new PostResponse(
                            post.getPostId(),
                            birdName,
                            post.getObservedDate(),
                            null,
                            post.getComment()
                    );
                })
                .toList();

    }
}
package com.example.backend.controller;

import com.example.backend.dto.PostResponse;
import com.example.backend.dto.PostRequest;
import com.example.backend.entity.Post;
import com.example.backend.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostResponse> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public void createPost(@RequestBody PostRequest postRequest) {
        postService.createPost(postRequest);
    }

    @GetMapping(params = "birdId")
    public List<PostResponse> getPostsByBirdId(
            @RequestParam Long birdId
    ) {
        return postService.getPostsByBirdId(birdId);
    }

    @GetMapping(params = "areaId")
    public List<PostResponse> getPostByAreaId(
            @RequestParam Long areaId
    ) {
        return postService.getPostsByAreaId(areaId);
    }
}
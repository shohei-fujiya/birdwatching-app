import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [posts, setPosts] = useState([])

  useEffect (() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:8080/api/posts")
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  },[])

  return (
      <>
        <h1>野鳥観察投稿アプリ</h1>

        {posts.map((post) => (
            <div key={post.postId}>
              <p>{post.birdName}</p>
              <p>{post.observedDate}</p>
              <p>{post.areaName}</p>
              <p>{post.comment}</p>
            </div>
          ))}

      </>
  )
}

export default App
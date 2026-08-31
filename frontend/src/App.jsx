import { useEffect, useState } from "react"
import "./App.css"
import PostDetail from "./PostDetail.jsx";
import PostCreate from "./PostCreate.jsx";
import { Routes, Route, Link, useNavigate } from "react-router-dom"

function App() {
  const [posts, setPosts] = useState([])
  const [birdId, setBirdId] = useState("")
  const [areaId, setAreaId] = useState("")
  const [observedDate, setObservedDate] = useState("")
  const [comment, setComment] = useState("")
  const [birds, setBirds] = useState([])
  const [areas, setAreas] = useState([])
  const [birdPosts, setBirdPosts] = useState([])
  const [selectedBirdId, setSelectedBirdId] = useState("")
  const [selectedAreaId, setSelectedAreaId] = useState("")
  const [areaPosts, setAreaPosts] = useState([])
  const [selectedPostId, setSelectedPostId] = useState("")
  const [selectedPost, setSelectedPost] = useState(null)

  const navigate = useNavigate()


  const fetchPosts = async () => {
    const response = await fetch("http://localhost:8080/api/posts")
    const data = await response.json()
    setPosts(data)
  }

  const fetchBirdPosts = async () => {
    if (selectedBirdId === "") {
        return
    }

    const response = await fetch(`http://localhost:8080/api/posts?birdId=${selectedBirdId}`)
    const data = await response.json()
    setBirdPosts(data)
  }

  const fetchAreaPosts = async () => {
    if (selectedAreaId === "") {
        return
    }

    const response = await fetch(`http://localhost:8080/api/posts?areaId=${selectedAreaId}`)
    const data = await response.json()
    setAreaPosts(data)
  }




  useEffect (() => {

    const fetchBirds = async () => {
      const response = await fetch("http://localhost:8080/api/birds")
      const data = await response.json()
      setBirds(data)
    }

    const fetchAreas = async () => {
      const response = await fetch("http://localhost:8080/api/areas")
      const data = await response.json()
      setAreas(data)
    }

    fetchPosts()
    fetchBirds()
    fetchAreas()
  },[])

  const handleSubmit = async () => {

      if (birdId === "" || areaId === "" || observedDate === "") {
          alert("入力されていない項目があります")
          return
      }

      const postData = {
      birdId,
      areaId,
      observedDate,
      comment
    }

    const response = await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })

    const createdPost = await response.json()

    console.log("createdPost:", createdPost)

    await fetchPosts()
    await fetchBirdPosts()
    await fetchAreaPosts()
    setBirdId("")
    setAreaId("")
    setObservedDate("")
    setComment("")
    setSelectedPostId(createdPost.postId)
    navigate(`/posts/${createdPost.postId}`)
  }

  useEffect (() => {
        if (selectedBirdId === "") {
          return
        }

        fetchBirdPosts()
  }, [selectedBirdId])

  useEffect (() => {
      if (selectedAreaId === "") {
          return
      }

      fetchAreaPosts()
    }, [selectedAreaId])

    useEffect(() => {
        if (selectedPostId === "") {
            return
        }

        const fetchSelectedPost = async () => {
            const response = await fetch(`http://localhost:8080/api/posts/${selectedPostId}`)
            const data = await response.json()
            setSelectedPost(data)
        }

        fetchSelectedPost()
    },[selectedPostId])

  return (
      <>
        <nav>
            <Link to="/">TOP</Link>

       </nav>

        <Routes>
            <Route
              path="/"
              element={
                <>
                    <div className="app-title">
                        <div className="app-title-en">
                            BIRD WATCHING IN KUSHIRO & NEMURO
                        </div>
                        <h1>小鳥の旅</h1>
                        <p className="app-description">
                            釧路・根室の野鳥観察を、もっと身近に。
                        </p>
                    </div>

                    <div className="top-grid">

                        <section className="top-section">
                            <h2>鳥で探す</h2>
                            <select
                                value={selectedBirdId}
                                onChange={(e) => setSelectedBirdId(Number(e.target.value))}
                            >
                                <option value="">鳥を選択してください</option>
                                {birds.map((bird) => <option
                                    key={bird.id}
                                    value={bird.id}
                                >
                                    {bird.nameJa}
                                </option>)}
                            </select>

                            <h3 className="result-title">選択した鳥の投稿</h3>
                            {[...birdPosts]
                                .sort((a, b) => new Date(b.observedDate) - new Date(a.observedDate))
                                .map((post) => (
                                    <div
                                        className="search-post-card"
                                        key={post.postId}
                                        onClick={() => {
                                            setSelectedPostId(post.postId)
                                            navigate(`/posts/${post.postId}`)
                                        }}
                                    >
                                        <span className="post-bird">{post.birdName}</span>
                                        <span className="post-date">{post.observedDate}</span>
                                        <span className="post-area">{post.areaName}</span>
                                    </div>
                                ))
                            }
                        </section>

                        <section className="top-section">
                            <h2>エリアで探す</h2>
                            <select
                                value={selectedAreaId}
                                onChange={(e) => setSelectedAreaId(Number(e.target.value))}
                            >
                                <option value="">エリアを選択してください</option>
                                {areas.map((area) => <option
                                    key={area.id}
                                    value={area.id}
                                >
                                    {area.name}
                                </option>)}
                            </select>

                            <h3 className="result-title">選択したエリアの投稿</h3>
                            {[...areaPosts]
                                .sort((a,b) => new Date(b.observedDate) - new Date(a.observedDate))
                                .map((post) => (
                                    <div
                                        className="search-post-card"
                                        key={post.postId}
                                        onClick={() => {
                                            setSelectedPostId(post.postId)
                                            navigate(`/posts/${post.postId}`)
                                        }}
                                    >
                                        <span className="post-bird">{post.birdName}</span>
                                        <span className="post-date">{post.observedDate}</span>
                                        <span className="post-area">{post.areaName}</span>
                                    </div>
                                ))
                            }
                        </section>

                        <section className="top-section">
                            <h2>投稿する</h2>

                            <Link className="post-link" to="/posts/new">
                                野鳥の観察情報を投稿する
                            </Link>
                        </section>

                        <section className="top-section">
                            <h2>最新投稿</h2>
                            {[...posts]
                                .sort((a,b) => new Date(b.observedDate) - new Date(a.observedDate))
                                .slice(0, 3)
                                .map((post) => (
                                    <div
                                        className="post-card"
                                        key={post.postId}
                                        onClick={() => {
                                            setSelectedPostId(post.postId)
                                            navigate(`/posts/${post.postId}`)

                                        }}
                                    >
                                        <span className="post-bird">{post.birdName}</span>
                                        <span className="post-date">{post.observedDate}</span>
                                        <span className="post-area">{post.areaName}</span>
                                    </div>
                                ))
                            }
                        </section>

                    </div>
                </>
              }
            />

            <Route
              path="/posts/new"
              element={
                <PostCreate
                  birdId={birdId}
                  setBirdId={setBirdId}
                  birds={birds}
                  areaId={areaId}
                  setAreaId={setAreaId}
                  areas={areas}
                  observedDate={observedDate}
                  setObservedDate={setObservedDate}
                  comment={comment}
                  setComment={setComment}
                  handleSubmit={handleSubmit}
                />}
            />

            <Route
                path="/posts/:postId"
                element={
                  selectedPost ? <PostDetail
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        selectedPostId={selectedPostId}
                        setSelectedPostId={setSelectedPostId}
                        birds={birds}
                        areas={areas}
                        fetchPosts={fetchPosts}
                        fetchBirdPosts={fetchBirdPosts}
                        fetchAreaPosts={fetchAreaPosts}
                    /> : <p>読み込み中...</p>
                }
            />
        </Routes>
      </>
  )
}

export default App
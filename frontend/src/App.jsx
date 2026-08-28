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

    await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })

    await fetchPosts()
    await fetchBirdPosts()
    await fetchAreaPosts()
    setBirdId("")
    setAreaId("")
    setObservedDate("")
    setComment("")
    navigate("/")
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

  return <>
    <nav>
        <Link to="/">トップ</Link>
        <Link to="/posts/new">投稿する</Link>
   </nav>

    <Routes>
        <Route
          path="/"
          element={
            <>
                <h1>野鳥観察投稿アプリ</h1>
                <h2>★最新投稿★</h2>
                {[...posts]
                    .sort((a,b) => new Date(b.observedDate) - new Date(a.observedDate))
                    .slice(0, 3)
                    .map((post) => (
                        <div
                            key={post.postId}
                            onClick={() => {
                                setSelectedPostId(post.postId)
                                navigate(`/posts/${post.postId}`)

                            }}
                        >
                            <p>{post.birdName}</p>
                            <p>{post.observedDate}</p>
                            <p>{post.areaName}</p>
                            <p>{post.comment}</p>
                        </div>
                    ))
                }

                <h2>★鳥で探す★</h2>
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
                </select><br />

                <h3>-----選択した鳥の投稿一覧-----</h3>
                {[...birdPosts]
                    .sort((a, b) => new Date(b.observedDate) - new Date(a.observedDate))
                    .map((post) => (
                        <div
                            key={post.postId}
                            onClick={() => {
                                setSelectedPostId(post.postId)
                                navigate(`/posts/${post.postId}`)
                            }}
                        >
                            <p>{post.birdName}</p>
                            <p>{post.observedDate}</p>
                            <p>{post.areaName}</p>
                            <p>{post.comment}</p>
                        </div>
                    ))
                }

                <h2>★エリアで探す★</h2>
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

                <h3>-----選択したエリアの投稿一覧-----</h3>
                {[...areaPosts]
                    .sort((a,b) => new Date(b.observedDate) - new Date(a.observedDate))
                    .map((post) => (
                        <div
                            key={post.postId}
                            onClick={() => {
                                setSelectedPostId(post.postId)
                                navigate(`/posts/${post.postId}`)
                            }}
                        >
                            <p>{post.birdName}</p>
                            <p>{post.observedDate}</p>
                            <p>{post.areaName}</p>
                            <p>{post.comment}</p>
                        </div>
                    ))
                }
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
}

export default App
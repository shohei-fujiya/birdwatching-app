import { useEffect, useState } from "react"
import "./App.css"

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


  const fetchPosts = async () => {
    const response = await fetch("http://localhost:8080/api/posts")
    const data = await response.json()
    setPosts(data)
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

    fetchPosts()
  }


  useEffect (() => {
        if (selectedBirdId === "") {
          return
        }

        const fetchBirdPosts = async () => {
            const response = await fetch(`http://localhost:8080/api/posts?birdId=${selectedBirdId}`)
            const data = await response.json()
            setBirdPosts(data)
        }

        fetchBirdPosts()
  }, [selectedBirdId])

  useEffect (() => {
      if (selectedAreaId === "") {
          return
      }

      const fetchAreaPosts = async () => {
          const response = await fetch(`http://localhost:8080/api/posts?areaId=${selectedAreaId}`)
          const data = await response.json()
          setAreaPosts(data)
      }

      fetchAreaPosts()
    }, [selectedAreaId])

  return (
      <>
        <h1>野鳥観察投稿アプリ</h1><br />
        <h2>★鳥で探す★</h2>
            <select
                value={selectedBirdId}
                onChange={(e) => setSelectedBirdId(Number(e.target.value))}
            >
                <option value="">鳥を選択してください</option>
                {birds.map((bird) => (
                    <option
                        key={bird.id}
                        value={bird.id}
                    >
                        {bird.nameJa}
                    </option>
                ))}
            </select><br />

            <h3>選択した鳥の投稿一覧</h3>
            {birdPosts.map((post) => (
                <div key={post.postId}>
                    <p>{post.birdName}</p>
                    <p>{post.observedDate}</p>
                    <p>{post.areaName}</p>
                    <p>{post.comment}</p>
                </div>
            ))}
            <br />

            <h2>★エリアで探す★</h2>
                <select
                    value={selectedAreaId}
                    onChange={(e) => setSelectedAreaId(Number(e.target.value))}
                >
                    <option value="">エリアを選択してください</option>
                    {areas.map((area) => (
                        <option
                            key={area.id}
                            value={area.id}
                        >
                            {area.name}
                        </option>
                    ))}
                </select>

                <h3>選択したエリアの投稿一覧</h3>
                {areaPosts.map((post) => (
                    <div key={post.postId}>
                        <p>{post.birdName}</p>
                        <p>{post.observedDate}</p>
                        <p>{post.areaName}</p>
                        <p>{post.comment}</p>
                    </div>
                ))}



            <br />
            <br />
            <select
                value={birdId}
                onChange={(e) =>
                    setBirdId(
                        e.target.value === "" ? "" : Number(e.target.value))}
            >
                <option value="">鳥を選択してください</option>

                {birds.map((bird) => (
                    <option
                        key={bird.id}
                        value={bird.id}
                    >
                      {bird.nameJa}
                    </option>
                ))}
            </select>

            <select
                value={areaId}
                onChange={(e) =>
                    setAreaId(
                        e.target.value === "" ? "" : Number(e.target.value))}
            >
                <option value="">エリアを選択してください</option>

                {areas.map((area) =>(
                    <option
                        key={area.id}
                        value={area.id}>
                      {area.name}
                    </option>
                ))}
            </select>

            <input
                type="date"
                value={observedDate}
                onChange={(e) => setObservedDate(e.target.value)}
            />

            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <br />
            <button onClick={handleSubmit} >
                投稿する
            </button>


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
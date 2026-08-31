import { useState } from "react"
import { useNavigate } from "react-router-dom"

function PostDetail({
    selectedPost,
    selectedPostId,
    setSelectedPost,
    setSelectedPostId,
    birds,
    areas,
    fetchPosts,
    fetchBirdPosts,
    fetchAreaPosts
}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editBirdId, setEditBirdId] = useState("")
    const [editAreaId, setEditAreaId] = useState("")
    const [editObservedDate, setEditObservedDate] = useState("")
    const [editComment, setEditComment] = useState("")

    const navigate = useNavigate()

    const handleEditStart = () => {
        setEditBirdId(selectedPost.birdId)
        setEditAreaId(selectedPost.areaId)
        setEditObservedDate(selectedPost.observedDate)
        setEditComment(selectedPost.comment)

        setIsEditing(true)
    }

    const handleUpdate = async () => {
        const postData = {
            birdId: editBirdId,
            areaId: editAreaId,
            observedDate: editObservedDate,
            comment: editComment
        }

        const response =
            await fetch(`http://localhost:8080/api/posts/${selectedPostId}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(postData)
            })

        const data = await response.json()
        setSelectedPost(data)
        await fetchPosts()
        setIsEditing(false)
    }

    const handleDelete = async () => {
        const confirmed = window.confirm("この投稿を削除しますか？")

        if (!confirmed) {
            return
        }

        await fetch(`http://localhost:8080/api/posts/${selectedPostId}`,
            {
                method: "DELETE"
            })

        await fetchPosts()
        await fetchBirdPosts()
        await fetchAreaPosts()
        setSelectedPost(null)
        setSelectedPostId("")
        navigate("/")
    }


    return (
        <div>
            {isEditing && (
                <div className="edit-form">
                    <h2 className="edit-title">投稿を編集</h2>

                    <select
                        className="edit-select"
                        value={editBirdId}
                        onChange={(e) =>
                            setEditBirdId(
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
                        className="edit-select"
                        value={editAreaId}
                        onChange={(e) =>
                            setEditAreaId(
                                e.target.value === "" ? "" : Number(e.target.value))}
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

                    <input
                        className="edit-input"
                        type="date"
                        value={editObservedDate}
                        onChange={(e) => setEditObservedDate(e.target.value)}
                    />

                    <textarea
                        className="edit-textarea"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                    />

                  <button
                      className="edit-save-button"
                      onClick={handleUpdate}>
                        保存
                  </button>
                </div>
            )}

            <div className="detail-page">
                <h2 className="page-title">投稿詳細</h2>

                <div className="detail-card">
                    <div className="detail-row">
                        <span className="detail-label">鳥名</span>
                        <span className="detail-value">{selectedPost.birdName}</span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">観察日</span>
                        <span className="detail-value">{selectedPost.observedDate}</span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">エリア</span>
                        <span className="detail-value">{selectedPost.areaName}</span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">コメント</span>
                        <span className="detail-value">{selectedPost.comment}</span>
                    </div>

                    <div className="detail-actions">
                        <button onClick={handleEditStart}>編集</button>
                        <button onClick={handleDelete}>削除</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export  default PostDetail
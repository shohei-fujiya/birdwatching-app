import { useState } from "react"

function PostCreate({
    birdId,
    setBirdId,
    birds,
    areaId,
    setAreaId,
    areas,
    observedDate,
    setObservedDate,
    comment,
    setComment,
    handleSubmit
}) {
   return (
       <>
           <div className="post-form-page">
               <h2 className="page-title">投稿する</h2>

               <form className="post-form">
                   <div className="form-group">
                       <label>鳥</label>
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
                   </div>

                   <div className="form-group">
                       <label>観察日</label>
                       <input
                           type="date"
                           value={observedDate}
                           onChange={(e) => setObservedDate(e.target.value)}
                       />
                   </div>

                   <div className="form-group">
                       <label>エリア</label>
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
                   </div>

                   <div className="form-group">
                       <label>コメント</label>
                       <textarea
                           value={comment}
                           onChange={(e) => setComment(e.target.value)}
                       />
                   </div>

                   <button
                       className="form-submit" type="button"
                       onClick={handleSubmit}
                   >
                       投稿する
                   </button>
               </form>
           </div>
       </>
   )

}

export default PostCreate
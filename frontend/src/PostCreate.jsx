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
           <h2>★野鳥観察投稿フォーム★</h2>
           <div>
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
           </div>
       </>
   )

}

export default PostCreate
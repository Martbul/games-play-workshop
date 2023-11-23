//! formata e napravena bez kontrolirana forma(NE Q PRAVI TAKA(sammo za spestqvane na vreme na workshopa e napravena nekontrolirana))
import { useNavigate, useParams } from "react-router-dom";

import * as gameService from "../../services/gameServices";
import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";


export default function GameEdit() {
    const navigate = useNavigate()
    const {gameId} = useParams()
  const [game, setGame] = useState({
    title:'',
      category:'',
      maxLevel:'',
      imageUrl:'',
      summary:'',
  })

  useEffect(() => {
    gameService.getOne(gameId)
    .then(result =>{
      setGame(result)
    })
  },[gameId])

  const editGameSubmitHandler = async (formValues) => {
     try {
         await gameService.edit(gameId,formValues);
        navigate(`/games`)
    } catch (error) {
        console.log(error);
    }
}

const {formValues, onChange, onSubmit} = useForm(editGameSubmitHandler,game )

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={onSubmit}>
        <div className="container">
          <h1>Create Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={onChange}
            value={formValues.title}
            placeholder="Enter game title..."
           
            
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter game category..."
            onChange={onChange}
            value={formValues.category}
          />

          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            placeholder="1"
            onChange={onChange}
            value={formValues.maxLevel}
          />

          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Upload a photo..."
            onChange={onChange}
            value={formValues.imageUrl}
          />

          <label htmlFor="summary">Summary:</label>
          <textarea name="summary" id="summary"  onChange={onChange}  value={formValues.summary}></textarea>
          <input className="btn submit" type="submit" value="Edit Game" />
        </div>
      </form>
    </section>
  );
}


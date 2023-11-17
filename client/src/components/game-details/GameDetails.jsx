import { useState,useEffect} from "react";
import * as gameService from "../../services/gameServices";
 import * as commentsService from "../../services/commentServices";
import { useParams } from "react-router-dom"
export default function GameDetails({
   

}){

    const {gameId} = useParams()
    const [game, setGame] = useState({})
      const [comments, setComments] = useState([]);

    useEffect(()=>{
        gameService.getOne(gameId)
            .then(setGame)
        
        commentsService.getAll(gameId)
            .then(setComments)
    }, [gameId])
    
    const addCommentHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)


        const newComment = await commentsService.create(gameId, formData.get('username'), formData.get('comment'))
        
        //saving the old state than adding the new comment to the state(NOT RESINGING THE STATE)
        setComments(state => [...state, newComment])
        console.log(newComment);
    }

    return (
      <section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">
          <div className="game-header">
            <img className="game-img" src={game.imageUrl} alt={game.title} />
            <h1>{game.title}</h1>
            <span className="levels">MaxLevel: {game.maxLevel}</span>
            <p className="type">{game.category}</p>
          </div>

          <p className="text">{game.summary}</p>

          <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
              {comments.map(({_id, username, text }) => (
                <li key={_id} className="comment">
                      <p>{username}: { text}</p>
                </li>
              ))}
                    </ul>
                    
                    {comments.length === 0 && (
                        
            <p className="no-comment">No comments.</p>
                    )}

          </div>

          {/*               
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>*/}
        </div>

        <article className="create-comment">
          <label>Add new comment:</label>
          <form className="form" onSubmit={addCommentHandler}>
            <input type="text" name="username" placeholder="username" />
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input className="btn submit" type="submit" value="Add Comment" />
          </form>
        </article>
      </section>
    );
}
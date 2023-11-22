import { useState, useEffect, useContext } from "react";
import * as gameService from "../../services/gameServices";
import * as commentsService from "../../services/commentServices";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useReducer } from "react";
import reducer from './commentReducer'
import useForm from "../../hooks/useForm";


export default function GameDetails({}) {
  const {email} = useContext(AuthContext)
  const { gameId } = useParams();
  const [game, setGame] = useState({});
  // const [comments, setComments] = useState([]);
const [comments,dispatch] = useReducer(reducer,[])
 




useEffect(() => {
    gameService.getOne(gameId)
    .then(setGame);

    commentsService.getAll(gameId)
    .then((result)=>{
      dispatch({
        type:'GET_ALL_COMMENTS',
        payload: result,
      })
    });
  }, [gameId]);

  const addCommentHandler = async (values) => {
   const newComment = await commentsService.create(
      gameId,
     values.comment
    );

    newComment.owner = {email}



    //saving the old state than adding the new comment to the state(NOT RESINGING THE STATE)
    //setComments((state) => [...state, {...newComment, author:{email}}]);
  dispatch({
    type:'ADD_COMMENT',
    payload: newComment
  })
  };



const {formValues, onChange, onSubmit} = useForm(addCommentHandler,{
  comment: '',

})
  


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
            {comments.map(({ _id, text, owner: { email } }) => (
              <li key={_id} className="comment">
                <p>
                  {email}: {text}
                </p>
              </li>
            ))}
          </ul>

          {comments.length === 0 && <p className="no-comment">No comments.</p>}
        </div>

        {/*               
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>*/}
      </div>

      <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form" onSubmit={onSubmit}>
          <textarea name="comment" placeholder="Comment......" value={formValues.comment} onChange={onChange}></textarea>
          <input className="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>
    </section>
  );
}

import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import moment from "moment";

const Comments = ({postId}) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  
  const { isLoading, error, data } = useQuery({queryKey: ['comments'], queryFn: () =>
    makeRequest.get("/comments?postId="+postId).then(res => {
      return res.data;
    })
  })
  console.log(data)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({desc, postId})
    setDesc("")
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/"+currentUser.profilePic} alt="" />
        <input type="text" placeholder="Напишите коментарий" onChange={e => setDesc(e.target.value)} value={desc}/>
        <button onClick={handleClick}>Отправить</button>
      </div>
      {isLoading ? "Загрузка..." : data.map((comment) => (
        <div className="comment">
          <img src={"/upload/"+comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;

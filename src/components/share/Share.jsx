import "./share.scss";
import { useState } from 'react';
import CollectionsIcon from '@mui/icons-material/Collections';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if(file) imgUrl = await upload();
    mutation.mutate({desc, img: imgUrl})
    setDesc("")
    setFile(null)
  }

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={"/upload/" + currentUser.profilePic}
              alt=""
            />
            <input type="text" placeholder={`Чем бы вы хотели поделиться ${currentUser.name}?`} onChange={(e)=> setDesc(e.target.value)} value={desc}/>
          </div>
          <div className="right">
            {file && <img className="file" alt="file" src={URL.createObjectURL(file)}/>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <CollectionsIcon />
                <span>+ Изображение</span>
              </div>
            </label>
            <div className="item">
              <FmdGoodIcon />
              <span>+ Место</span>
            </div>
            <div className="item">
              <LoyaltyIcon />
              <span>Отметить друзей</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Поделиться</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;

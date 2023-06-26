import "./leftBar.scss";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ForumIcon from '@mui/icons-material/Forum';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <Link
            to={`/profile/${currentUser.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
          <div className="user">
            <img
              src={"/upload/" + currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          </Link>
          <Link to={`/followers`} style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item">
              <Diversity1Icon />
              <span>Подписчики</span>
            </div>
          </Link>
          <div className="item">
            <GroupAddIcon />
            <span>Подписки</span>
          </div>
          <div className="item">
            <ForumIcon />
            <span>Сообщения</span>
          </div>
          <div className="item">
            <ThumbUpIcon />
            <span>Понравилось</span>
          </div>
          <div className="item">
            <SmartDisplayIcon />
            <span>Видео</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default LeftBar;

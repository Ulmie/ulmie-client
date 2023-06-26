import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./followers.scss"
import { AuthContext } from "../../context/authContext"
import { useContext } from "react"
import { makeRequest } from "../../axios"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  const { isLoading, data } = useQuery(
    ["followers"],
    () =>
      makeRequest.get("/followers?followedUserId=" + currentUser.id).then((res) => {
        return res.data;
      })
  );

  console.log(data)
  return (
    <div className="followers">
      <h1>Ваши подписчики</h1>
      {isLoading ? 
      "Загрузка..." : (
        <div className="container">
          {data.map(follower => (
            <div className="item">
                <Link to={`/profile/${follower.followerUserId}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="left">
                    <img src={"/upload/"+follower.profilePic} alt="" />
                    <span>{follower.name}</span>
                  </div>
                </Link>
                <div className="right">
                  
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
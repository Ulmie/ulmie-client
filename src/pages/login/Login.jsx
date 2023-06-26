import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]:e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(inputs);
      navigate("/");
    } catch(err) {
      setErr(err.response.data)
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          
        </div>
        <div className="right">
          <h1>Вход</h1>
          <form>
            <input type="text" placeholder="Логин" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Пароль" name="password" onChange={handleChange}/>
            {err && err}
            <button onClick={handleLogin}>Войти</button>
          </form>
          <div className="bottom">
            <span>Если вы не имеете аккаунта</span>
            <Link to="/register">
              <button className="btn">Регистрация</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

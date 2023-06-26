import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  })
  const [err, setErr] = useState(null);

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]:e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault()

    try {
      await axios.post("https://ulmie-api-production.up.railway.app/api/auth/register", inputs)
    } catch(err) {
      setErr(err.response.data);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          
        </div>
        <div className="right">
          <h1>Регистрация</h1>
          <form>
            <input type="text" placeholder="Логин" name="username" onChange={handleChange} />
            <input type="email" placeholder="Электронная почта" name="email" onChange={handleChange} />
            <input type="password" placeholder="Пароль" name="password" onChange={handleChange} />
            <input type="text" placeholder="Имя" name="name" onChange={handleChange} />
            {err && err}
            <div className="btns">
              <button onClick={handleClick}>Регистрация</button>
              <div className="bottom">
                <Link to="/login">
                  <button className="btn">Войти</button>
                </Link>
                <span>Если у вас есть аккаунт</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

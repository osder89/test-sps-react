import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";
import "../css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await AuthService.login({ email, password });
      AuthService.setToken(response.token); 
      navigate("/users"); 
    } catch (error) {
      setErrorMessage("Credenciales incorrectas.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Iniciar sesión</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
        <p className="login-register">
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

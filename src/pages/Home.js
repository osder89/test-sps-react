import React from "react";
import { Link } from "react-router-dom";
import '../css/home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a SPS React Test</h1>
        <p>Inicia sesión y accede a todas nuestras herramientas</p>
        <Link to="/login" className="home-button">Iniciar sesión</Link>
      </header>

      <section className="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Interfaz intuitiva</h3>
            <p>Fácil de usar, diseñada para que puedas empezar de inmediato.</p>
          </div>
          <div className="feature">
            <h3>Seguridad</h3>
            <p>Protección de datos con las mejores prácticas de seguridad.</p>
          </div>
          <div className="feature">
            <h3>Accesible desde cualquier lugar</h3>
            <p>Accede a la plataforma desde cualquier dispositivo de manera sencilla.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2023 SPS | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default Home;

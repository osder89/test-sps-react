import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import '../css/users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", name: "", type: "user", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.list();
        setUsers(response);
      } catch (error) {
        setErrorMessage("No se pudieron cargar los usuarios.");
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
        const response = await UserService.create(newUser);
        const createdUser = response.user; 
        console.log(createdUser); 
        
        if (createdUser && createdUser.id) {
            setUsers(prevUsers => [...prevUsers, createdUser]);
            setNewUser({ email: "", name: "", type: "user", password: "" });
            setErrorMessage("");
        } else {
            setErrorMessage("Hubo un error al recibir los datos del usuario creado.");
        }
    } catch (error) {
        console.error(error); 
        setErrorMessage("Hubo un error al agregar el usuario.");
    }
};


  const handleDeleteUser = async (id) => {
    try {
      await UserService.delete(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setErrorMessage("Hubo un error al eliminar el usuario.");
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleAddUser}>
        <h3>Agregar Nuevo Usuario</h3>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Contraseña"
          required
        />
        <select name="type" value={newUser.type} onChange={handleInputChange}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Agregar Usuario</button>
      </form>

      <h3>Usuarios Registrados</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.name} ({user.email})</span>
            <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
            <Link to={`/users/${user.id}`}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;

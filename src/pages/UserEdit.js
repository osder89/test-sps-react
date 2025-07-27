import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

function EditUser() {
  const user = useLoaderData();
  const [editedUser, setEditedUser] = useState(user);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  if (!editedUser) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.update(editedUser.id, editedUser);
      navigate("/users");
    } catch (error) {
      setErrorMessage("Hubo un error al guardar el usuario.");
    }
  };

  return (
    <div className="edit-user-container">
      <h1>Editar Usuario</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            required
            readOnly
          />
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">guardar</button>
      </form>
    </div>
  );
}

export default EditUser;

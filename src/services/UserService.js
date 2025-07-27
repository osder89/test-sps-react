import axios from "axios";

class UserService {
  getAuthToken() {
    return localStorage.getItem("jwtToken");
  }

  getAuthHeaders() {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error("Token no encontrado. Por favor, inicia sesión.");
    }
    return {
      Authorization: `Bearer ${token}`
    };
  }

  async list() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener la lista de usuarios: " + error.message);
    }
  }

  async get(id) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el usuario: " + error.message);
    }
  }

  async create(data) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, data, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al crear el usuario: " + error.message);
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al eliminar el usuario: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, data, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar el usuario: " + error.message);
    }
  }
}

export default new UserService();

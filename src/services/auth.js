import axios from "axios";

class AuthService {
  async login(credentials) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw new Error("Credenciales incorrectas o error en el servidor");
    }
  }

  getToken() {
    return localStorage.getItem("jwtToken");
  }

  logout() {
    localStorage.removeItem("jwtToken");
  }

  isAuthenticated() {
    const token = this.getToken();
    return token ? true : false;
  }

  setToken(token) {
    localStorage.setItem("jwtToken", token);
  }
}

export default new AuthService();

import axios from "axios";
import jwtDecode from "jwt-decode";
import AuthToken from "../utils/auth-token";

const apiUrl = process.env.REACT_APP_API_BASEURL + "/login/";

class AuthService {
  async login({ username, password}) {
    try {
      const response = await axios.post(apiUrl + "login", {
        username,
        password,
      });
      // console.log(response);
      if (response.data && response.data.data.token) {
        // console.log(decoded);
        const token = response.data.data.token;
        const { exp } = jwtDecode(token);
        AuthToken.setToken(token, exp);
        return response.data;
      }
    } catch (error) {
      // console.error(error);
      return { error };
    }
  }

  logout() {
    AuthToken.removeToken();
  }

  getUserRole() {
    const token = AuthToken.getToken();
    let mRole = null;
   
      mRole= jwtDecode(token);
     
    return mRole;
  }

  setupInterceptor() {
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        console.log({ error });
        if (
          401 === error.response.status ||
          (400 === error.response.status &&
            error.response.data.msg === "Missing or malformed JWT")
        ) {
          AuthToken.removeToken();
          window.location = "/";
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
}

export default new AuthService();



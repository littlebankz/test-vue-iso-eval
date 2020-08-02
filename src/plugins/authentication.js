import axios from "axios";

const authentication = {
  getLocalStorageUsername: () => {
    // Retrieve username from localStorage
    return localStorage.getItem("username");
  },
  getLocalStorageAuthToken: () => {
    // Retrieve authToken from localStorage
    return localStorage.getItem("user-token");
  },
  setLocalStorageUsername: (username) => {
    // Retrieve username from localStorage
    localStorage.setItem("username", username);
  },
  setLocalStorageAuthToken: (authToken) => {
    // Retrieve authToken from localStorage
    localStorage.setItem("user-token", authToken);
  },
  signIn: async (username, password) => {
    // Try login to api server
    try {
      const result = await axios.post(process.env.VUE_APP_API_URL + "/login", {
        username,
        password,
      });
      if (result.status == 200) {
        return result.data;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  signOut: async (username, authToken) => {
    try {
      axios.delete(process.env.VUE_APP_API_URL + "/login", {
        username,
        authToken,
      });

      this.destroyLocalStorageItems();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  validateAuthToken: async (username, authToken) => {
    // Validate authToken with server api
    try {
      const result = await axios.post(process.env.VUE_APP_API_URL + "/login/authtoken", {
        username,
        authToken,
      });
      return await result.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  destroyLocalStorageItems: () => {
    // Remove items in localStorage and redirect to sign in page
    localStorage.removeItem("username");
    localStorage.removeItem("user-token");
  },
};

export default authentication;

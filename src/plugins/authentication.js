import axios from 'axios'

const authentication = {
  getUsername: () => {
    // Retrieve username from localStorage
    return localStorage.getItem("username");
  },
  getAuthToken: () => {
    // Retrieve authToken from localStorage
    return localStorage.getItem("user-token");
  },
  validateAuthToken: async (username, authToken) => {
    // Validate authToken with server api
    try {
      let result = await axios.post(process.env.VUE_APP_API_URL + "/login/authtoken", { username, authToken })
      return await result.data.isValid
    } catch (e) {
      console.log(e)
      return false
    }
    
  },
  destroyToken: () => {
    // Remove items in localStorage and redirect to sign in page
    localStorage.removeItem("username");
    localStorage.removeItem("user-token");
  }
}

export default authentication


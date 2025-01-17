export const localService = {
    // Get access token from localStorage
    getAccessToken: () => {
        return localStorage.getItem("accessToken") || null;
    },

    // Save access token to localStorage
    setAccessToken: (token) => {
        localStorage.setItem("accessToken", token);
    },

    // Remove access token from localStorage
    removeAccessToken: () => {
        localStorage.removeItem("accessToken");
    },

    // Save user information to localStorage
    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    },

    // Get user information from localStorage
    getUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    // Remove user information from localStorage
    removeUser: () => {
        localStorage.removeItem("user");
    },

    // Clear all localStorage data related to the user
    clearUserSession: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
    },
};
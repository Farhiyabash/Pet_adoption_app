// utils/auth.js
export const storeToken = (token) => {
    localStorage.setItem('accessToken', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  export const clearToken = () => {
    localStorage.removeItem('accessToken');
  };
  
  // Refresh Token Implementation
  export const refreshToken = async () => {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    if (response.ok) {
      const { accessToken } = await response.json();
      storeToken(accessToken);
    } else {
      clearToken();
      window.location.href = '/login'; // Redirect to login
    }
  };
  
  // Function to check token validity and refresh if needed
  export const validateToken = async () => {
    const token = getToken();
    if (!token) return false;
  
    try {
      const response = await fetch('/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  };
  
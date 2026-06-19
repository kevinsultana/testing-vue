// API Service dengan fungsi yang di-disable untuk sementara
// Uncomment dan sesuaikan URL ketika siap untuk hit API

const API_BASE_URL = 'https://your-api-url.com/api';
const ENABLE_API = false; // Set ke true untuk mengaktifkan API calls

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - User data dan token
 */
export const loginUser = async (credentials) => {
  if (!ENABLE_API) {
    console.log('API disabled - Login attempt with:', credentials);
    // Simulate successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            user: {
              id: 1,
              email: credentials.email,
              name: 'Test User',
            },
            token: 'fake-jwt-token-12345',
          },
        });
      }, 1000);
    });
  }

  // Uncomment when ready to use real API
  /*
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
  */
};

/**
 * Register new user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} - User data dan token
 */
export const registerUser = async (userData) => {
  if (!ENABLE_API) {
    console.log('API disabled - Register attempt with:', userData);
    // Simulate successful registration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            user: {
              id: 2,
              email: userData.email,
              name: userData.name,
            },
            token: 'fake-jwt-token-67890',
          },
        });
      }, 1000);
    });
  }

  // Uncomment when ready to use real API
  /*
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
  */
};

/**
 * Logout user
 * @returns {Promise<Object>}
 */
export const logoutUser = async () => {
  if (!ENABLE_API) {
    console.log('API disabled - Logout');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }

  // Uncomment when ready to use real API
  /*
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
  */
};

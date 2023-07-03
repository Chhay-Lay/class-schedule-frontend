import axios from 'axios';
// import vueCookies from 'vue-cookies';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      common: {
        'Authorization': 'Bearer ' + localStorage.getItem('token') // Replace with your bearer token
      }
    }
})

const refreshToken = async () => {
  const response = await axios.post('/refresh', {
    token: localStorage.getItem('refresh-token', refresh)
  });

  const { token, refresh } = response.data.data;

  localStorage.setItem('token', token);
  localStorage.setItem('refresh-token', refresh);

  return token;
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshToken();

        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// instance.defaults.headers.common["Accept-Language"] = vueCookies.get('lang');
// instance.defaults.headers.common["Authorization"] = 'Bearer ' + vueCookies.get('__token');

export default instance
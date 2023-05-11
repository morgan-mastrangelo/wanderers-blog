import axios from 'axios';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://wanderers-blog-api.herokuapp.com/api/v1/'
    : 'http://localhost:3001/api/v1';

const API = axios.create({
  baseURL: url,
});

// Auth
export const login = (loginUser) =>
  API.post('/auth/login', loginUser, { withCredentials: true });
export const register = (registerUser) =>
  API.post('/auth/register', registerUser, { withCredentials: true });
export const forgotPassword = (resetUser) =>
  API.post('/auth/forgot-password', resetUser, { withCredentials: true });
export const resetPassword = (resetUser) =>
  API.post('/auth/reset-password', resetUser, { withCredentials: true });
export const verifyEmail = (formData) =>
  API.post('/auth/verify-email', formData, { withCredentials: true });
export const isLoggedIn = () =>
  API.get('/auth/isLoggedIn', { withCredentials: true });
export const logout = () =>
  API.delete('/auth/logout', { withCredentials: true });

// ========== User ==========
export const deleteUser = (id) =>
  API.delete('/user/' + id, { withCredentials: true });
export const getUser = (id) =>
  API.get('/user/' + id, { withCredentials: true });
export const editUser = (id, updatedUser) =>
  API.patch('/user/' + id, updatedUser, { withCredentials: true });

// ========== Blogs ==========
export const deleteBlog = (id) =>
  API.delete('/blogs/' + id, { withCredentials: true });
export const getAllBlogs = (searchText) =>
  API.get('/blogs?search=' + searchText, { withCredentials: true });
export const getBlog = (id) =>
  API.get('/blogs/' + id, { withCredentials: true });
export const createBlog = (blogData) =>
  API.post('/blogs/create', blogData, { withCredentials: true });

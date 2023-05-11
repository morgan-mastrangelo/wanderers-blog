import * as api from '../api/index';

export const register = async (registerUser) => {
  try {
    const { data } = await api.register(registerUser);
    if (data && data.status === 'Registered') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const verifyEmail = async (formData) => {
  try {
    const { data } = await api.verifyEmail(formData);
    if (data && data.status === 'Email verified') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const login = async (loginUser) => {
  try {
    const { data } = await api.login(loginUser);
    if (data && data.message === 'Logged In') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const forgotPassword = async (resetUser) => {
  try {
    const { data } = await api.forgotPassword(resetUser);
    if (data) {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const resetPassword = async (resetUser) => {
  try {
    const { data } = await api.resetPassword(resetUser);
    if (data && data.status === 'Password updated') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const logout = async () => {
  try {
    const { data } = await api.logout();
    if (data && data.status === 'logout') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const isLoggedIn = async () => {
  try {
    const { data } = await api.isLoggedIn();
    if (data.user && data.status === 'success') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

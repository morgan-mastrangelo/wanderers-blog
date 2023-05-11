import * as api from '../api/index';

export const editUser = async (id, updatedUser) => {
  try {
    const { data } = await api.editUser(id, updatedUser);
    if (data && data.status === 'Updated User') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const getParticularUser = async (id) => {
  try {
    const { data } = await api.getUser(id);
    if (data && data.status === 'success') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const deleteParticularUser = async (id) => {
  try {
    const { data } = await api.deleteUser(id);
    if (data && data.status === 'Account Deleted') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

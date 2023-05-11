import * as api from '../api/index';

export const deleteBlog = async (id) => {
  try {
    const { data } = await api.deleteBlog(id);
    if (data && data.status === 'deleted') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const getAllBlogs = async (searchText) => {
  try {
    const { data } = await api.getAllBlogs(searchText);
    if (data.length > 0 && data.status === 'success') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const getParticularBlog = async (id) => {
  try {
    const { data } = await api.getBlog(id);
    if (data.blog && data.status === 'success') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

export const createBlog = async (blogData) => {
  try {
    const { data } = await api.createBlog(blogData);
    if (data.blog && data.status === 'CREATED') {
      return { status: 'success', data };
    }
  } catch (error) {
    const { message } = error.response.data;
    return { status: 'error', data: message || 'There was an error' };
  }
};

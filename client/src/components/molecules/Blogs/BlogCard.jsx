import { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultBlog from '../../../assets/default-blog.jpg';
import { DeleteIcon } from '../../vectors/deleteIcon';
import Modal from '../../atoms/Modal';
import useLocalState from '../../../utils/localState';
import Alert from '../../atoms/Alert';
import { deleteBlog } from '../../../actions/blog';

const BlogCard = ({ blog, isMainUser }) => {
  const [showModal, setShowModal] = useState(false);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const deleteBlogHandler = async (e) => {
    setShowModal(false);
    hideAlert();
    setLoading(true);
    const { status, data } = await deleteBlog(blog._id);
    if (status === 'success') {
      showAlert({
        text: `Deleted Blog.`,
        type: 'success',
      });
      setInterval(() => {
        window.location.reload(true);
      }, 1000);
    } else {
      showAlert({ text: data || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        close={closeHandler}
        title="Delete Blog"
        text={`Are you sure you want to delete the ${blog.title} blog?`}
        confirm={deleteBlogHandler}
      />
      {alert.show && (
        <Alert
          type={alert.type}
          display={alert.show}
          text={alert.text}
          hideAlert={hideAlert}
        />
      )}
      <div className="relative blog-card">
        {isMainUser && (
          <button
            className="absolute right-3 top-5 border-0 p-0 w-5 z-30"
            onClick={() => setShowModal(true)}
          >
            <DeleteIcon />
          </button>
        )}
        <div className="image-blog">
          <img src={defaultBlog} alt="" width={350} height={400} />
          <div className="img-overlay"></div>
        </div>
        <div className="py-4 px-6 flex-col-direction gap-1 z-10 relative blog-text">
          <Link
            to={`/blogs/${blog._id}`}
            className="text-2xl text-overflow w-fit"
            title={blog.title}
          >
            {blog.title}
          </Link>
          <h3 className="text-xl text-overflow" title={blog.locationName}>
            {blog.locationName}
          </h3>
          {blog.author.name && (
            <div className="flex-justify-between">
              <p
                className="text-lg text-overflow"
                title={`By ${blog.author.name}`}
              >
                By{' '}
                <Link
                  to={`/user/${blog.author._id}/user-info`}
                  className="text-pink-400"
                >
                  {blog.author.name}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogCard;

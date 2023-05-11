import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLocalState from '../../utils/localState';
import Spinner from '../../components/atoms/Spinner';
import Alert from '../../components/atoms/Alert';
import { getParticularBlog } from '../../actions/blog';

const BlogPage = () => {
  const blogID = useParams();
  const [blog, setBlog] = useState([]);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const getBlog = async () => {
    setLoading(true);
    const { status, data } = await getParticularBlog(blogID.id);
    if (status === 'success' && data.blog) {
      setBlog([data.blog]);
      hideAlert();
    } else {
      showAlert({ text: data || 'there was an error', type: 'danger' });
    }
    setLoading(false);
  };

  useEffect(() => {
    getBlog();
  }, []);

  useEffect(() => {
    if (blog.length > 0) {
      if (blog[0].title) document.title = `${blog[0].title} | Wanderer's Blog`;
    }
  }, [blog]);

  if (loading) {
    return <Spinner />;
  } else if (!loading && blog.length === 0) {
    return (
      <>
        {alert.show && (
          <Alert
            type={alert.type}
            display={alert.show}
            text={alert.text}
            hideAlert={hideAlert}
          />
        )}
      </>
    );
  } else if (blog.length > 0) {
    return (
      <div className="container px-4 md:px-0 mx-auto my-20">
        {alert.show && (
          <Alert
            type={alert.type}
            display={alert.show}
            text={alert.text}
            hideAlert={hideAlert}
          />
        )}
        {!alert.show && loading ? (
          <Spinner />
        ) : (
          <div className="blog-preview">
            <div className="flex-col-direction gap-2">
              <div>{blog[0].author.name}</div>
              <h2>{blog[0].title}</h2>
              <h3>{blog[0].locationName}</h3>
            </div>
            <pre className="whitespace-pre-wrap">{blog[0].blogDesc}</pre>
          </div>
        )}
      </div>
    );
  }
};

export default BlogPage;

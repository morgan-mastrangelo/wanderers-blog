import { useState, useEffect } from 'react';
import InputComponent from '../../components/atoms/InputComponent';
import useLocalState from '../../utils/localState';
import Alert from '../../components/atoms/Alert';
import Spinner from '../../components/atoms/Spinner';
import { createBlog } from '../../actions/blog';

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    locationName: '',
    blogDesc: '',
  });
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  useEffect(() => {
    document.title = "Create Blog | Wanderer's Blog";
  }, []);

  const inputHandler = (e) => {
    if (e.target.type === 'textarea') {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { title, locationName, blogDesc } = formData;
    hideAlert();
    setLoading(true);

    if (title && locationName && blogDesc) {
      const { status, data } = await createBlog(formData);
      if (data && status === 'success') {
        showAlert({
          text: `Created Blog ${data.blog.title}. Redirecting to blog page...`,
          type: 'success',
        });
        setInterval(() => {
          window.location = '/blogs/' + data.blog._id;
        }, 2000);
      } else {
        showAlert({ text: data || 'there was an error', type: 'danger' });
      }
      setLoading(false);
    }
  };

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
      {loading && <Spinner />}
      <main className="container mx-auto my-20 px-4 md:px-0">
        <div className="grid gap-6 grid-rows-2 md:grid-cols-2 md:grid-rows-none">
          <form
            action=""
            method="post"
            onSubmit={submitHandler}
            className={`flex-col-direction gap-3 ${loading}`}
          >
            {/* <input type="image" src="" alt="" /> */}
            <InputComponent
              label="Title"
              id="title"
              type="text"
              isRequired={true}
              value={formData.title}
              inputHandler={inputHandler}
            />
            <InputComponent
              label="Location"
              id="locationName"
              type="text"
              isRequired={true}
              value={formData.locationName}
              inputHandler={inputHandler}
            />
            <InputComponent
              label="Article"
              id="blogDesc"
              isRequired={true}
              isTextArea={true}
              value={formData.blog}
              inputHandler={inputHandler}
              rows={14}
            />
            <button type="submit" className="py-1 px-4 mt-7 w-full">
              {loading ? 'Submitting' : 'Submit'}
            </button>
          </form>
          <div className="blog-preview border p-7">
            <div className="flex-col-direction gap-2">
              <h2>{formData.title}</h2>
              <h3>{formData.locationName}</h3>
            </div>
            <pre className="whitespace-pre-wrap">{formData.blogDesc}</pre>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateBlogPage;

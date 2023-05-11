import BlogCard from '../../../components/molecules/Blogs/BlogCard';
import { Link } from 'react-router-dom';

const UserBlogsTab = ({ blogs, isPersonalPage }) => {
  if (blogs) {
    return (
      <section className="flex-col-direction gap-5 w-full">
        <div className="flex-justify-between">
          <h2 className="text-2xl">Blogs: </h2>
          {isPersonalPage && (
            <Link to="/create/blog" className="border text-xl py-2 px-5">
              Create Blog
            </Link>
          )}
        </div>
        {blogs.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center md:justify-start mx-2 mt-3">
            {blogs.map((el, i) => {
              return <BlogCard key={i} blog={el} isMainUser={isPersonalPage} />;
            })}
          </div>
        ) : (
          <div className="text-center border h-80 flex justify-center items-center">
            <p className="text-3xl">No blogs found by this user</p>
          </div>
        )}
      </section>
    );
  }
};

export default UserBlogsTab;

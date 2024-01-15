import { ChevronLeftOutline } from "@/assets/Icons";
import {
  DeleteModal,
  Image,
  Link,
  Loader,
  MyPagination,
  NoResultFound,
  PageHeading,
} from "@/components/common";
import { CONSTANTS } from "@/constants";
import { useQueryParams } from "@/hooks";
import { deleteBlog, getAllBlogs } from "@/store";
import { formatDate, toast } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

const Blogs = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const dispatch = useDispatch();
  const { getAllBlogsData, deleteBlogData } = useSelector((s) => s.blogReducer);

  const handleDelete = useCallback(
    (_id) => {
      dispatch(
        deleteBlog({
          payload: { _id },
          onSuccess: () => {
            toast.success("Blog deleted!");
            dispatch(getAllBlogs({ payload: { page, query } }));
          },
        })
      );
    },
    [dispatch, page, query]
  );

  useEffect(() => {
    dispatch(getAllBlogs({ payload: { page, query } }));
  }, [dispatch, page, query]);

  return (
    <div className="grid gap-[2rem] grid-cols-1 pb-[1.7rem]">
      <PageHeading
        to="/blogs/create"
        detail="Offer some useful tips and advice for visitors to the Falcon Club Tourist page"
        heading="Create Blog Post"
      />

      <div className="px-[1.7rem]">
        <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.4rem]">
          <div className="grid gap-[.267rem]">
            <h2 className="text-[#395556] text-[2.5rem] font-bold leading-[140%]">
              Existing Blogs
            </h2>
            <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
              Here are your existing uploaded blogs
            </p>
          </div>

          {getAllBlogsData?.data?.length === 0 &&
            !(deleteBlogData?.loading || getAllBlogsData?.loading) && (
              <NoResultFound />
            )}

          {(deleteBlogData?.loading || getAllBlogsData?.loading) && (
            <Loader type="screen-bg" />
          )}

          {getAllBlogsData?.data?.length !== 0 && (
            <>
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(30rem,_1fr))] gap-x-[3.8rem] gap-y-[3.4rem]">
                {getAllBlogsData?.data?.map((blog, i) => (
                  <BlogItem
                    key={i}
                    img={
                      blog?.cover
                        ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${blog?.cover}`
                        : ""
                    }
                    title={blog?.title || "--"}
                    date={blog?.updatedAt ? formatDate(blog?.updatedAt) : "--"}
                    _id={blog?._id}
                    onDelete={() => handleDelete(blog?._id)}
                  />
                ))}
              </div>

              <div className="pt-[2rem] grid items-center justify-end grid-cols-[auto]">
                <MyPagination
                  page={page}
                  totalPages={getAllBlogsData?.totalPages}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

const BlogItem = ({ img, title = "", _id, date, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="grid gap-[2.6rem] max-w-[60rem]">
        <div className="relative">
          <Image
            className="w-full h-[36.2rem] object-cover rounded-[.8rem]"
            src={img}
            alt={title}
            containerClassName="h-[36.2rem]"
          />

          <div className="z-[5] absolute top-[1.3rem] right-[1.5rem] grid grid-cols-[auto_auto] items-center justify-end gap-[.5rem]">
            <Link
              className="bg-white/50 text-black text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
              to={`/blogs/edit/${_id}`}
            >
              <CiEdit />
            </Link>
            <button
              className="bg-white/50 text-black text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <CiTrash />
            </button>
          </div>
        </div>
        <div className="grid gap-[2.6rem]">
          <div className="grid gap-[.9rem]">
            <h3 className="text-custom-black text-[2.2rem] font-semibold leading-[140%] h-[6.1rem] line-clamp-2">
              {title}
            </h3>
            <p className="text-custom-neutral-04100 text-[1.3rem] leading-[166%]">
              {date}
            </p>
          </div>
          <div>
            <Link
              to={`${CONSTANTS.VITE_USER_SITE_BASE_URL}/blogs/${_id}`}
              className="grid grid-cols-[auto_auto] items-center justify-start w-fit border-b border-b-custom-dark-gren group hover:opacity-70 duration-300 transition-opacity"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-custom-dark-gren text-[1.7rem] font-medium leading-[166%]">
                Continue Reading
              </span>
              <span className="block text-custom-dark-gren text-[1.9rem] group-hover:translate-x-[.75rem] transition-transform duration-300">
                <ChevronLeftOutline />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <DeleteModal
        onClose={() => setIsDeleteModalOpen(false)}
        onOkay={() => {
          setIsDeleteModalOpen(false);
          onDelete && onDelete();
        }}
        open={isDeleteModalOpen}
        deleteItemName="blog"
      />
    </>
  );
};

import { TestImage } from "@/assets/common";
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
import { deleteBrochure, getBrochures } from "@/store/actions/brouchureActions";
import { convertQueryStringToObject } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Brochures = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { brochuresData } = useSelector((s) => s.brochuresReducer);
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const query = convertQueryStringToObject(search);
    return {
      page: query.page || 1,
      pageSize: 9,
    };
  }, [search]);

  useEffect(() => {
    dispatch(
      getBrochures({
        payload: {
          page,
          query,
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, [dispatch, navigate, queryParams]);

  return (
    <div className="grid gap-[2rem] grid-cols-1 pb-[1.7rem]">
      <PageHeading
        to="/downloads/create"
        detail="Offer some useful tips and advice for visitors to the Falcon Club Tourist page"
        heading="Create Downloads"
      />

      <div className="px-[1.7rem]">
        <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.2rem]">
          <div className="grid gap-[.265em]">
            <h2 className="text-custom-dark-gren  text-[2.5rem] font-bold leading-[140%]">
              Existing Brochures
            </h2>
            <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
              Here are your existing uploaded blogs
            </p>
          </div>

          {brochuresData?.loading ? (
            <Loader type="screen-bg" />
          ) : brochuresData?.data?.length>0 ? (
            <>
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(20rem,1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(25.6rem,1fr))]  lg:grid-cols-[repeat(auto-fit,_minmax(25.6rem,30rem))] gap-x-[2rem] gap-y-[4.6rem]">
                {brochuresData.data.map((brochure, i) => (
                  <BrochuresItem
                    alt="image"
                    imgSrc={`${CONSTANTS.VITE_BACKEND_STATIC_URL}/${brochure.cover}`}
                    key={i}
                    onDelete={() => {
                      const queryParams = brochure._id;
                      dispatch(
                        deleteBrochure({
                          payload: {
                            queryParams,
                          },
                          onError: () => navigate("/404", { replace: true }),
                          onSuccess: () => {
                            toast.success("Successfully deleted!");
                            window.open("/downloads", "_self");
                          },
                        })
                      );
                    }}
                    _id={brochure._id}
                  />
                ))}
              </div>

              <div className="grid items-center justify-end grid-cols-[auto]">
                <MyPagination
                  page={Number(page)}
                  totalPages={brochuresData.totalPages}
                />
              </div>
            </>
          ) : (
            <NoResultFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Brochures;

const BrochuresItem = ({ imgSrc, alt, to = "#", _id = "", onDelete }) => {
  const [isDeletModalOpen, setIsDeletModalOpen] = useState(false);
  return (
    <div className="relative grid grid-cols-1 w-full aspect-[256/642]">
      <Link className="w-full aspect-[256/642] opacity" to={`${CONSTANTS.VITE_USER_SITE_BASE_URL}/downloads/${_id}`} target="_blank" rel="noopener noreferrer">
        <Image
          errorMessage="Image not found"
          className="w-full aspect-[256/642] rounded-[.8rem]"
          containerClassName="w-full aspect-[256/642]"
          src={imgSrc}
          alt={alt}
        />
      </Link>

      <div className="absolute top-[1.3rem] right-[1.5rem] grid grid-cols-[auto_auto] items-center justify-end gap-[.5rem]">
        <Link
          className="bg-white/50 text-black text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
          type="button"
          to={`/downloads/edit/${_id}`}
        >
          <CiEdit />
        </Link>
        <button
          className="bg-white/50 text-black text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
          type="button"
          onClick={() => setIsDeletModalOpen(true)}
        >
          <CiTrash />
        </button>
      </div>

      <DeleteModal
        open={isDeletModalOpen}
        onClose={() => setIsDeletModalOpen(false)}
        onOkay={() => {
          setIsDeletModalOpen(false);
          onDelete && onDelete();
        }}
        deleteItemName="download"
      />
    </div>
  );
};

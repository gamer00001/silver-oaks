import { Plus } from "@/assets/Icons";
import { useEffect, useMemo, useState } from "react";
import { Image, Loader, ModalTop, MyInput, MyPagination } from "../common";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import { useQueryParams } from "@/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  convertObjectToQueryString,
  convertQueryStringToObject,
} from "@/utils";
import { FaCircleArrowRight } from "react-icons/fa6";
import { TestImage } from "@/assets/common";
import { CONSTANTS } from "@/constants";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "@/store/actions";

const FeatureTour = ({ value, error, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="grid gap-[.5rem]">
      <span className="body-medium text-custom-dark-gren">Feature Tour</span>

      <div>
        {value === null ? (
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="px-[1.6rem] py-[10rem] border border-dashed border-[#AEAEAE]
          rounded-[.4rem] grid-center w-full text-custom-dark-gren text-[3.2rem]
          bg-[#F1F1F1] opacity"
          >
            <Plus />
          </button>
        ) : (
          <FeatureTourCard
            value={value}
            onChange={onChange}
            onEdit={() => setIsModalOpen(true)}
          />
        )}
      </div>

      {error && <p className="text-red-500 caption">{error}</p>}

      <ModalTop
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="!max-w-[65rem] bg-white"
      >
        <FeatureTourModal
          value={value}
          onChange={(v) => {
            setIsModalOpen(false);
            onChange && onChange(v);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      </ModalTop>
    </div>
  );
};

export default FeatureTour;

const tours = Array(20).fill({
  title: "5 days by air Tour to Sakardu Valley",
  type: "group",
  _id: "2fjl2jf2f2",
  topAttractions: ["One, Two, Three"],
  featureImage: TestImage,
  overview:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab commodi eveniet accusantium consectetur, similique maxime inventore laudantium. Aspernatur cumque doloribus excepturi amet, harum provident ut pariatur necessitatibus tempore in eius qui autem mollitia reprehenderit voluptatem alias natus consectetur quas quo! Iusto numquam minus deserunt perferendis neque praesentium delectus nesciunt optio harum modi dolorum quod autem veniam dignissimos magnam cupiditate nobis sed temporibus perspiciatis fuga, repellat nihil incidunt! Veritatis, repellendus eius. Corrupti ipsa numquam impedit facere, facilis cupiditate. Unde velit quaerat incidunt illo ducimus sed autem quae ut culpa ipsa dolores, vel accusamus facere libero minus explicabo doloribus delectus minima voluptatibus fugiat expedita facilis harum. Laudantium ab sapiente fugiat. Similique, ipsum doloribus veritatis voluptas cupiditate ab nemo laudantium est accusamus vero aperiam ad reiciendis impedit distinctio nostrum cumque. Voluptatum, delectus molestias dolorem neque minus eveniet fugit velit placeat. Quod et corporis fuga expedita nobis consectetur harum culpa praesentium est? Soluta vitae repellendus natus ut quo accusamus cupiditate quibusdam recusandae amet ab eligendi, suscipit impedit dolor reiciendis non expedita pariatur sapiente est quidem, deserunt veritatis, blanditiis dicta officiis aliquid! Quae necessitatibus atque culpa dolor officia dolorem vitae fugit similique amet ipsum, nam commodi placeat ducimus quidem totam blanditiis laborum expedita facere magni maiores. Maxime molestias, minus iusto modi veniam, enim voluptate commodi dolorum odio minima voluptatum obcaecati sunt nobis, consequuntur fugit facilis nesciunt. Temporibus nam dolores deserunt. Numquam atque repellat est ut aperiam in impedit quaerat sunt saepe maxime exercitationem, mollitia hic temporibus excepturi fugiat ducimus neque commodi accusantium voluptatem distinctio asperiores? Veritatis amet aspernatur dolorem nesciunt quis vero voluptate sed recusandae accusamus facilis culpa laborum nemo saepe odio eum sapiente impedit officiis, unde consectetur incidunt consequatur. Veniam repellat enim excepturi ea alias quae eligendi cumque adipisci soluta nihil hic corporis error quos, aspernatur aliquam porro eaque ipsam perspiciatis repellendus iusto! Aperiam!",
});

const FeatureTourModal = ({ value, onChange, onClose, tour }) => {
  const { page } = useQueryParams({ page: 1 });
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { toursData } = useSelector((s) => s.tourReducer);
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const query = convertQueryStringToObject(search);
    return {
      page: query.page || 1,
      pageSize: 9,
    };
  }, [search]);

  useEffect(() => {
    console.log(tour)
    dispatch(
      getTours({
        payload: {
          queryParams,
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, [dispatch, navigate, queryParams]);
  return (
    <div className="grid pb-[3.7rem]">
      <div className="grid grid-cols-1 bg-white sticky h-[14.7rem] z-[1301] top-[0rem]">
        <div className="grid grid-cols-[1fr_auto] items-center px-[2.4rem] py-[1.6rem] bg-custom-black-600/10">
          <h2 className="h5-bold text-custom-dark-gren">Select</h2>
          <button
            className="text-[2.4rem] text-black/50 opacity"
            onClick={onClose}
          >
            <MdClose />
          </button>
        </div>

        <div className="px-[2.4rem] py-[2rem]">
          <SearchInput />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[3rem] px-[2.4rem]">
        {toursData?.loading ? (
          <Loader
            type="button"
            className="!bg-[#FFFFFF]"
            secondaryColor="#F4D06F"
            color="#fdbb05"
          />
        ) : toursData.data ? (
          <>
            <div className="grid grid-cols-1">
              <FeatureTourTable
                onChange={onChange}
                tours={toursData?.data}
                value={value}
              />
            </div>

            <div className="grid items-center justify-end grid-cols-[auto]">
              <MyPagination
                page={Number(page)}
                totalPages={toursData?.totalPages}
              />
            </div>
          </>
        ) : (
          <h1>No Tours added yet</h1>
        )}
      </div>
    </div>
  );
};

const SearchInput = () => {
  const navigate = useNavigate();

  const queryParams = useQueryParams({
    query: "",
  });

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: queryParams,
    onSubmit: (v) => {
      const queryParams = {
        ...v,
        page: 1,
      };

      if (!queryParams.query) delete queryParams.query;

      navigate(
        `/destinations/create?${convertObjectToQueryString(queryParams)}`
      );
    },
  });

  return (
    <form className="grid grid-cols-1" onSubmit={handleSubmit}>
      <MyInput
        type="search-input"
        className="rounded-[.4rem] border border-custom-dark-gren/20"
        placeholder="Search"
        value={values.query}
        onChange={handleChange}
        name="query"
      />
    </form>
  );
};

const FeatureTourTable = ({ tours = [], onChange, value }) => {
  return (
    <table className="grid grid-cols-1">
      <thead className="sticky top-[14.7rem] grid grid-cols-1 bg-white">
        <tr className="grid grid-cols-[3fr_2fr_3.2rem] items-center gap-x-[1rem] px-[.5rem]">
          <th className="line-clamp-1 text-left pb-[1rem] body-medium text-custom-dark-gren">
            Title
          </th>
          <th className="line-clamp-1 text-left pb-[1rem] body-medium text-custom-dark-gren">
            Type
          </th>
          <th className="line-clamp-1 text-left pb-[1rem] body-medium text-custom-dark-gren"></th>
        </tr>
      </thead>
      <tbody>
        {tours.map((t, i) => (
          <tr
            key={i}
            className="grid grid-cols-[3fr_2fr_3.2rem] items-center gap-x-[1rem] p-[.7rem_.5rem] border-b odd:bg-blue-50"
          >
            <td className="line-clamp-1 text-custom-dark-gren text-[1.4rem]">
              {t.title || "--"}
            </td>
            <td className="line-clamp-1 text-custom-dark-gren text-[1.4rem]">
              {t.type || "--"}
            </td>
            <td
              onClick={() => onChange(t)}
              className={`line-clamp-1 ${
                value?._id === t?._id
                  ? "text-green-500"
                  : "text-custom-dark-gren"
              } text-[3rem] opacity cursor-pointer`}
            >
              <FaCircleArrowRight />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FeatureTourCard = ({ value, onChange, onEdit }) => {
  return (
    <div className="relative bg-[#F1F1F1] rounded-[.4rem] grid gap-[3.2rem] xs:grid-cols-2 px-[2.4rem] pt-[2.2rem] pb-[3.1rem]">
      <div className="grid gap-[2.4rem] items-start">
        <div className="grid gap-[.8rem] items-start">
          <h4 className="h5-bold !font-semibold text-custom-dark-gren">
            Tour Title:
          </h4>
          <p className="text-[1.6rem] font-medium leading-[120%] text-[#21212199]">
            {value?.title || "--"}
          </p>
        </div>

        <div className="grid gap-[3.2rem] items-start">
          <div className="grid gap-[.8rem] items-start">
            <h4 className="h5-bold !font-semibold text-custom-dark-gren">
              Overview:
            </h4>
            <p className="text-[1.6rem] leading-[129%] font-medium text-[#21212199] line-clamp-5 h-[10.5rem]">
              {value?.overview || "--"}
            </p>
          </div>

          <div className="grid gap-[1.9rem] items-start">
            <div className="grid gap-[.8rem] items-start">
              <h4 className="h5-bold !font-semibold text-custom-dark-gren">
                Top Attractions:
              </h4>
              <p className="text-[1.6rem] leading-[129%] font-medium text-[#21212199] line-clamp-3 h-[6.5rem]">
                {value?.topAttractions && value?.topAttractions?.length !== 0
                  ? value?.topAttractions?.join(", ")
                  : "--"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row-start-1 xs:row-start-auto h-full">
        <Image
          className="w-full h-[25rem] xs:h-full object-cover rounded-[.8rem]"
          src={`${CONSTANTS.VITE_BACKEND_STATIC_URL}/${value?.featureImage}`}
          alt={value?.title || "--"}
        />
      </div>

      <div className="z-[10] absolute top-[1.3rem] right-[1.5rem] grid grid-cols-[auto_auto] items-center justify-end gap-[.5rem]">
        <button
          className="bg-black/70 text-white text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
          type="button"
          onClick={onEdit}
        >
          <CiEdit />
        </button>
        <button
          className="bg-black/70 text-white text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
          type="button"
          onClick={() => onChange(null)}
        >
          <CiTrash />
        </button>
      </div>
    </div>
  );
};

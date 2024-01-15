import {
  Loader,
  MyPagination,
  NoResultFound,
  PageHeading,
  TableMenu,
  Td,
  Th,
  Tr,
} from "@/components/common";
import { CONSTANTS } from "@/constants";
import { useQueryParams } from "@/hooks";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { deleteTour, getTours } from "@/store/actions/tourActions";
import { convertQueryStringToObject } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";

const Tours = () => {
  const { page, query } = useQueryParams({ page: 1 });
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
    dispatch(
      getTours({
        payload: {
          page, query
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, [dispatch, navigate, queryParams]);

  return (
    <div className="grid gap-[2rem] grid-cols-1 pb-[1.7rem]">
      <PageHeading
        to="/tours/create"
        detail="Offer some useful tips and advice for visitors to the Falcon Club Tourist page"
        heading="Create New Tour"
      />

      <div className="px-[1.7rem]">
        <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.4rem]">
          <div className="grid gap-[.267rem]">
            <h2 className="text-[#395556] text-[2.5rem] font-bold leading-[140%]">
              Existing Tours
            </h2>
            <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
              Here are your existing tours
            </p>
          </div>
          {toursData?.loading ? (
            <Loader type="screen-bg" />
          ) : toursData?.data?.length>0 ? (
            <>
              <div className="grid grid-cols-1 w-full">
                <ToursTable toursData={toursData} />
              </div>

              <div className="pt-[2rem] grid items-center justify-end grid-cols-[auto]">
                <MyPagination page={page} totalPages={toursData.totalPages} />
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

export default Tours;

const ToursTable = ({ toursData }) => {
  return (
    <table className="grid grid-cols-1 w-full overflow-auto scrollbar">
      <thead className="grid grid-cols-1 w-full">
        <Tr className="grid-cols-[minmax(25rem,1fr)_repeat(6,17rem)_1.9rem]">
          <Th textLeftAlign>Title</Th>
          <Th>Number Of Days Trip</Th>
          <Th>No. of Destinations</Th>
          <Th>No. of Itinerary</Th>
          <Th>No. of Includes</Th>
          <Th>No. of Excludes</Th>
          <Th>Type</Th>
          <Th></Th>
        </Tr>
      </thead>
      <tbody className="grid grid-cols-1 w-full">
        {toursData.data?.map((tour, i) => (
          <ToursTableRow
            title={tour?.title}
            type={tour?.type}
            _id={tour?._id}
            key={i}
            numberOfDaysTrip={tour?.numberOfDaysTrip}
            numberOfDestinations={tour?.destinations.length}
            numberOfExcludes={tour?.excludes.length}
            numberOfIncludes={tour?.includes.length}
            numberOfIninerary={tour?.dayToDayItinerary.length}
          />
        ))}
      </tbody>
    </table>
  );
};

const ToursTableRow = ({
  title,
  type = "tailor",
  _id,
  numberOfDaysTrip,
  numberOfDestinations,
  numberOfIninerary,
  numberOfIncludes,
  numberOfExcludes,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Tr className="pt-[1.9rem] grid-cols-[minmax(25rem,1fr)_repeat(6,17rem)_1.9rem]">
      <Td textLeftAlign>{title || "--"}</Td>
      <Td>{numberOfDaysTrip || "--"}</Td>
      <Td>{numberOfDestinations || "--"}</Td>
      <Td>{numberOfIninerary || "--"}</Td>
      <Td>{numberOfIncludes || "--"}</Td>
      <Td>{numberOfExcludes || "--"}</Td>
      <Td className="capitalize">{type}</Td>
      <td>
        <TableMenu
          onView={() =>
            window.open(
              `${CONSTANTS.VITE_USER_SITE_BASE_URL}/tour-details/${type}${
                type === "tailor" ? "-made" : ""
              }-tour/${_id}`,
              "_blank"
            )
          }
          onEdit={() => navigate(`/tours/edit/${type}/${_id}`)}
          onDelete={() => {
            const queryParams = {id: _id, type: type};
            dispatch(
              deleteTour({
                payload: {
                  queryParams,
                },
                onError: () => navigate("/404", { replace: true }),
                onSuccess: () => 
                {
                toast.success("Successfully deleted!");
                window.open("/tours","_self")
                }
              })
            );
            }
          }
          onDuplicate = {()=>{
            navigate(`/tours/duplicate/${type}/${_id}`)
          }}
        />
      </td>
    </Tr>
  );
};

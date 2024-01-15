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
import { deleteDestinations, getDestinations } from "@/store/actions/destinationsActions";
import { convertQueryStringToObject } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";

const Destinations = () => {
  const { page, query } = useQueryParams({ page: 1 });
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { destinationsData } = useSelector((s) => s.destinationsReducer);
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
      getDestinations({
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
        to="/destinations/create"
        detail="Offer some useful tips and advice for visitors to the Falcon Club Tourist page"
        heading="Create New Destination"
      />

      <div className="px-[1.7rem]">
        <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.4rem]">
          <div className="grid gap-[.267rem]">
            <h2 className="text-[#395556] text-[2.5rem] font-bold leading-[140%]">
              Destinations
            </h2>
            <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
              Here are your existing destinations
            </p>
          </div>
          {destinationsData?.loading ? (
            <Loader type="screen-bg" />
          ) : (
            destinationsData?.data?.length>0?
            <>
          <div className="grid grid-cols-1 w-full">
            <Table destinationsData={destinationsData} />
          </div>

          <div className="pt-[2rem] grid items-center justify-end grid-cols-[auto]">
            <MyPagination page={page} totalPages={destinationsData.totalPages} />
          </div>
          </>
            :
            <NoResultFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;

const Table = ({destinationsData}) => {
  return (
    <table className="grid grid-cols-1 w-full overflow-auto scrollbar">
      <thead className="grid grid-cols-1 w-full">
        <Tr className="grid-cols-[20rem_minmax(25rem,1fr)_20rem_minmax(25rem,3fr)_1.9rem]">
          <Th textLeftAlign>Destination Name</Th>
          <Th textLeftAlign>Feaure Tour Name</Th>
          <Th>No. of attached Tours</Th>
          <Th textLeftAlign>Feature Image</Th>
          <Th></Th>
        </Tr>
      </thead>
      <tbody className="grid grid-cols-1 w-full">
      {destinationsData.data?.map((destination, i) => (
            <TableRow
              name={destination.title}
              featureTourName={destination.featuredTourName}
              _id={destination._id}
              key={i}
              featureImage={destination.img}
              numberOfAttachedTours={destination.attachedTours}
            />
          ))}
      </tbody>
    </table>
  );
};

const TableRow = ({
  name,
  _id,
  featureTourName,
  numberOfAttachedTours,
  featureImage,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Tr className="pt-[1.9rem] grid-cols-[20rem_minmax(25rem,1fr)_20rem_minmax(25rem,3fr)_1.9rem]">
      <Td textLeftAlign>{name || "--"}</Td>
      <Td textLeftAlign>{featureTourName || "--"}</Td>
      <Td>{numberOfAttachedTours || "--"}</Td>
      <Td textLeftAlign>{featureImage || "--"}</Td>
      <td>
        <TableMenu
          onView={() =>
            window.open(
              `${CONSTANTS.VITE_USER_SITE_BASE_URL}/destinations/${_id}`,
              "_blank"
            )
          }
          onEdit={() => navigate(`/destinations/edit/${_id}`)}
          onDelete={() => {
            const queryParams = _id;
            console.log(queryParams)
            dispatch(
              deleteDestinations({
                payload: {
                  queryParams,
                },
                onError: () => navigate("/404", { replace: true }),
                onSuccess: () => 
                {
                toast.success("Successfully deleted!");
                window.open("/destinations","_self")
                }
              })
            );
            }
          }
        />
      </td>
    </Tr>
  );
};

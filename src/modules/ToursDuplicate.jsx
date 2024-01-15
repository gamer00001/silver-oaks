import { PDFImage } from "@/assets/common";
import {
  DayToDayIniteray,
  Destinations,
  SeasonCheckBoxes,
  TourTypeRadio,
} from "@/components/ToursCreate";
import { Loader, MyInput } from "@/components/common";
import { useFormik } from "formik";
import { tourCreateSchema } from "@/schema";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTours, editTour, getTour } from "@/store/actions";
import { useEffect } from "react";
import { CONSTANTS } from "@/constants";
import { fileUpload, imageUpload } from "@/store";
import toast from "react-hot-toast";

const ToursEdit = () => {
  const { type, tourId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tourData } = useSelector((s) => s.tourReducer);
  const queryParams = {};

  queryParams.id = tourId;
  queryParams.type = type;

  useEffect(() => {
    dispatch(
      getTour({
        payload: {
          queryParams,
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, [dispatch, navigate, queryParams.id]);

  const {
    values,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    dirty,
    touched,
  } = useFormik({
    initialValues: {
      type: type,
      title: tourData?.data?.title || "",
      numberOfDaysTrip: tourData?.data?.numberOfDaysTrip || 5,
      overview: tourData?.data?.overview || "",
      seasons: tourData?.data?.seasons || [],
      includes: tourData?.data?.includes || [],
      excludes: tourData?.data?.excludes || [],
      topAttractions: tourData?.data?.topAttractions || [],

      destinations: tourData?.data?.destinations || [],
      dayToDayItinerary: tourData?.data?.dayToDayItinerary || [],

      itineraryFile: tourData?.data?.itineraryFile || null,
      featureImage: tourData?.data?.featureImage || null,
      mapImage: tourData?.data?.mapImage || null,

      standardPackagePriceInPKR: tourData?.data?.standardPackagePriceInPKR ||"",
      deluxePackagePriceInPKR: tourData?.data?.deluxePackagePriceInPKR || "",
      executivePackagePriceInPKR: tourData?.data?.executivePackagePriceInPKR || "",
      standardPackagePriceInUSD: tourData?.data?.standardPackagePriceInUSD || "",
      deluxePackagePriceInUSD: tourData?.data?.deluxePackagePriceInUSD || "",
      executivePackagePriceInUSD: tourData?.data?.executivePackagePriceInUSD || "",

      minimumNumberOfAdults: tourData?.data?.minimumNumberOfAdults || "",
      numberOfRooms: tourData?.data?.numberOfRooms || "",

      priceOfAdultInPKR: tourData?.data?.priceOfAdultInPKR || "",
      priceOfAdultInUSD: tourData?.data?.priceOfAdultInUSD || "",
      priceOfKidInPKR: tourData?.data?.priceOfKidInPKR || "",
      priceOfKidInUSD: tourData?.data?.priceOfKidInUSD || "",
      pickupFromLahorePriceInPKR: tourData?.data?.pickupFromLahorePriceInPKR || "",
      pickupFromLahorePriceInUSD: tourData?.data?.pickupFromLahorePriceInUSD || "",
      privateRoomPriceInPKR: tourData?.data?.priceOfAdultInPKR || "",
      privateRoomPriceInUSD: tourData?.data?.privateRoomPriceInUSD || "",
    },
    validationSchema: tourCreateSchema,
    onSubmit: (v) => {
      const c = { ...v };
      if (c.type === "tailor" || c.type === "couple") {
        delete c.priceOfAdultInPKR;
        delete c.priceOfAdultInUSD;
        delete c.priceOfKidInPKR;
        delete c.priceOfKidInUSD;
        delete c.pickupFromLahorePriceInPKR;
        delete c.pickupFromLahorePriceInUSD;
        delete c.privateRoomPriceInPKR;
        delete c.privateRoomPriceInUSD;
      }

      if (c.type === "couple") {
        delete c.minimumNumberOfAdults;
        delete c.numberOfRooms;
      }

      if (c.type === "group") {
        delete c.standardPackagePriceInPKR;
        delete c.deluxePackagePriceInPKR;
        delete c.executivePackagePriceInPKR;
        delete c.standardPackagePriceInUSD;
        delete c.deluxePackagePriceInUSD;
        delete c.executivePackagePriceInUSD;
        delete c.minimumNumberOfAdults;
        delete c.numberOfRooms;
      }

      console.log(c);

      const update = (data) =>{
        data.id = tourId;
        dispatch(
          addTours({
            payload: { data: data },
            onSuccess: () => {
              navigate("/tours");
              toast.success("Successfully duplicated!");
            },
          })
        );
      }
      if (typeof c.mapImage === "string" && typeof c.featureImage === "string" && typeof c.itineraryFile === "string") {
        update(c);
      } 
      else if(typeof c.mapImage !== "string" && typeof c.featureImage === "string" && typeof c.itineraryFile === "string"){
        dispatch(
          imageUpload({
            payload: { files: [c.mapImage] },
            onSuccess: ({ files: [mapImage] }) => {
              c.mapImage = mapImage;
              update(c);
            },
          })
        );
      }
      else if(typeof c.mapImage === "string" && typeof c.featureImage !== "string" && typeof c.itineraryFile === "string"){
        dispatch(
          imageUpload({
            payload: { files: [c.featureImage] },
            onSuccess: ({ files: [featureImage] }) => {
              c.featureImage = featureImage;
              update(c);
            },
          })
        );
      }
      else if(typeof c.mapImage === "string" && typeof c.featureImage === "string" && typeof c.itineraryFile !== "string"){
        dispatch(
          fileUpload({
            payload: { files: [c.itineraryFile] },
            onSuccess: ({ files: [itineraryFile] }) => {
              c.itineraryFile = itineraryFile;
              update(c);
            },
          })
        );
      }
      else if(typeof c.mapImage !== "string" && typeof c.featureImage === "string" && typeof c.itineraryFile !== "string"){
        dispatch(
          imageUpload({
            payload: { images: [c.mapImage] },
            onSuccess: ({ files: [mapImage] }) => {
              dispatch(
                fileUpload({
                  payload: { files: [c.itineraryFile] },
                  onSuccess: ({ files: [itineraryFile] }) => {
                    c.mapImage = mapImage;
                    c.itineraryFile = itineraryFile;
                    update(c);
                  },
                })
              );
            },
          })
        );
      }
      else if(typeof c.mapImage === "string" && typeof c.featureImage !== "string" && typeof c.itineraryFile !== "string"){
        dispatch(
          imageUpload({
            payload: { images: [c.featureImage] },
            onSuccess: ({ files: [featureImage] }) => {
              dispatch(
                fileUpload({
                  payload: { files: [c.itineraryFile] },
                  onSuccess: ({ files: [itineraryFile] }) => {
                    c.featureImage = featureImage;
                    c.itineraryFile = itineraryFile;
                    update(c);
                  },
                })
              );
            },
          })
        );
      }
      else if(typeof c.mapImage !== "string" && typeof c.featureImage !== "string" && typeof c.itineraryFile === "string"){
        dispatch(
          imageUpload({
            payload: { images: [c.featureImage] },
            onSuccess: ({ files: [featureImage] }) => {
              dispatch(
                imageUpload({
                  payload: { files: [c.mapImage] },
                  onSuccess: ({ files: [mapImage] }) => {
                    c.featureImage = featureImage;
                    c.mapImage = mapImage;
                    update(c);
                  },
                })
              );
            },
          })
        );
      }
      else if(typeof c.mapImage !== "string" && typeof c.featureImage !== "string" && typeof c.itineraryFile !== "string"){
        dispatch(
          imageUpload({
            payload: { images: [c.featureImage, c.mapImage] },
            onSuccess: ({ files: [featureImage, mapImage] }) => {
              dispatch(
                fileUpload({
                  payload: { files: [c.itineraryFile] },
                  onSuccess: ({ files: [itineraryFile] }) => {
                    c.featureImage = featureImage;
                    c.mapImage = mapImage;
                    c.itineraryFile = itineraryFile;
                    update(c)
                  },
                })
              );
            },
          })
        );
      }
    },
  });

  useEffect(() => {
    setFieldValue("title", tourData?.data?.title || "");
    setFieldValue("numberOfDaysTrip", tourData?.data?.numberOfDaysTrip || 5);
    setFieldValue("overview", tourData?.data?.overview || "");
    setFieldValue("seasons", tourData?.data?.seasons || []);
    setFieldValue("includes", tourData?.data?.includes || []);
    setFieldValue("excludes", tourData?.data?.excludes || []);
    setFieldValue("topAttractions", tourData?.data?.topAttractions || []);
    setFieldValue("destinations", tourData?.data?.destinations || []);
    setFieldValue("dayToDayItinerary", tourData?.data?.dayToDayItinerary || []);
    setFieldValue("itineraryFile", tourData?.data?.itineraryFile || null);
    setFieldValue("featureImage", tourData?.data?.featureImage || null);
    setFieldValue("mapImage", tourData?.data?.mapImage || null);
    setFieldValue("standardPackagePriceInPKR", tourData?.data?.standardPackagePriceInPKR || "");
    setFieldValue("deluxePackagePriceInPKR", tourData?.data?.deluxePackagePriceInPKR || "");
    setFieldValue("executivePackagePriceInPKR", tourData?.data?.executivePackagePriceInPKR || "");
    setFieldValue("standardPackagePriceInUSD", tourData?.data?.standardPackagePriceInUSD || "");
    setFieldValue("deluxePackagePriceInUSD", tourData?.data?.deluxePackagePriceInUSD || "");
    setFieldValue("executivePackagePriceInUSD", tourData?.data?.executivePackagePriceInUSD || "");
    setFieldValue("minimumNumberOfAdults", tourData?.data?.minimumNumberOfAdults || "");
    setFieldValue("numberOfRooms", tourData?.data?.numberOfRooms || "");
    setFieldValue("priceOfAdultInPKR", tourData?.data?.priceOfAdultInPKR || "");
    setFieldValue("priceOfAdultInUSD", tourData?.data?.priceOfAdultInUSD || "");
    setFieldValue("priceOfKidInPKR", tourData?.data?.priceOfKidInPKR || "");
    setFieldValue("priceOfKidInUSD", tourData?.data?.priceOfKidInUSD || "");
    setFieldValue("pickupFromLahorePriceInPKR", tourData?.data?.pickupFromLahorePriceInPKR || "");
    setFieldValue("pickupFromLahorePriceInUSD", tourData?.data?.pickupFromLahorePriceInUSD || "");
    setFieldValue("privateRoomPriceInPKR", tourData?.data?.priceOfAdultInPKR || "");
    setFieldValue("privateRoomPriceInUSD", tourData?.data?.privateRoomPriceInUSD || "");
  }, [tourData]);

  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.3rem] content-start max-w-[1240px]">
          <h1 className="text-[2.5rem] font-semibold leading-[160%]">
            Edit Tour
          </h1>
          {tourData?.loading ? (
            <Loader type="screen-bg" />
          ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-12 gap-x-[2.6rem] gap-y-[5.6rem] items-start"
          >
            <div className="col-span-12">
              <TourTypeRadio
                value={values.type}
                onChange={(v) => setFieldValue("type", v)}
              />
            </div>
            <MyInput
              type="text"
              label="Title"
              placeholder="Title for tour"
              className="col-span-12 sm:col-span-6"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              error={touched.title && errors.title}
            />
            <MyInput
              type="number-only"
              label="Number Of Days Trip"
              placeholder="Number Of Days Trip"
              className="col-span-12 sm:col-span-6"
              value={values.numberOfDaysTrip}
              onChange={handleChange}
              onBlur={handleBlur}
              name="numberOfDaysTrip"
              error={touched.numberOfDaysTrip && errors.numberOfDaysTrip}
            />
            <MyInput
              type="textarea"
              label="Overview"
              placeholder="Overview"
              className="col-span-12"
              value={values.overview}
              onChange={handleChange}
              onBlur={handleBlur}
              name="overview"
              error={touched.overview && errors.overview}
            />

            <div className="col-span-12 grid grid-cols-1">
              <Destinations
                error={touched.destinations && errors.destinations}
                value={values.destinations}
                onChange={(v) => setFieldValue("destinations", v)}
              />
            </div>

            <div className="col-span-12">
              <DayToDayIniteray
                error={touched.dayToDayItinerary && errors.dayToDayItinerary}
                value={values.dayToDayItinerary}
                onChange={(v) => setFieldValue("dayToDayItinerary", v)}
              />
            </div>

            <MyInput
              type="tag"
              label="Includes"
              placeholder="Press enter to add new"
              className="col-span-12 sm:col-span-6"
              value={values.includes}
              onChange={(v) => setFieldValue("includes", v)}
              onBlur={handleBlur}
              name="includes"
              error={touched.includes && errors.includes}
            />
            <MyInput
              type="tag"
              label="Excludes"
              placeholder="Press enter to add new"
              className="col-span-12 sm:col-span-6"
              value={values.excludes}
              onChange={(v) => setFieldValue("excludes", v)}
              onBlur={handleBlur}
              name="excludes"
              error={touched.excludes && errors.excludes}
            />
            <div className="col-span-12">
              <SeasonCheckBoxes
                value={values.seasons}
                onChange={(v) => setFieldValue("seasons", v)}
                error={touched.seasons && errors.seasons}
              />
            </div>
            <MyInput
              type="tag"
              label="Top Attractions"
              placeholder="Press enter to add new"
              className="col-span-12"
              value={values.topAttractions}
              onChange={(v) => setFieldValue("topAttractions", v)}
              onBlur={handleBlur}
              name="topAttractions"
              error={touched.topAttractions && errors.topAttractions}
            />
            <Link to={typeof values.mapImage === "string" && `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.mapImage}`} className="col-span-12">
            <MyInput
              label="Map Image"
              type="file"
              value={typeof values.mapImage === "string"
              ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.mapImage}`
              : values.mapImage}
              onChange={(v) => setFieldValue("mapImage", v)}
              error={touched.mapImage && errors.mapImage}
              id="mapImage"
              accept=".png, .jpeg, .jpg"
            />
            </Link>
            <Link to={typeof values.featureImage === "string" && `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.featureImage}`} className="col-span-12">
            <MyInput
              label="Feature Image"
              type="file"
              value={typeof values.featureImage === "string"
              ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.featureImage}`
              : values.featureImage}
              onChange={(v) => setFieldValue("featureImage", v)}
              error={touched.featureImage && errors.featureImage}
              id="featureImage"
              accept=".png, .jpeg, .jpg"
            />
            </Link>
            <Link to={typeof values.itineraryFile === "string" && `${CONSTANTS.VITE_BACKEND_STATIC_URL_FOR_FILE}/${values.itineraryFile}`} className="col-span-12">
            <MyInput
              label="Itinerary File"
              type="file"
              value={typeof values.itineraryFile === "string"
              ? `${CONSTANTS.VITE_BACKEND_STATIC_URL_FOR_FILE}/${values.itineraryFile}` && PDFImage
              : values.itineraryFile && PDFImage}
              onChange={(v) => setFieldValue("itineraryFile", v)}
              error={touched.itineraryFile && errors.itineraryFile}
              id="itineraryFile"
              accept=".pdf"
              selectButtonText="Select PDF"
            />
            </Link>

            {(values.type === "couple" || values.type === "tailor") && (
              <>
                <MyInput
                  type="number-only"
                  label="Standard Package Price In PKR"
                  placeholder="Enter standard package price in PKR"
                  className="col-span-12 sm:col-span-6"
                  value={values.standardPackagePriceInPKR}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="standardPackagePriceInPKR"
                  error={
                    touched.standardPackagePriceInPKR &&
                    errors.standardPackagePriceInPKR
                  }
                />
                <MyInput
                  type="number-only"
                  label="Standard Package Price In USD"
                  placeholder="Enter standard package price in USD"
                  className="col-span-12 sm:col-span-6"
                  value={values.standardPackagePriceInUSD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="standardPackagePriceInUSD"
                  error={
                    touched.standardPackagePriceInUSD &&
                    errors.standardPackagePriceInUSD
                  }
                />
                <MyInput
                  type="number-only"
                  label="Deluxe Package Price In PKR"
                  placeholder="Enter deluxe package price in PKR"
                  className="col-span-12 sm:col-span-6"
                  value={values.deluxePackagePriceInPKR}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="deluxePackagePriceInPKR"
                  error={
                    touched.deluxePackagePriceInPKR &&
                    errors.deluxePackagePriceInPKR
                  }
                />
                <MyInput
                  type="number-only"
                  label="Deluxe Package Price In USD"
                  placeholder="Enter deluxe package price in USD"
                  className="col-span-12 sm:col-span-6"
                  value={values.deluxePackagePriceInUSD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="deluxePackagePriceInUSD"
                  error={
                    touched.deluxePackagePriceInUSD &&
                    errors.deluxePackagePriceInUSD
                  }
                />
                <MyInput
                  type="number-only"
                  label="Executive Package Price In PKR"
                  placeholder="Enter executive package price in PKR"
                  className="col-span-12 sm:col-span-6"
                  value={values.executivePackagePriceInPKR}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="executivePackagePriceInPKR"
                  error={
                    touched.executivePackagePriceInPKR &&
                    errors.executivePackagePriceInPKR
                  }
                />
                <MyInput
                  type="number-only"
                  label="Executive Package Price In USD"
                  placeholder="Enter executive package price in USD"
                  className="col-span-12 sm:col-span-6"
                  value={values.executivePackagePriceInUSD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="executivePackagePriceInUSD"
                  error={
                    touched.executivePackagePriceInUSD &&
                    errors.executivePackagePriceInUSD
                  }
                />
              </>
            )}

            {values.type === "tailor" && (
              <>
                <MyInput
                  type="number-only"
                  label="Minimum Number Of Adults"
                  placeholder="Enter minimum number of adults"
                  className="col-span-12 sm:col-span-6"
                  value={values.minimumNumberOfAdults}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="minimumNumberOfAdults"
                  error={
                    touched.minimumNumberOfAdults &&
                    errors.minimumNumberOfAdults
                  }
                />
                <MyInput
                  type="number-only"
                  label="Number Of Rooms"
                  placeholder="Enter number of rooms"
                  className="col-span-12 sm:col-span-6"
                  value={values.numberOfRooms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="numberOfRooms"
                  error={touched.numberOfRooms && errors.numberOfRooms}
                />
              </>
            )}

            {values.type === "group" && (
              <>
                <MyInput
                  type="number-only"
                  label="Price Of Adult In PKR"
                  placeholder="Enter price of adult in PKR"
                  className="col-span-12 sm:col-span-6"
                  value={values.priceOfAdultInPKR}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="priceOfAdultInPKR"
                  error={touched.priceOfAdultInPKR && errors.priceOfAdultInPKR}
                />
                <MyInput
                  type="number-only"
                  label="Price Of Adult In USD"
                  placeholder="Enter price of adult in USD"
                  className="col-span-12 sm:col-span-6"
                  value={values.priceOfAdultInUSD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="priceOfAdultInUSD"
                  error={touched.priceOfAdultInUSD && errors.priceOfAdultInUSD}
                />
                <MyInput
                  type="number-only"
                  label="Price Of Kid In PKR"
                  placeholder="Enter pricof kid in PKR"
                  className="col-span-12 sm:col-span-6"
                  value={values.priceOfKidInPKR}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="priceOfKidInPKR"
                  error={touched.priceOfKidInPKR && errors.priceOfKidInPKR}
                />
                <MyInput
                  type="number-only"
                  label="Price Of Kid In USD"
                  placeholder="Enter price of kid in USD"
                  className="col-span-12 sm:col-span-6"
                  value={values.priceOfKidInUSD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="priceOfKidInUSD"
                  error={touched.priceOfKidInUSD && errors.priceOfKidInUSD}
                />
                <MyInput
                  type="number-only"
                  label="Pickup From Lahore Price In PKR"
                  placeholder="Enter pickup from lahore price in PKR"
                  className="col-span-12 sm:col-span-6"
                  value={values.pickupFromLahorePriceInPKR}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="pickupFromLahorePriceInPKR"
                  error={
                    touched.pickupFromLahorePriceInPKR &&
                    errors.pickupFromLahorePriceInPKR
                  }
                />
                <MyInput
                  type="number-only"
                  label="Pickup From Lahore Price In USD"
                  placeholder="Enter pickup from lahore price in USD"
                  className="col-span-12 sm:col-span-6"
                  value={values.pickupFromLahorePriceInUSD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="pickupFromLahorePriceInUSD"
                  error={
                    touched.pickupFromLahorePriceInUSD &&
                    errors.pickupFromLahorePriceInUSD
                  }
                />
                <MyInput
                  type="number-only"
                  label="Private Room Price In PKR"
                  placeholder="Enter private room price in PKR"
                  className="col-span-12 sm:col-span-6"
                  value={values.privateRoomPriceInPKR}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="privateRoomPriceInPKR"
                  error={
                    touched.privateRoomPriceInPKR &&
                    errors.privateRoomPriceInPKR
                  }
                />
                <MyInput
                  type="number-only"
                  label="Private Room Price In USD"
                  placeholder="Enter private room price in USD"
                  className="col-span-12 sm:col-span-6"
                  value={values.privateRoomPriceInUSD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="privateRoomPriceInUSD"
                  error={
                    touched.privateRoomPriceInUSD &&
                    errors.privateRoomPriceInUSD
                  }
                />
              </>
            )}

            <div className="col-span-12 grid-center">
              <button
                className="px-[6.3rem] py-[1.3rem] bg-custom-button-color rounded-[.8rem] button text-custom-dark-gren opacity-button disabled:opacity-50"
                disabled={!dirty}
                type="submit"
              >
                Duplicate
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToursEdit;

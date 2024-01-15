import { extractTextFromHTML } from "@/utils";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const SearchSchema = Yup.object().shape({
  query: Yup.string().required(""),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email must a valid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password atleast consists of 6 characters")
    .required("Password is required"),
});

export const ForgetSchema = Yup.object().shape({
  email: Yup.string().email("Email must a valid").required("Email is required"),
});

export const ResetPassSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/\d/, "Password must include at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must include at least one special symbol (!@#$%^&*(),.?":{}|<>)'
    )
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const changePassSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .matches(/[a-z]/, "New Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "New Password must include at least one uppercase letter")
    .matches(/\d/, "New Password must include at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'New Password must include at least one special symbol (!@#$%^&*(),.?":{}|<>)'
    )
    .min(8, "New Password must be at least 8 characters")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const editProfileSchema = Yup.object().shape({
  email: Yup.string().email("Email must a valid").required("Email is required"),
  username: Yup.string().required("User name is required"),
  name: Yup.string().required("Name is required"),
  about: Yup.string().required("About is required"),
  image: Yup.mixed().required("Image is required"),
  phone: Yup.string()
    .test("custom", "Enter a valid number", (value) =>
      isValidPhoneNumber(value)
    )
    .required("Phone is required"),
});

export const dayToDayIniteraySchema = Yup.object().shape({
  img: Yup.mixed().required("Image is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  hotelName: Yup.string().required("Hotel name is required"),
  meal: Yup.array()
    .min(1, "At least one meal is selected")
    .of(Yup.string().oneOf(["Lunch", "Dinner", "Breakfast", "Super"]))
    .required("Meal is required"),
});

export const AddEventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  date: Yup.mixed().required("Date is required"),
  type: Yup.string().required("Event type is required"),
  description: Yup.string().required("Description is required"),
});

export const MarkAssignment = Yup.object().shape({
  name: Yup.string().required("Student Name is required"),
  marks: Yup.string().required("Marks are required"),
  feedBack: Yup.string().required("feedback is required"),
});

export const tourCreateSchema = Yup.object().shape({
  type: Yup.string()
    .required("Type is required")
    .oneOf(["group", "couple", "tailor"]),
  title: Yup.string().required("Title is required"),
  overview: Yup.string().required("Overview is required"),
  numberOfDaysTrip: Yup.number()
    .min(1, "Trip Days must be greater than 1")
    .required(),
  destinations: Yup.array()
    .min(1, "Destinations must have at least 1 items")
    .of(Yup.string())
    .required("Destinations is required"),
  dayToDayItinerary: Yup.array()
    .min(1, "Day to day itinerary must have at least 1 items")
    .of(
      Yup.object({
        img: Yup.string().required("Image is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        hotelName: Yup.string().required("Hotel name is required"),
        meal: Yup.array()
          .min(1, "Meal must have at least 1 items")
          .of(
            Yup.string()
              .oneOf(
                ["Lunch", "Dinner", "Breakfast", "Super"],
                "Each meal item must be from (Lunch, Dinner, Breakfast, Super)"
              )
              .required("Meal item is required")
          )
          .test("unique", "Only unique values allowed.", (value) =>
            value ? value.length === new Set(value)?.size : true
          )
          .required("Meal is required"),
      })
    )
    .required("Day to day itinerary  is required"),
  includes: Yup.array()
    .min(1, "Includes must have at least 1 items")
    .of(Yup.string().required())
    .required("Includes is required"),
  excludes: Yup.array()
    .min(1, "Excludes must have at least 1 items")
    .of(Yup.string().required())
    .required("Excludes is required"),
  seasons: Yup.array()
    .min(1, "Seasons must have at least 1 items")
    .test("unique", "Only unique values allowed.", (value) =>
      value ? value.length === new Set(value)?.size : true
    )
    .of(Yup.string().required())
    .required("Season is required"),
  mapImage: Yup.mixed().required("Map Image is required"),
  featureImage: Yup.mixed().required("Feature Image is required"),
  itineraryFile: Yup.string(),
  topAttractions: Yup.array()
    .min(1, "Top Attractions must have at least 1 items")
    .of(Yup.string().required())
    .required("Top Attractions are required"),
  standardPackagePriceInPKR: Yup.number().when("type", {
    is: "group",
    then: () => Yup.number().notRequired(),
    otherwise: () =>
      Yup.number()
        .typeError("Standard Package Price in PKR must be a number")
        .required("Standard Package Price in PKR is required"),
  }),
  deluxePackagePriceInPKR: Yup.number().when("type", {
    is: "group",
    then: () => Yup.number().notRequired(),
    otherwise: () =>
      Yup.number()
        .typeError("Deluxe Package Price in PKR must be a number")
        .required("Deluxe Package Price in PKR is required"),
  }),
  executivePackagePriceInPKR: Yup.number().when("type", {
    is: "group",
    then: () => Yup.number().notRequired(),
    otherwise: () =>
      Yup.number()
        .typeError("Executive Package Price in PKR must be a number")
        .required("Executive Package Price in PKR is required"),
  }),
  standardPackagePriceInUSD: Yup.number().when("type", {
    is: "group",
    then: () => Yup.number().notRequired(),
    otherwise: () =>
      Yup.number()
        .typeError("Standard Package Price in USD must be a number")
        .required("Standard Package Price in USD is required"),
  }),
  deluxePackagePriceInUSD: Yup.number().when("type", {
    is: "group",
    then: () => Yup.number().notRequired(),
    otherwise: () =>
      Yup.number()
        .typeError("Deluxe Package Price in USD must be a number")
        .required("Deluxe Package Price in USD is required"),
  }),
  executivePackagePriceInUSD: Yup.number().when("type", {
    is: "group",
    then: () => Yup.number().notRequired(),
    otherwise: () =>
      Yup.number()
        .typeError("Executive Package Price in USD must be a number")
        .required("Executive Package Price in USD is required"),
  }),
  minimumNumberOfAdults: Yup.number().when("type", {
    is: "tailor",
    then: () =>
      Yup.number()
        .typeError("Minimum number of adults must be a number")
        .required("Minimum number of adults is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  numberOfRooms: Yup.number().when("type", {
    is: "tailor",
    then: () =>
      Yup.number()
        .typeError("Number of rooms must be a number")
        .required("Number of rooms is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  priceOfAdultInPKR: Yup.number().when("type", {
    is: "group",
    then: () =>
      Yup.number()
        .typeError("Price for adult in PKR must be a number")
        .required("Price for adult in PKR is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  priceOfAdultInUSD: Yup.number().when("type", {
    is: "group",
    then: () =>
      Yup.number()
        .typeError("Price for adult in USD must be a number")
        .required("Price for adult in USD is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  priceOfKidInPKR: Yup.number().when("type", {
    is: "group",
    then: () =>
      Yup.number()
        .typeError("Price for kid in PKR must be a number")
        .required("Price for kid in PKR is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  priceOfKidInUSD: Yup.number().when("type", {
    is: "group",
    then: () =>
      Yup.number()
        .typeError("Price for kid in USD must be a number")
        .required("Price for kid in USD is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  pickupFromLahorePriceInPKR: Yup.number().when("type", {
    is: "group",
    then: () =>
      Yup.number()
        .typeError("Pickup Price from Lahore in PKR must be a number")
        .required("Pickup Price from Lahore in PKR is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  pickupFromLahorePriceInUSD: Yup.number().when("type", {
    is: "group",
    then: () =>
      Yup.number()
        .typeError("Pickup Price from Lahore in USD must be a number")
        .required("Pickup Price from Lahore in USD is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  privateRoomPriceInPKR: Yup.number().when("type", {
    is: "group",
    then: () =>
      Yup.number()
        .typeError("Private room price in PKR must be a number")
        .required("Private room price in PKR is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
  privateRoomPriceInUSD: Yup.number().when("type", {
    is: "group",
    then: () =>
      Yup.number()
        .typeError("Private room price in USD must be a number")
        .required("Private room price in USD is required"),
    otherwise: () => Yup.number().notRequired(),
  }),
});

export const BrochureSchema = Yup.object().shape({
  cover: Yup.mixed().required("Feature Image is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  broucherFile: Yup.mixed().required("PDF File is required"),
});

export const destinationSchema = Yup.object().shape({
  img: Yup.mixed().required("Feature Image is required"),
  title: Yup.string().required("Title is required"),
  featuredTour: Yup.string().required("Featured Tour is required"),
  featureTourDetails: Yup.mixed().required("Featured Tour is required"),
});

export const searchSchema = Yup.object().shape({
  query: Yup.mixed().required("Query is required"),
});

export const blogSchema = Yup.object().shape({
  cover: Yup.mixed().required("Feature Image is required"),
  title: Yup.string().required("Title is required"),
  content: Yup.string()
    .test(
      "custom-check",
      "Content is required!",
      (value) => extractTextFromHTML(value) || value.includes("<img")
    )
    .required("Content is required"),
  keywords: Yup.array()
    .min(1, "Keywords must have at least 1 items")
    .of(Yup.string().required())
    .required("Keywords is required"),
});

export const paymentGatewaySchema = Yup.object().shape({
  customerName: Yup.string().required("Name is required"),
  phone: Yup.string()
    .test("custom-check", "Phone number must be valid", isValidPhoneNumber)
    .required("Phone is required"),
  amount: Yup.string().required("Amount is required"),
  selectedPriceIn: Yup.string().oneOf(["PKR", "USD"]),
});

export const groupBookingFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  preferBy: Yup.string().oneOf(["email", "phone"]),
  email: Yup.string().when("preferBy", {
    is: "email",
    then: () =>
      Yup.string().email("Email must be valid").required("Email is required"),
    otherwise: () => Yup.string().email("Email must be valid").nullable(),
  }),
  phone: Yup.string()
    .test("custom", "Enter a valid number", (value) =>
      isValidPhoneNumber(value)
    )
    .required("Phone is required"),
  numberOfAdultPerson: Yup.number()
    .typeError("Persons must be number")
    .min("1", "Persons must be greater than 0."),
  numberOfKids: Yup.number()
    .typeError("Kids must be number")
    .min("0", "Kids must be greater than or equal to 0."),
  numberOfPrivateRoom: Yup.number()
    .typeError("Private room must be number")
    .min("0", "Private room must be greater than or equal to 0."),
  manualPickupFromLahore: Yup.boolean(),

  tour: Yup.string().required("Group Tour Id is required"),

  orderId: Yup.string().required("Order Id is required"),
  status: Yup.string()
    .oneOf(["Active", "Closed", "Retained"])
    .required("Status is required"),
  paidBy: Yup.string()
    .oneOf(["Alfalah", "PayPro", "None"])
    .required("Paid By is required"),
  paymentStatus: Yup.string()
    .oneOf(["PAID", "UNPAID"])
    .required("Payment Status is required"),
});

export const tailorMadeBookingFormSchema = (minimumNumberOfAdults = 10) =>
  Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    preferBy: Yup.string().oneOf(["email", "phone"]),
    email: Yup.string().when("preferBy", {
      is: "email",
      then: () =>
        Yup.string().email("Email must be valid").required("Email is required"),
      otherwise: () => Yup.string().email("Email must be valid").nullable(),
    }),
    phone: Yup.string()
      .test("custom", "Enter a valid number", (value) =>
        isValidPhoneNumber(value)
      )
      .required("Phone is required"),
    travelPackage: Yup.string()
      .oneOf(["Standard", "Deluxe", "Executive"])
      .required("Travel Package is required"),
    numberOfAdultPerson: Yup.string("")
      .test("custom-validation", "Adult must be a number", (value) => {
        return !isNaN(Number(value));
      })
      .when("wantCustomize", {
        is: true,
        then: () =>
          Yup.string().test(
            "custom-validation",
            `Adult must be greater or equal to ${1}`,
            (value) => {
              return Number(value) >= 1;
            }
          ),
        otherwise: () =>
          Yup.string().test(
            "custom-validation",
            `Adult must be greater or equal to ${minimumNumberOfAdults}`,
            (value) => {
              return Number(value) >= minimumNumberOfAdults;
            }
          ),
      })
      .required("Adult is required"),
    numberOfRoom: Yup.string()
      .test("custom-validation", "Room must be a number", (value) => {
        return !isNaN(Number(value));
      })
      .test(
        "custom-validation",
        "Room must be greater or equal to 1",
        (value) => {
          return Number(value) >= 1;
        }
      )
      .required("Room is required"),
    departureDate: Yup.date().required("Departure Date is required"),
    days: Yup.string()
      .test("custom-validation", "Days must be a number", (value) => {
        return !isNaN(Number(value));
      })
      .test(
        "custom-validation",
        "Days must be greater or equal to 5",
        (value) => {
          return Number(value) >= 5;
        }
      )
      .required("Days is required"),
    requirement: Yup.string().when("wantCustomize", {
      is: true,
      then: () => Yup.string().required("Requirement is required"),
      otherwise: () => Yup.string().nullable(),
    }),
    wantCustomize: Yup.boolean(),

    tour: Yup.string().required("Tailor Tour Id is required"),

    orderId: Yup.string().notRequired(),
    status: Yup.string()
      .oneOf(["Active", "Closed", "Retained"])
      .required("Status is required"),
    paidBy: Yup.string()
      .oneOf(["Alfalah", "PayPro", "None"])
      .required("Paid By is required"),
    paymentStatus: Yup.string()
      .oneOf(["PAID", "UNPAID"])
      .required("Payment Status is required"),
  });

export const coupleBookingFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  preferBy: Yup.string().oneOf(["email", "phone"]),
  email: Yup.string().when("preferBy", {
    is: "email",
    then: () =>
      Yup.string().email("Email must be valid").required("Email is required"),
    otherwise: () => Yup.string().email("Email must be valid").nullable(),
  }),
  phone: Yup.string()
    .test("custom", "Enter a valid number", (value) =>
      isValidPhoneNumber(value)
    )
    .required("Phone is required"),
  travelPackage: Yup.string()
    .oneOf(["Standard", "Deluxe", "Executive"])
    .required("Travel Package is required"),
  numberOfAdultPerson: Yup.number()
    .typeError("Adult Person must be a number")
    .min(2, "Adult Person must be greater or equal to 2")
    .required("Adult Person is required"),
  numberOfKids: Yup.number()
    .typeError("Kids must be a number")
    .min(0, "Kids must be between 0 and 2")
    .max(2, "Kids must be between 0 and 2")
    .required("Kids is required"),
  numberOfRoom: Yup.number()
    .typeError("Room must be a number")
    .min(1, "Room must be between 1")
    .max(1, "Room must be between 1")
    .required("Room is required"),
  departureDate: Yup.date().required("Departure Date is required"),
  wantExtraServices: Yup.boolean(),
  requirement: Yup.string().when("wantExtraServices", {
    is: true,
    then: () => Yup.string().required("Requirement is required"),
    otherwise: () => Yup.string().nullable(),
  }),
  additionalServices: Yup.string().when("wantExtraServices", {
    is: true,
    then: () => Yup.array(),
    otherwise: () => Yup.array(),
  }),

  tour: Yup.string().required("Couple Tour Id is required"),

  orderId: Yup.string().required("Order Id is required"),
  status: Yup.string()
    .oneOf(["Active", "Closed", "Retained"])
    .required("Status is required"),
  paidBy: Yup.string()
    .oneOf(["Alfalah", "PayPro", "None"])
    .required("Paid By is required"),
  paymentStatus: Yup.string()
    .oneOf(["PAID", "UNPAID"])
    .required("Payment Status is required"),
});

export const planMyTripBookingFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  preferBy: Yup.string().oneOf(["email", "phone"]),
  email: Yup.string().when("preferBy", {
    is: "email",
    then: () =>
      Yup.string().email("Email must be valid").required("Email is required"),
    otherwise: () => Yup.string().email("Email must be valid").nullable(),
  }),
  phone: Yup.string()
    .test("custom", "Enter a valid number", (value) =>
      isValidPhoneNumber(value)
    )
    .required("Phone is required"),
  location: Yup.string().required("Location is required"),
  travelPackage: Yup.string()
    .oneOf(["standard", "deluxe", "exective"])
    .required("Travel Package is required"),
  numberOfAdultPerson: Yup.string()
    .test("custom-validation", "Adult must be a number", (value) => {
      return !isNaN(Number(value));
    })
    .test(
      "custom-validation",
      "Adult must be greater or equal to 1",
      (value) => {
        return Number(value) >= 1;
      }
    )
    .test(
      "custom-validation",
      "Adult must be smaller or equal to 100",
      (value) => {
        return Number(value) <= 100;
      }
    )
    .required("Adult is required"),
  numberOfChildren: Yup.string()
    .test("custom-validation", "Children must be a number", (value) => {
      return !isNaN(Number(value));
    })
    .test(
      "custom-validation",
      "Children must be greater or equal to 0",
      (value) => {
        return Number(value) >= 0;
      }
    )
    .test(
      "custom-validation",
      "Children must be smaller or equal to 20",
      (value) => {
        return Number(value) <= 20;
      }
    )
    .required("Children is required"),
  numberOfRoom: Yup.string()
    .test("custom-validation", "Room must be a number", (value) => {
      return !isNaN(Number(value));
    })
    .test(
      "custom-validation",
      "Room must be greater or equal to 1",
      (value) => {
        return Number(value) >= 1;
      }
    )
    .test(
      "custom-validation",
      "Room must be smaller or equal to 100",
      (value) => {
        return Number(value) <= 100;
      }
    )
    .required("Room is required"),
  departureLocation: Yup.string().required("Departure Location is required"),
  departureDate: Yup.date().required("Departure Date is required"),
  days: Yup.string()
    .test("custom-validation", "Days must be a number", (value) => {
      return !isNaN(Number(value));
    })
    .test(
      "custom-validation",
      "Days must be greater or equal to 1",
      (value) => {
        return Number(value) >= 1;
      }
    )
    .test(
      "custom-validation",
      "Days must be smaller or equal to 50",
      (value) => {
        return Number(value) <= 50;
      }
    )
    .required("Days is required"),
  requirement: Yup.string().required("Requirement is required"),

  orderId: Yup.string().notRequired(),
  status: Yup.string()
    .oneOf(["Active", "Closed", "Retained"])
    .required("Status is required"),
  paidBy: Yup.string()
    .oneOf(["Alfalah", "PayPro", "None"])
    .required("Paid By is required"),
  paymentStatus: Yup.string()
    .oneOf(["PAID", "UNPAID"])
    .required("Payment Status is required"),
});

export const invitationLetterBookingFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  phone: Yup.string()
    .test("custom", "Enter a valid number", (value) =>
      isValidPhoneNumber(value)
    )
    .required("Phone is required"),

  package: Yup.string()
    .oneOf(["package1", "package2", "package3"], "Not a valid package")
    .required("Package Type is required"),
  visaType: Yup.string()
    .oneOf(
      ["Tourist Visa", "Business Visa", "To meet Friends/Family"],
      "Not a valid Visa Type"
    )
    .required("Type of Visa is required"),
  portOfEntry: Yup.string()
    .oneOf(["Islamabad", "Lahore", "Karachi"], "Not a valid Port of Entry")
    .required("Port of Entry is required"),

  dateOfArrival: Yup.string().required("Arrival Date is required"),
  dateOfDeparture: Yup.string()
    .when("dateOfArrival", (dateOfArrival, schema, { value }) => {
      return new Date(dateOfArrival[0]) <= new Date(value)
        ? schema
        : schema.oneOf(
            ["fake for error"],
            "Departure Date must be greater than Arrival Date"
          );
    })
    .required("Departure Date is required"),

  placeToVisit: Yup.string().required("Place to visit is required"),
  emergencyNumbers: Yup.string().required("Emergency Numbers are required"),
  addOnServices: Yup.array(),
  passwordImage: Yup.mixed().required("Password image is required!"),

  orderId: Yup.string().required("Order Id is required"),
  paidBy: Yup.string()
    .oneOf(["Alfalah", "PayPro", "None"])
    .required("Paid By is required"),
  paymentStatus: Yup.string()
    .oneOf(["PAID", "UNPAID"])
    .required("Payment Status is required"),
});

export const contactUsFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(4, "Full Name atleast 4 characters long.")
    .required("Full Name is required"),
  message: Yup.string().required("Message is required"),
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),

  phone: Yup.string()
    .test("custom", "Enter a valid number", (value) =>
      isValidPhoneNumber(value)
    )
    .required("Contact number is required"),
});

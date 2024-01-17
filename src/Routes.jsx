import { Routes as RouterRoutes, Route } from "react-router-dom";
import { AuthLayout, HeaderLayout, HeaderSidebar } from "@/Layout";
import {
  MyReactHelmet,
  ProtectedRoute,
  UnProtectedRoute,
} from "@/components/common";
import {
  Dashboard,
  Logout,
  Login,
  MyProfile,
  Subscribers,
  ForgetPassword,
  ResetPassword,
  MyProfileEdit,
  MyProfileChangePassword,
  ToursCreate,
  Brochures,
  BrochuresCreate,
  BrochuresEdit,
  ToursEdit,
  DestinationsCreate,
  DestinationsEdit,
  BlogsCreate,
  BlogsEdit,
  Tours,
  Destinations,
  Blogs,
  Applications,
  PaymentGateway,
  ApplicationsTailor,
  ApplicationsCouple,
  ApplicationsGroup,
  ApplicationsPlanMyTrip,
  ApplicationsContactUs,
  ApplicationsInvitationLetter,
  ToursDuplicate,
  NotFound404,
} from "@/modules";
import Notifications from "./modules/Notifications";
import MyCourses from "./modules/MyCourses";
import ManageEvents from "./modules/ManageEvents";
import ViewCourse from "./modules/ViewCourse";
import CourseLayout from "./Layout/CourseLayout";
import Lectures from "./modules/Lectures";
import Quizzes from "./modules/Quizzes";
import Assignments from "./modules/Assignments";
import Exam from "./modules/Exam";
import AcademicRecord from "./modules/AcademicRecord";
import QuizSummary from "./modules/QuizSummary";
import Quiz from "./modules/Quiz";
import Assignment from "./modules/Assignment";
import AssignmentSummary from "./modules/AssignmentSummary";
import MarkAssignment from "./modules/MarkAssignment";
import Participants from "./modules/Participants";
import Attendance from "./modules/Attendance";
import Reports from "./modules/Reports";

const Routes = () => {
  return (
    <RouterRoutes>
      {authRoutes}
      {headerSidebarLayoutRoutes}
      <Route path="*" element={<NotFound404 />} />
    </RouterRoutes>
  );
};

const authRoutes = [
  <Route key="logout" element={<ProtectedRoute />}>
    <Route
      path="/logout"
      element={<MyReactHelmet title="Logout" element={<Logout />} />}
    />
  </Route>,
  <Route key="AuthRoutes" element={<UnProtectedRoute />}>
    <Route element={<AuthLayout />}>
      <Route
        path="/login"
        element={<MyReactHelmet title="Login" element={<Login />} />}
      />
      <Route
        path="/forget-password"
        element={
          <MyReactHelmet title="Forget Password" element={<ForgetPassword />} />
        }
      />
      <Route
        path="/reset-password"
        element={
          <MyReactHelmet title="Reset Password" element={<ResetPassword />} />
        }
      />
    </Route>
  </Route>,
];

const headerLayoutRoutes = [
  <Route key="headerLayoutRoutes" element={<HeaderLayout />}>
    <Route
      path="/"
      element={<MyReactHelmet title="Dashboard" element={<Dashboard />} />}
    />
    <Route
      path="/notifications"
      element={
        <MyReactHelmet title="Notifications" element={<Notifications />} />
      }
    />
    <Route
      path="/my-courses"
      element={<MyReactHelmet title="My Courses" element={<MyCourses />} />}
    />
    <Route path="/course" element={<CourseLayout />}>
      <Route
        path="/course/:id"
        element={<MyReactHelmet title="Course" element={<ViewCourse />} />}
      />
      <Route
        path="/course/lectures/:id"
        element={<MyReactHelmet title="Lectures" element={<Lectures />} />}
      />
      <Route
        path="/course/quizzes/:id"
        element={<MyReactHelmet title="Quizzes" element={<Quizzes />} />}
      />
      <Route
        path="/course/assignments/:id"
        element={
          <MyReactHelmet title="Assignments" element={<Assignments />} />
        }
      />
      <Route
        path="/course/participants/:id"
        element={
          <MyReactHelmet title="Participants" element={<Participants />} />
        }
      />
      <Route
        path="/course/academic-record/:id"
        element={
          <MyReactHelmet title="Academic Record" element={<AcademicRecord />} />
        }
      />
      <Route
        path="/course/attendance/:id"
        element={<MyReactHelmet title="Attendance" element={<Attendance />} />}
      />
      <Route
        path="/course/exam/:id"
        element={<MyReactHelmet title="Exam" element={<Exam />} />}
      />

      <Route
        path="/course/:id/quiz/:qid"
        element={<MyReactHelmet title="Quiz Summary" element={<Quiz />} />}
      />

      <Route
        path="/course/:id/quizSummary/:qid"
        element={
          <MyReactHelmet title="Quiz Summary" element={<QuizSummary />} />
        }
      />

      <Route
        path="/course/:id/assignment/:aid"
        element={<MyReactHelmet title="Assignment" element={<Assignment />} />}
      />

      <Route
        path="/course/:id/assignmentSummary/:aid"
        element={
          <MyReactHelmet title="Assignment" element={<AssignmentSummary />} />
        }
      />

      <Route
        path="/course/:id/assignment/:aid/student/:sid"
        element={
          <MyReactHelmet title="Assignment" element={<MarkAssignment />} />
        }
      />

      <Route
        path="/course/:id/lecture/:lid"
        element={
          <MyReactHelmet title="Lecture Report" element={<Reports />} />
        }
      />
    </Route>

    <Route
      path="/manage-events"
      element={
        <MyReactHelmet title="Manage Events" element={<ManageEvents />} />
      }
    />
    <Route
      path="/blogs"
      element={<MyReactHelmet title="Blogs" element={<Blogs />} />}
    />

    <Route
      path="/downloads"
      element={<MyReactHelmet title="Downloads" element={<Brochures />} />}
    />

    <Route path="/applications">
      <Route
        index
        element={
          <MyReactHelmet title="Applications" element={<Applications />} />
        }
      />
      <Route
        path="tailor-made-tours"
        element={
          <MyReactHelmet
            title="Tailor-Made Tour Applications"
            element={<ApplicationsTailor />}
          />
        }
      />
      <Route
        path="couple-tours"
        element={
          <MyReactHelmet
            title="Couple Tour Applications"
            element={<ApplicationsCouple />}
          />
        }
      />
      <Route
        path="group-tours"
        element={
          <MyReactHelmet
            title="Group Tour Applications"
            element={<ApplicationsGroup />}
          />
        }
      />
      <Route
        path="plan-my-trip"
        element={
          <MyReactHelmet
            title="Plan My Trip Applications"
            element={<ApplicationsPlanMyTrip />}
          />
        }
      />
      <Route
        path="contact-us"
        element={
          <MyReactHelmet
            title="Contact Us Applications"
            element={<ApplicationsContactUs />}
          />
        }
      />
      <Route
        path="invitation-letter"
        element={
          <MyReactHelmet
            title="Invitation Letter Applications"
            element={<ApplicationsInvitationLetter />}
          />
        }
      />
    </Route>

    <Route
      path="/payment-gateway"
      element={
        <MyReactHelmet title="Payment Gateway" element={<PaymentGateway />} />
      }
    />
  </Route>,
];

const headerSidebarLayoutRoutes = [
  <Route key="headerSidebarLayoutRoutes" >
    <Route element={<HeaderSidebar />}>
      {headerLayoutRoutes}

      <Route path="/my-profile">
        <Route
          element={<MyReactHelmet title="My Profile" element={<MyProfile />} />}
          index
        />
        <Route
          path="edit"
          element={
            <MyReactHelmet title="Edit Profile" element={<MyProfileEdit />} />
          }
        />
        <Route
          path="change-password"
          element={
            <MyReactHelmet
              title="Change Password"
              element={<MyProfileChangePassword />}
            />
          }
        />
      </Route>

      <Route path="/tours">
        <Route
          path="create"
          element={
            <MyReactHelmet title="Create Tour" element={<ToursCreate />} />
          }
        />
        <Route
          path="edit/:type/:tourId"
          element={<MyReactHelmet title="Edit Tour" element={<ToursEdit />} />}
        />
        <Route
          path="duplicate/:type/:tourId"
          element={
            <MyReactHelmet
              title="Duplicate Tour"
              element={<ToursDuplicate />}
            />
          }
        />
      </Route>

      <Route path="/downloads">
        <Route
          path="create"
          element={
            <MyReactHelmet
              title="Create Download"
              element={<BrochuresCreate />}
            />
          }
        />
        <Route
          path="edit/:brochureId"
          element={
            <MyReactHelmet title="Edit Download" element={<BrochuresEdit />} />
          }
        />
      </Route>

      <Route path="/destinations">
        <Route
          path="create"
          element={
            <MyReactHelmet
              title="Create Destination"
              element={<DestinationsCreate />}
            />
          }
        />
        <Route
          path="edit/:destinationId"
          element={
            <MyReactHelmet
              title="Edit Destination"
              element={<DestinationsEdit />}
            />
          }
        />
      </Route>

      <Route path="/blogs">
        <Route
          path="create"
          element={
            <MyReactHelmet title="Create Blog" element={<BlogsCreate />} />
          }
        />
        <Route
          path="edit/:blogId"
          element={<MyReactHelmet title="Edit Blog" element={<BlogsEdit />} />}
        />
      </Route>
    </Route>
  </Route>,
];

export default Routes;

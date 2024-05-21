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
  ForgetPassword,
  ResetPassword,
  MyProfileEdit,
  MyProfileChangePassword,
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
import StudentDashboard from "./modules/StudentDashboard";
import EnrolledCourses from "./modules/EnrolledCourses";
import { AdminCoursesTabs, StudentCoursesTabs } from "./constants/common";
import OnGoingAssignments from "./modules/OnGoingAssignments";
import OGA from "./modules/OGA";
import StudentGrades from "./modules/StudentGrades";
import StudentLogin from "./modules/StudentLogin";
import AdminLogin from "./modules/admin/AdminLogin";
import ManageStudents from "./modules/admin/ManageStudents";
import ManageTeachers from "./modules/admin/ManageTeachers";
import ManageAnnouncements from "./modules/admin/ManageAnnouncements";
import ManageNotifications from "./modules/admin/ManageNotifications";
import AllClasses from "./modules/admin/AllClasses";
import QuizDetail from "./modules/QuizDetail";
import GradePage from "./modules/admin/AllClasses/Grade";
import LecturesPage from "./modules/admin/AllClasses/Lectures";
import AdminAssignments from "./modules/admin/AllClasses/AdminAssignments";
import AdminQuizzes from "./modules/admin/AllClasses/AdminQuizzes";
import AdminExams from "./modules/admin/AllClasses/AdminExams";
import AdminStudents from "./modules/admin/AllClasses/AdminStudents";
import AdminReports from "./modules/admin/AllClasses/AdminReports";
import SubmittedAssignments from "./modules/admin/AllClasses/AdminAssignments/SubmittedAssignments";

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
    <Route
      path="/student-login"
      element={
        <MyReactHelmet
          title="Login"
          element={<StudentLogin forStudent={true} />}
        />
      }
    />
    <Route
      path="/admin-login"
      element={<MyReactHelmet title="Login" element={<AdminLogin />} />}
    />
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

const adminLayoutRoutes = [
  <Route key="headerLayoutRoutes" element={<HeaderLayout />}>
    <Route
      path="/notifications"
      element={
        <MyReactHelmet title="Notifications" element={<Notifications />} />
      }
    />
    <Route
      path="/manage-students"
      element={
        <MyReactHelmet title="Manage Students" element={<ManageStudents />} />
      }
    />
    <Route
      path="/manage-teachers"
      element={
        <MyReactHelmet title="Manage Teachers" element={<ManageTeachers />} />
      }
    />
    <Route
      path="/manage-announcements"
      element={
        <MyReactHelmet
          title="Manage Announcements"
          element={<ManageAnnouncements />}
        />
      }
    />
    <Route
      path="/manage-notifications"
      element={
        <MyReactHelmet
          title="Manage Notifications"
          element={<ManageNotifications />}
        />
      }
    />
    <Route
      path="/all-classes"
      element={<MyReactHelmet title="All Classes" element={<AllClasses />} />}
    />

    <Route
      path="/all-classes/grade/:gradeId"
      element={<MyReactHelmet title="Grade" element={<GradePage />} />}
    />

    <Route
      path="/all-classes"
      element={<CourseLayout tabs={AdminCoursesTabs} />}
    >
      <Route
        path="/all-classes/grade/:gradeId/:courseName/:courseId/lectures"
        element={<MyReactHelmet title="Grade" element={<LecturesPage />} />}
      />
      <Route
        path="/all-classes/grade/:gradeId/:courseName/:courseId/assignments"
        element={
          <MyReactHelmet title="Assignment" element={<AdminAssignments />} />
        }
      />
      <Route
        path="/all-classes/grade/:gradeId/:courseName/:courseId/assignments/:assignmentId"
        element={
          <MyReactHelmet
            title="Assignment"
            element={<SubmittedAssignments />}
          />
        }
      />
      <Route
        path="/all-classes/grade/:gradeId/:courseName/:courseId/quizzes"
        element={<MyReactHelmet title="Quizzes" element={<AdminQuizzes />} />}
      />
      <Route
        path="/all-classes/grade/:gradeId/:courseName/:courseId/exams"
        element={<MyReactHelmet title="Exams" element={<AdminExams />} />}
      />
      <Route
        path="/all-classes/grade/:gradeId/:courseName/:courseId/students"
        element={<MyReactHelmet title="Students" element={<AdminStudents />} />}
      />
      <Route
        path="/all-classes/grade/:gradeId/:courseName/:courseId/reports"
        element={<MyReactHelmet title="Reports" element={<AdminReports />} />}
      />
    </Route>
  </Route>,
];

const studentLayoutRoutes = [
  <Route key="headerLayoutRoutes" element={<HeaderLayout />}>
    <Route
      path="/notifications"
      element={
        <MyReactHelmet title="Notifications" element={<Notifications />} />
      }
    />
    <Route
      path="/enrolled-courses"
      element={
        <MyReactHelmet title="Enrolled Courses" element={<EnrolledCourses />} />
      }
    />
    <Route
      path="/enrolled-courses"
      element={<CourseLayout tabs={StudentCoursesTabs} forStudent={true} />}
    >
      <Route
        path="/enrolled-courses/:id"
        element={<MyReactHelmet title="Course" element={<ViewCourse />} />}
      />
      <Route
        path="/enrolled-courses/lectures/:id"
        element={
          <MyReactHelmet
            title="Lectures"
            element={<Lectures forStudent={true} />}
          />
        }
      />
      <Route
        path="/enrolled-courses/quizzes/:id"
        element={
          <MyReactHelmet
            title="Quizzes"
            element={<Quizzes forStudent={true} />}
          />
        }
      />
      <Route
        path="/enrolled-courses/on-going-assesments/:id"
        element={
          <MyReactHelmet
            title="Quizzes"
            element={<OnGoingAssignments forStudent={true} />}
          />
        }
      />

      <Route
        path="/enrolled-courses/:id/on-going-assesments/:aid"
        element={
          <MyReactHelmet
            title="Quiz Summary"
            element={<Quiz forStudent={true} forAssesment={true} />}
          />
        }
      />

      <Route
        path="/enrolled-courses/assignments/:id"
        element={
          <MyReactHelmet
            title="Assignments"
            element={<Assignments forStudent={true} />}
          />
        }
      />
      <Route
        path="/enrolled-courses/grades/:id"
        element={
          <MyReactHelmet
            title="Student Grades"
            element={<StudentGrades forStudent={true} />}
          />
        }
      />
      <Route
        path="/enrolled-courses/exam/:id"
        element={
          <MyReactHelmet title="Exam" element={<Exam forStudent={true} />} />
        }
      />
      <Route
        path="/enrolled-courses/:id/exam/:eid"
        element={
          <MyReactHelmet
            title="Exam"
            element={<Quiz forStudent={true} forExam={true} />}
          />
        }
      />

      <Route
        path="/enrolled-courses/:id/quizzes/:qid"
        element={
          <MyReactHelmet
            title="Quiz Summary"
            element={<Quiz forStudent={true} />}
          />
        }
      />

      <Route
        path="/enrolled-courses/:id/quizSummary/:qid"
        element={
          <MyReactHelmet
            title="Quiz Summary"
            element={<QuizSummary forStudent={true} />}
          />
        }
      />

      <Route
        path="/enrolled-courses/:id/assignments/:aid"
        element={
          <MyReactHelmet
            title="Assignment"
            element={<Assignment forStudent={true} />}
          />
        }
      />

      <Route
        path="/enrolled-courses/:id/assignmentSummary/:aid"
        element={
          <MyReactHelmet
            title="Assignment"
            element={<AssignmentSummary forStudent={true} />}
          />
        }
      />

      <Route
        path="/enrolled-courses/:id/assignment/:aid/student/:sid"
        element={
          <MyReactHelmet
            title="Assignment"
            element={<MarkAssignment forStudent={true} />}
          />
        }
      />

      <Route
        path="/enrolled-courses/:id/lectures/:lid"
        element={
          <MyReactHelmet
            title="Lecture Report"
            element={<Reports forStudent={true} />}
          />
        }
      />
    </Route>

    <Route
      path="/manage-events"
      element={
        <MyReactHelmet title="Manage Events" element={<ManageEvents />} />
      }
    />
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
        path="/course/oga/:id"
        element={<MyReactHelmet title="OGA" element={<OGA />} />}
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
        path="/course/:id/quiz-detail/:qid"
        element={
          <MyReactHelmet title="Quiz Summary" element={<QuizDetail />} />
        }
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
        path="/course/:id/lectures/:lid"
        element={<MyReactHelmet title="Lecture Report" element={<Reports />} />}
      />
    </Route>

    <Route
      path="/manage-events"
      element={
        <MyReactHelmet title="Manage Events" element={<ManageEvents />} />
      }
    />
  </Route>,
];

const headerSidebarLayoutRoutes = [
  <Route key="headerSidebarLayoutRoutes" element={<ProtectedRoute />}>
    <Route element={<HeaderSidebar />}>
      {headerLayoutRoutes}
      {studentLayoutRoutes}
      {adminLayoutRoutes}

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
    </Route>
  </Route>,
];

export default Routes;

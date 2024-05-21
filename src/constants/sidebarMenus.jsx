import CoursesIcon from "@/assets/Icons/CoursesIcon";
import Desktop from "@/assets/Icons/Desktop";
import Events from "@/assets/Icons/Events";

export const panelSideBar = () => ({
  admin: [
    {
      to: "/",
      name: "Dashboard",
      icon: <Desktop />,
    },
    {
      to: "/all-classes",
      name: "All Classes",
      icon: <CoursesIcon />,
      courses: [
        {
          id: "43657457",
          name: "Grade I",
          route: "/all-classes/grade/I",
        },
        {
          id: "43635654",
          name: "Grade II",
          route: "/all-classes/grade/II",
        },
        {
          id: "43645776",
          name: "Grade III",
          route: "/all-classes/grade/III",
        },
        {
          id: "43645776",
          name: "Grade IV",
          route: "/all-classes/grade/IV",
        },
        {
          id: "43645776",
          name: "Grade V",
          route: "/all-classes/grade/V",
        },
        {
          id: "43645776",
          name: "Grade VI",
          route: "all-classes/grade/VI",
        },
        {
          id: "43645776",
          name: "Grade VII",
          route: "/all-classes/grade/VII",
        },
        {
          id: "43645776",
          name: "Grade VIII",
          route: "/all-classes/grade/VIII",
        },
        {
          id: "43645776",
          name: "Grade IX",
          route: "/all-classes/grade/IX",
        },
        {
          id: "43645776",
          name: "Grade X",
          route: "/all-classes/grade/X",
        },
      ],
    },
    {
      to: "/manage-students",
      name: "Manage Students",
      icon: <Events />,
    },
    {
      to: "/manage-teachers",
      name: "Manage Teachers",
      icon: <Events />,
    },
    {
      to: "/manage-announcements",
      name: "Manage Announcements",
      icon: <Events />,
    },
    {
      to: "/manage-notifications",
      name: "Manage Notifications",
      icon: <Events />,
    },
  ],
  student: [
    {
      to: "/",
      name: "Dashboard",
      icon: <Desktop />,
    },
    {
      to: "/enrolled-courses",
      name: "Enrolled Courses",
      icon: <CoursesIcon />,
      courses: [
        {
          id: "43657457",
          name: "Grade 1(Alliums)",
        },
        {
          id: "43635654",
          name: "Grade 2(Alliums)",
        },
        {
          id: "43645776",
          name: "Grade 3(Alliums)",
        },
      ],
    },
    // {
    //   to: "/to-do",
    //   name: "To do",
    //   icon: <Events />,
    // },
    {
      to: "/manage-events",
      name: "Calender",
      icon: <Events />,
    },
  ],
  teacher: [
    {
      to: "/",
      name: "Dashboard",
      icon: <Desktop />,
    },
    {
      to: "/my-courses",
      name: "My Courses",
      icon: <CoursesIcon />,
      courses: [
        {
          id: "43657457",
          name: "Grade 1(Alliums)",
        },
        {
          id: "43635654",
          name: "Grade 2(Alliums)",
        },
        {
          id: "43645776",
          name: "Grade 3(Alliums)",
        },
      ],
    },
    {
      to: "/manage-events",
      name: "Manage Events",
      icon: <Events />,
    },
  ],
});

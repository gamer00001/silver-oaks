import { Calendar } from "react-date-range";
import teaching from "../../assets/RightBar/Teaching.png";
import UserProfile from "../Header/UserProfile";

export const allowedPathsForRightSidebar = ["/", "/my-courses", "/course"];

const RightSideBar = () => {
  return (
    <aside className="py-[2.8rem] grid grid-cols-1 content-start gap-[3.2rem]">
      <div className="px-[1.9rem]">
        <UserProfile />
        <Calendar
          date={new Date()}
          // onChange={this.handleSelect}
          color="#7A1315"
        />
      </div>
      <div className="grid gap-[1.6rem] px-[1.7rem] py-[1.7rem]">
        <h1 className="h5-bold text-custom-dark-gren">Announcements</h1>
      </div>
      <img src={teaching} />
    </aside>
  );
};

export default RightSideBar;

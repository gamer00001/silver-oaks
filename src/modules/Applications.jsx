import { Link } from "@/components/common";

function Applications() {
  return (
    <div className="px-[1.7rem]">
      <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.4rem]">
        <div className="grid gap-[1.6rem]">
          <h1 className="h5-bold text-custom-dark-gren">Applications</h1>
          <p className="body-regular text-custom-dark-gren">
            Offer some useful tips and advice for visitors to the Falcon Club
            Tourist page
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(34rem,1fr))] gap-[2rem]">
          <ApplicationsItem text="Tailor-Made Tours" to="tailor-made-tours" />
          <ApplicationsItem text="Couple Tours" to="couple-tours" />
          <ApplicationsItem text="Group Tours" to="group-tours" />
          <ApplicationsItem text="Plan My Trip" to="plan-my-trip" />
          <ApplicationsItem text="Contact Us" to="contact-us" />
          <ApplicationsItem text="Invitation Letter" to="invitation-letter" />
        </div>
      </div>
    </div>
  );
}

export default Applications;

const ApplicationsItem = ({ to = "", text = "" }) => {
  return (
    <Link
      className="bg-[#E8F1F7] rounded-[1.6rem] py-[9.6rem] w-full grid content-center justify-items-center text-custom-dark-gren text-[2.5rem] text-center capitalize leading-[120%] font-bold opacity"
      to={to}
    >
      {text}
    </Link>
  );
};

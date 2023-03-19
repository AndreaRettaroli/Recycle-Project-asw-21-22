import react, { FC } from "react";
import { NavLink } from "react-router-dom";
import logo from "/recycleLogo.jpg";
import home from "../../assets/home.svg";
import statistics from "../../assets/statistics.svg";
import profile from "../../assets/profile.svg";

interface Props {
  title: string;
}

const Navbar: FC<Props> = ({ title }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center sm:hidden">
        <img src={logo} width="80px" alt="recycle-logo" />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <nav className="shadow-header z-10 w-full flex flex-col sm:flex-row items-center justify-between p-1 fixed bottom-0 sm:top-0 sm:bottom-auto  bg-white">
        <div className="sm:flex sm:items-center hidden">
          <img src={logo} width="80px" alt="recycle-logo" />
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>

        <ul className="inline-flex gap-8 items-center sm:mr-16">
          <li>
            <NavLink
              to="/home"
              style={({ isActive }) => ({
                fontWeight: isActive ? "Bolder" : "none",
                textDecoration: isActive ? "underline" : "none",
                color: isActive ? "#13ce66" : "#000000",
              })}
            >
              <img
                src={home}
                width={24}
                style={{ backgroundImage: home }}
                className="sm:hidden m-auto "
                alt="home-icon"
              />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/statistics"
              style={({ isActive }) => ({
                fontWeight: isActive ? "Bolder" : "none",
                textDecoration: isActive ? "underline" : "none",
                color: isActive ? "#13ce66" : "#000000",
              })}
            >
              <img
                src={statistics}
                width={24}
                className="sm:hidden m-auto"
                alt="statistics-icon"
              />
              Statistics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                fontWeight: isActive ? "Bolder" : "none",
                textDecoration: isActive ? "underline" : "none",
                color: isActive ? "#13ce66" : "#000000",
              })}
            >
              <img
                src={profile}
                width={24}
                className="sm:hidden m-auto"
                alt="statistics-icon"
              />
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

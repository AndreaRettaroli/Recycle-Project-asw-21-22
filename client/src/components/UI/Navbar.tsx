import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import logo from "/recycleLogo.jpg";

interface Props {
  title: string;
}

const Navbar: FC<Props> = ({ title }) => {
  return (
    <nav className="w-full flex items-center justify-between p-2 top-0 absolute bg-white">
      <div className="sm:flex sm:items-center hidden">
        <img src={logo} width="80px" alt="recycle-logo" />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <ul className="inline-flex gap-8 items-center mr-16">
        <li>
          <NavLink
            to="/home"
            style={({ isActive }) => ({
              fontWeight: isActive ? "Bolder" : "none",
              textDecoration: isActive ? "underline" : "none",
              color: isActive ? "#13ce66" : "#000000",
            })}
            exact
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/statistics"
            exact
            style={({ isActive }) => ({
              fontWeight: isActive ? "Bolder" : "none",
              textDecoration: isActive ? "underline" : "none",
              color: isActive ? "#13ce66" : "#000000",
            })}
          >
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
            exact
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

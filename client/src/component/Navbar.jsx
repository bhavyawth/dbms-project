import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Home, LogOut, LucideArrowBigDownDash, Pencil, Plus } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const { user, isLoggedIn,login } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = async (params) => {
    try {
      const res=await axios.post("http://localhost:3000/api/auth/logout",{},{withCredentials:true})
      login(false)
    } catch (error) {
      
    }
  }
  console.log(user)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
const navigate = useNavigate();
  return (
    <>
    
    <nav className="bg-[#111827] text-white px-10 py-4 shadow-md shadow-black/40 rounded-b-xl border-b border-neutral-800 font-inter">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-poppins font-semibold tracking-wider text-gray-100 flex items-center">
         <Home className="mr-1"/> Rent<span className="text-gray-600">N</span><span className="text-neutral-0">Go</span>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive
                  ? "text-white font-semibold underline decoration-purple-500 decoration-2 underline-offset-6 drop-shadow-[0_0_4px_rgba(139,92,246,0.4)]"
                  : "text-neutral-400 hover:text-white"
              }`
            }
          >
            All Listings
          </NavLink>

          <NavLink
            to="/find-by-location"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md transition duration-300 font-medium ${
                isActive
                  ? "bg-purple-700 text-white shadow-md shadow-purple-600/50"
                  : "bg-[#1f2937] text-gray-300 hover:bg-[#374151]"
              }`
            }
          >
            Find by Location
          </NavLink>
        </div>

        <div className="flex items-center gap-5 font-medium relative mr-10" ref={dropdownRef}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {setDropdownOpen((prev) => !prev);}}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={user?.avatar || "https://avatar.iran.liara.run/public"}
                  alt="user"
                  className="w-9 h-9 rounded-full border border-neutral-600"
                />
                <span className="text-gray-300">{user?.username || "User"}</span>
                <span className="text-gray-300"><LucideArrowBigDownDash/></span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-[#1f2937] text-sm text-gray-200 shadow-lg rounded-md py-2 w-44 z-50 flex flex-col">
                  {user.role==="owner" && <button
                    onClick={() => {
                       navigate("/add-listing")
                    }}
                    className="px-4 py-2 hover:bg-[#374151] text-left"
                  >
                    <span className="flex">Add New Listings<Plus className="size-5 ml-3"/></span>
                  </button>}
                  {user.role==="owner" && <button
                    onClick={() => {
                       navigate("/my-listing")
                    }}
                    className="px-4 py-2 hover:bg-[#374151] text-left"
                  >
                    <span className="flex">View/Edit Your Listings<Pencil className="size-5 ml-3"/></span>
                  </button>}
                  <button
                    onClick={logout}
                    className="px-4 py-2 hover:bg-[#374151]"
                  >
                    <span className="flex">Logout<LogOut className="size-5 ml-3"/></span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-neutral-300 hover:text-white transition font-medium ${
                    isActive ? "underline decoration-purple-500" : ""
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `bg-neutral-700 text-white px-4 py-1.5 rounded-md hover:bg-neutral-600 transition font-medium ${
                    isActive ? "ring-2 ring-purple-500 ring-offset-2" : ""
                  }`
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;

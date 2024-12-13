import React, { useState } from "react";
import Logo from "./logo";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogOut = async () => {
    const fetchData = await fetch(summaryApi.Logout_user.url, {
      method: summaryApi.Logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <header id="header" className="bg-white h-16 shadow-md px-4">
      <div className="h-full container mx-auto flex items-center justify-between">
        <div id="Logo" className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div
          id="search-bar"
          className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-1"
        >
          <input
            type="text"
            placeholder="search product here"
            className="w-full outline-none pl-2  "
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <CiSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            <div className="text-3xl cursor-pointer relative flex justify-center" onClick={() =>{setMenuDisplay(prev => !prev)}}>
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  <Link
                    to={"/admin-panel"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-600 p-2 shadow-lg rounded"
                    onClick={() =>{setMenuDisplay(prev => !prev)}}
                  >
                    {" "}
                    Admin-panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 p-1 flex rounded-full items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm ">0</p>
            </div>
          </div>

          <div>
            {user?._id ? (
              <button
                onClick={handleLogOut}
                className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700"
              >
                LogOut
              </button>
            ) : (
              <Link
                to = {"login"}
                className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

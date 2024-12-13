import React, { useContext, useState } from "react";
import loginicon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // naviagtion delararation
  const navigate =useNavigate()
  const { fetchUserDetail } = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(summaryApi.signIn.url, {
      method: summaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    

    if (dataApi.success) {
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetail()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
    
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto ">
          <div className=" w-20 h-20 mx-auto">
            <img src={loginicon} alt="Login Icons" />
          </div>
          <form className="pt-6 flex flex-col gap-4">
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  onChange={handleOnChange}
                  name="email"
                  value={data.email}
                  type="email"
                  placeholder="enter your Email"
                  className="h-full w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handleOnChange}
                  name="password"
                  value={data.password}
                  placeholder="enter your Password"
                  className="h-full w-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block w-fit ml-auto hover:underline hover:text-red-600 "
            >
              Forgot Password
            </Link>
            <div>
              <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6" onClick={handleSubmit}>
                login
              </button>
            </div>
          </form>
          <p className="my-5">
            Don't have an account ?{" "}
            <Link
              to={"/sign-up"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import loginicon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imagetobase64 from "../helpers/Imagetobase64";
import summaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
    profilePic: "",
  });
  const navigate = useNavigate()
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
    // console.log("name", name, 'value', value )
  };
  const handleUpLoadPic = async (e) => {
    const file = e.target.files[0]

    const imagePic = await imagetobase64(file)
    
    console.log('imagePic', imagePic);
    console.log('file', file);
    setData((preve) => {
      return {
        ...preve, 
        profilePic : imagePic
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password === data.confirmpassword){
      const dataApi = await fetch(summaryApi.signUp.url,{

        method:summaryApi.signUp.method,
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify(data),
     })
        const dataResponse = await dataApi.json() 
        
        if (dataResponse.success) {
          toast.success(dataResponse.message)
          navigate("/")
        }
        if (dataResponse.error) {
          toast.error(dataResponse.message)
        }
    } else{
      console.log('pls checkPassword and confir, password');
    }  
      
  };
  // console.log("data login", data);
  return (
    <section id="sign-up">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto ">
          <div className=" w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginicon} alt="Login Icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 pb-4 pt-2 cursor-pointer bg-slate-200 py-4 text-center absolute bottom-0 w-full">
                  upload photo
                </div>
                <input type="file" className="hidden" onChange={handleUpLoadPic} />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-4">
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="text"
                  placeholder="What is your name"
                  className="h-full w-full outline-none bg-transparent"
                  onChange={handleOnchange}
                  name="name"
                  required
                  value={data.name}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  onChange={handleOnchange}
                  type="email"
                  placeholder="enter your Email"
                  className="h-full w-full outline-none bg-transparent"
                  name="email"
                  required
                  value={data.email}
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  onChange={handleOnchange}
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your Password"
                  className="h-full w-full outline-none bg-transparent"
                  name="password"
                  required
                  value={data.password}
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>confirm Password : </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  onChange={handleOnchange}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  className="h-full w-full outline-none bg-transparent"
                  name="confirmpassword"
                  required
                  value={data.confirmpassword}
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6" onClick={handleSubmit}>
                sign Up
              </button>
            </div>
          </form>
          <p className="my-5">
            already have an account ?{" "}
            <Link
              to={"/login"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

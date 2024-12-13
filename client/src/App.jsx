import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import summaryApi from "./common";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const fetchUserDetail = async () => {
    const dataApi = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: "include",
    });
    const dataResponse = await dataApi.json();
    if (dataResponse.success) {
      dispatch(setUserDetails(dataResponse.data));
    }
  };

  return (
    <>
      <div>
        <Context.Provider
          value={{
            fetchUserDetail,
          }}
        >
          <ToastContainer />
          <Header />
          <main className="min-h-[calc(100vh-120px)]">
            <Outlet />
          </main>
          <Footer />
        </Context.Provider>
      </div>
    </>
  );
}

export default App;

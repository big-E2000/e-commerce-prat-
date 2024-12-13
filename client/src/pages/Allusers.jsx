import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

function Allusers() {
  const [allUser, setAllUser] = useState([]);

  const fetchAllUser = async () => {
    const fetchData = await fetch(summaryApi.allUser.url, {
      method: summaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.error);
    }

    console.log(dataResponse);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="bg-white pb-4">
      <table className="w-full usertable">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>createdAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("ll")}</td>
                <td>
                  <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white ">
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <ChangeUserRole />
      </div>
    </div>
  );
}

export default Allusers;

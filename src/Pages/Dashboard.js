import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://zany-turtleneck-yak.cyclic.cloud/";

const Dashboard = () => {
  const navigate = useNavigate();
  const titles = ["Name", "Email", "Phone", "Operation"];
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await axios.get("/");
        console.log("All records are : ", info.data.data);
        setList(info.data.data);
      } catch (err) {
        console.log(err);
        alert("Error fetching data");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log("Delete id is : ", id);
    try {
      await axios.delete("/delete/" + id);
      const info = await axios.get("/");
      console.log("All records are : ", info.data.data);
      setList(info.data.data);
    } catch (err) {
      console.log(err);
      alert("Error deleting data");
    }
  };

  return (
    <div className="flex flex-col w-4/5 m-auto">
      <button
        className="py-1 px-5 mb-2 ml-auto text-blue-500 text-xl font-semibold border border-blue-500  hover:border-blue-700 hover:text-blue-700 active:text-white active:border-blue-500 active:bg-blue-500 rounded duration-200 ease-in"
        onClick={() => navigate("/add")}
      >
        Add
      </button>
      <div className="flex flex-col w-full p-5 border border-gray-300 rounded m-auto">
        <div className="flex flex-row mb-4">
          {titles.map((title) => (
            <h1 key={title} className="flex justify-center text-3xl w-1/4">
              {title}
            </h1>
          ))}
        </div>
        {list.map((item) => (
          <div key={item._id} className="flex flex-row items-center justify-evenly w-100 my-1 text-base">
            <h4 className="flex justify-center w-1/4">{item.name}</h4>
            <h4 className="flex justify-center w-1/4">{item.email}</h4>
            <h4 className="flex justify-center w-1/4">{item.mobile}</h4>
            <h4 className="flex justify-center w-1/4">
              <button className="bg-green-500 hover:bg-green-700 active:bg-green-800 text-white font-bold py-1 px-3 rounded mx-1"
              onClick={()=>{
                navigate("/update/"+item._id)
              }}>
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 active:bg-red-800 text-white font-bold py-1 px-3 rounded mx-1"
                onClick={() => {
                  handleDelete(item._id);
                }}
              >
                Delete
              </button>
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://zany-turtleneck-yak.cyclic.cloud/";

const Add = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ name: "", email: "", mobile: "" });

  const updateDetails = (e) => {
    if (e.target.name === "name")
      setDetails({ ...details, name: e.target.value });
    else if (e.target.name === "email")
      setDetails({ ...details, email: e.target.value });
    else setDetails({ ...details, mobile: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (details.name === "" || details.email === "" || details.mobile === "")
      return alert("Please fill all the fields");
    console.log(details);
    await axios.post("/add", details);
    setDetails({ name: "", email: "", mobile: "" });
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col w-2/5 p-5 border border-gray-300 rounded m-auto">
        <h1 className="text-4xl font-bold text-center">Add</h1>
        <div className="flex flex-col mb-4">
          <label className="font-semibold text-lg text-gray-800" htmlFor="name">
            Name
          </label>
          <input
            className="border rounded-sm py-2 px-3 mb-3 text-gray-800 focus:border-gray-300 focus:outline-none focus:bg-blue-100"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={details.name}
            onChange={updateDetails}
          />
          <label
            className="font-semibold text-lg text-gray-800"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border rounded-sm py-2 px-3 mb-3 text-gray-800 focus:border-gray-300 focus:outline-none focus:bg-blue-100"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={details.email}
            onChange={updateDetails}
          />
          <label
            className="font-semibold text-lg text-gray-800"
            htmlFor="mobile"
          >
            Mobile no.
          </label>
          <input
            className="border rounded-sm py-2 px-3 mb-3 text-gray-800 focus:border-gray-300 focus:outline-none focus:bg-blue-100"
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Mobile no."
            value={details.mobile}
            onChange={updateDetails}
          />
        </div>
        <div className="flex flex-row">
          <button
            className="px-4 py-1 w-1/3 mr-4 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-800 rounded duration-200 ease-in"
            onClick={handleSubmit}
          >
            Add
          </button>
          <button className="px-4 py-1 w-1/4 text-red-500 border border-red-500  hover:border-red-700 hover:text-red-700 active:text-white active:border-red-500 active:bg-red-500 rounded duration-200 ease-in"
          onClick={()=>navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;

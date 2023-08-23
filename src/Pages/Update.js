import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://zany-turtleneck-yak.cyclic.cloud/";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({ name: "", email: "", mobile: "" });

  useEffect(() => {
    const assignOldValues = async () => {
      axios
        .get("/")
        .then((res) => {
            const oldValues = res.data.data.filter((item) => item._id === id)[0];
            console.log("Old values are : ", oldValues);
            setDetails({
                id: oldValues._id,
                name: oldValues.name,
                email: oldValues.email,
                mobile: oldValues.mobile,
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    assignOldValues();
  }, []);

  const updateDetails = (e) => {
    if (e.target.name === "name")
      setDetails({ ...details, name: e.target.value });
    else if (e.target.name === "email")
      setDetails({ ...details, email: e.target.value });
    else setDetails({ ...details, mobile: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.name || !details.email || !details.mobile) {
      alert("Please fill all the fields");
      return;
    }
    console.log("Updated values are : ",details);
    const respose = await axios.put("/update/"+id, details);
    console.log("Response is : ",respose.data.data);
    setDetails({ name: "", email: "", mobile: "" });
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col w-2/5 p-5 border border-gray-300 rounded m-auto">
        <h1 className="text-4xl font-bold text-center">Update</h1>
        <div className="flex flex-col mb-4">
          {["name", "email", "mobile"].map((field) => (
            <React.Fragment key={field}>
              <label
                className="font-semibold text-lg text-gray-800 capitalize"
                htmlFor={field}
              >
                {field}
              </label>
              <input
                className="border rounded-sm py-2 px-3 mb-3 text-gray-800 focus:border-gray-300 focus:outline-none focus:bg-blue-100"
                type="text"
                name={field}
                id={field}
                placeholder={`Enter ${field}`}
                value={details[field]}
                onChange={updateDetails}
              />
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-row">
          <button
            className="px-4 py-1 w-1/3 mr-4 text-white bg-green-500 hover:bg-green-600 active:bg-green-800 rounded duration-200 ease-in"
            onClick={handleSubmit}
          >
            Update
          </button>
          <button
            className="px-4 py-1 w-1/4 text-red-500 border border-red-500  hover:border-red-700 hover:text-red-700 active:text-white active:border-red-500 active:bg-red-500 rounded duration-200 ease-in"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;

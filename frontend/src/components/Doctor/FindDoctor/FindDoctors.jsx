import React, { useEffect, useState } from "react";
import "./FindDoctor.css";
import { useNavigate } from "react-router-dom";
import FindDoctorBanner from "./FindDoctorBanner";
import { getCategories } from "../../../axios/services/AdminServices";

const FindDoctor = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  
  const fetchData = async () => {
    const data = await getCategories();
    setCategories(data.categoryDetails);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FindDoctorBanner />
      <div className="doc-categories-main">
        {categories.map((item) => {
          return (
            <div
              className="doc-categories"
              onClick={() => navigate(`/view-doctors/${item._id}`)}
            >
              <p>{item.category}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FindDoctor;

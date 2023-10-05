import React from "react";
import Loading from "../Loading";
import useApi from "../../hooks/useApi";

export default function Categoris() {
  let { data, isLoading } = useApi("categories", "categories");
  if (isLoading) return <Loading></Loading>;
  return (
    <div className="container mt-3">
      <div className="row">
        {data?.data.data.map((category) => (
          <div key={category._id} className="text-center col-md-2">
            <img src={category.image} className="w-100 h-50" alt="brand" />
            <p className="fw-bolder">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

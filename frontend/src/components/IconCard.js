import React from "react";
import { Link } from "react-router-dom";

const IconCard = ({ icon }) => (
  <div className="card shadow-sm p-3 rounded-3 text-center">
    {icon.iconName ? (
      <i className={`fas fa-${icon.iconName} fa-3x mb-2`}></i>
    ) : (
      <img src={icon.imageUrl} alt={icon.title} className="img-fluid" />
    )}
    <h5>{icon.title}</h5>
    <p className="text-muted">{icon.expression}</p>
    <Link to={`/icon/${icon.id}`} className="btn btn-primary btn-sm">
      Details
    </Link>
  </div>
);

export default IconCard;

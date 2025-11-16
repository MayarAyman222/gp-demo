import React from "react";
import IconCard from "./IconCard";

const IconGrid = ({ icons }) => (
  <div className="row g-3">
    {icons.map((icon) => (
      <div key={icon.id} className="col-md-3">
        <IconCard icon={icon} />
      </div>
    ))}
  </div>
);

export default IconGrid;

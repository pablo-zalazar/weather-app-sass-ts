import React from "react";
import { nextHoursInterface } from "../../interfaces";

export interface CardInterface {
  values: nextHoursInterface;
}

const Card: React.FC<CardInterface> = ({ values }) => {
  return (
    <div className="card">
      <p>{values.date}</p>
      <div className="icon">
        <p>{values.desc}</p>
        <img
          src={`http://openweathermap.org/img/wn/${values.icon}@2x.png`}
          alt="image"
        />
        <p>{`${Math.round(values.temp)}°C`}</p>
      </div>
    </div>
  );
};

export default Card;

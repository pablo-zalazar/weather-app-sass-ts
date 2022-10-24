import React from "react";
import { nowInterface } from "../../interfaces";
export interface NowInterface {
  values: nowInterface;
}

const Now: React.FC<NowInterface> = ({ values }) => {
  return (
    <div className="now">
      <div className="data">
        <h2>{values.name}</h2>
        <p>{values.date}</p>
        <p>
          Temperatura actual: <span>{Math.ceil(values.temp)}°C</span>
        </p>
        <p>
          Humedad: <span>{values.hum}%</span>
        </p>
      </div>

      <div className="icon">
        <img
          src={`http://openweathermap.org/img/wn/${values.icon}@2x.png`}
          alt="image"
        />
        <p>
          <span>{values.desc}</span>
        </p>
      </div>
    </div>
  );
};

export default Now;

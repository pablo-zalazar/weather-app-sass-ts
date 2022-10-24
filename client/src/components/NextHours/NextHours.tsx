import React from "react";
import { nextHoursInterface } from "../../interfaces";
import { Card } from "../Card";
export interface NextHoursInterface {
  values: nextHoursInterface[];
}

const NextHours: React.FC<NextHoursInterface> = ({ values }) => {
  return (
    <div className="nextHours">
      {values.length > 0 && values.map((d, i) => <Card key={i} values={d} />)}
    </div>
  );
};

export default NextHours;

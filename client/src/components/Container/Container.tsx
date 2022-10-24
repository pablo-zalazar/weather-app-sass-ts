import React, { useEffect, useState } from "react";
import { nextHoursInterface, nowInterface } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import axios from "axios";
import { NextHours } from "../NextHours";
import { Now } from "../Now";
import { actionSearchData } from "../../store/slices/weatherSlice";
import { MoonLoader } from "react-spinners";

export interface ContainerInterface {}

const Container: React.FC<ContainerInterface> = () => {
  const { name, lat, lon } = useAppSelector((state) => state.weather);
  const [now, setNow] = useState<nowInterface>();
  const [nextHours, setNextHours] = useState<nextHoursInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lat && lon) {
      (async () => {
        setLoading(true);
        try {
          const {
            list,
            city: { timezone },
          } = await dispatch(actionSearchData(lat, lon));

          const {
            main: { feels_like: temp, humidity: hum },
            weather,
            dt,
          } = list[0];

          const { description: desc, icon } = weather[0];

          const date = new Date(dt * 1000 + timezone * 1000);
          const day = date.toLocaleDateString();
          const hour =
            date.getHours().toLocaleString().length > 1
              ? date.getHours().toLocaleString()
              : `0${date.getHours().toLocaleString()}`;

          setNow({
            name,
            temp,
            hum,
            icon,
            desc,
            date: `${day} ${hour}h`,
          });

          const arr = list
            .slice(1)
            .map((d: { main: { feels_like: any }; weather: any; dt: any }) => {
              const {
                main: { feels_like: temp },
                weather,
                dt,
              } = d;

              const date = new Date(dt * 1000 + timezone * 1000);
              const day = date.toLocaleDateString();
              const hour =
                date.getHours().toLocaleString().length > 1
                  ? date.getHours().toLocaleString()
                  : `0${date.getHours().toLocaleString()}`;

              const { description: desc, icon } = weather[0];
              return {
                name,
                temp,
                hum,
                icon,
                desc,
                date: `${day} ${hour}h`,
              };
            });

          setNextHours(arr);
        } catch (e) {
          console.log(e);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })();
    }
  }, [lat, lon]);

  return (
    <div className="container">
      {loading ? (
        <div className="loading">
          <MoonLoader color="#000000" />
        </div>
      ) : (
        <div className="content">
          {now && <Now values={now} />}
          {nextHours.length > 0 && <NextHours values={nextHours} />}
        </div>
      )}
    </div>
  );
};

export default Container;

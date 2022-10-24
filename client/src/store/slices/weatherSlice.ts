import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface CounterState {
  name: string;
  lat: number;
  lon: number;
}

const initialState: CounterState = {
  name: "",
  lat: 0,
  lon: 0,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state: CounterState, action: PayloadAction<CounterState>) => {
      return (state = action.payload);
    },
  },
});

export const { setCity } = weatherSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export const actionSetCity = (search: string) => {
  return async function (dispatch: (arg0: { payload: CounterState }) => any) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const URL = `${process.env.REACT_APP_BACKEND_URL}/videos/${search}`;
      const { data } = await axios.get(URL, config);
      if (!data) {
        const { data } = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
        );
        const {
          lat,
          lon,
          name,
          local_names: { en },
        } = data[0];

        const body = { lat, lon, name: en ? en : name };
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/videos`, body);
        await dispatch(setCity(body));
      } else {
        const { lat, lon, name } = data;
        await dispatch(setCity({ lat, lon, name }));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const actionSearchData = (lat: number, lon: number) => {
  return async function () {
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=sp&cnt=4`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  };
};

export default weatherSlice.reducer;

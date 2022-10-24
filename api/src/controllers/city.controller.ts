import { RequestHandler } from "express";
import City from "../models/City";
import { capitalizeName } from "../utils/capitalizeName";

export const getCity: RequestHandler = async (req, res) => {
  const { name } = req.params;
  try {
    const response = await City.findOne({ name: capitalizeName(name) });
    return res.json(response);
  } catch (e) {
    return e;
  }
};

export const postCity: RequestHandler = async (req, res) => {
  const { body } = req;
  const { name, lat, lon } = body;
  try {
    const newCity = new City({ name: name.trim(), lat, lon });
    await newCity.save();
    return res.status(200).json(newCity);
  } catch (e) {
    return e;
  }
};

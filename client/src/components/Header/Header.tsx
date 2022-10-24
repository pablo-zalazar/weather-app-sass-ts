import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { actionSetCity } from "../../store/slices/weatherSlice";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

export interface HeaderInterface {}

const Header: React.FC<HeaderInterface> = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(actionSetCity(search.trim()));
      setSearch("");
    } catch (e) {
      toast.error(`${search} not found`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setSearch("");
  };

  return (
    <header className="header">
      <h1>WeatherApp</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">
          <AiOutlineSearch />
        </button>
      </form>
    </header>
  );
};

export default Header;

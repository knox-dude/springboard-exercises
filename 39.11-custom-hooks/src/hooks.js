import { useState } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

export function useFlip() {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flip = () => {
    setIsFacingUp(oldValue => !oldValue);
  };
  
  // return piece of state AND a function to toggle it
  return [isFacingUp, flip];
}

export function useAxios(url) {
  const [axiosData, setAxiosData] = useState([]);

  const addData = async (customUrl="") => {
    const response = await axios.get(`${url}${customUrl}`);
    setAxiosData(axiosData => [...axiosData, {...response.data, id: uuid()}])
  }

  return [axiosData, addData]
}


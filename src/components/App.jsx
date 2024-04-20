import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

const BASE_URL_API = "https://api.thecatapi.com/v1/images";
const LIMITE_CAT = 5;
const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";
const URL_CAT = `${BASE_URL_API}/search?limit=${LIMITE_CAT}&api_key=${API_KEY}`;

const App = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async (urlrandom) => {
    setLoading(true);
    try {
      const res = await fetch(urlrandom);
      const data = await res.json();
      console.log(data);
      setCats(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getData(URL_CAT);
  }, []);

  const handleButton = () => {
    console.log("button");
    getData(URL_CAT);
  };

  console.log("APP");
  return (
    <div className="bg-gradient-to-r from-blue-800 to-indigo-900   h-screen flex  flex-col justify-center items-center">
      {loading ? (
        <div className="animate-pulse ">
          <div className="m-1 rounded-lg shadow-lg bg-cover bg-center bg-gray-300 h-32 w-32 "></div>
          <div className="m-1 rounded-lg shadow-lg bg-cover bg-center bg-gray-300 h-32 w-32  "></div>
          <div className="m-1 rounded-lg shadow-lg bg-cover bg-center bg-gray-300 h-32 w-32  "></div>
          <div className="m-1 rounded-lg shadow-lg bg-cover bg-center bg-gray-300 h-32 w-32  "></div>
          <div className="m-1 rounded-lg shadow-lg bg-cover bg-center bg-gray-300 h-32 w-32  "></div>
        </div>
      ) : (
        cats.map((cat) => (
          <div key={cat.id} className="m-1">
            <img
              src={cat.url}
              alt={cat.id}
              className="rounded-lg shadow-lg bg-cover bg-center h-32 w-32 hover:scale-125 duration-200"
            />
          </div>
        ))
      )}

      <Button className="mt-3" onClick={() => handleButton()}>
        get Cat
      </Button>
    </div>
  );
};

export default App;

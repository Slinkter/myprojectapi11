import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://api.thecatapi.com/v1/";
const API_KEY =
  "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "X-Custom-Header": "foobar", "x-api-key": `${API_KEY}` },
  timeout: 3000,
});

const App = () => {
  const [cats, setCats] = useState([]);
  const [favoritesCats, setFavoritesCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef(null);

  const loadRandomCat = async () => {
    setLoading(true);
    try {
      const url = "/images/search?limit=3";
      const res = await api.get(url);
      const { data } = res;
      setCats(data);
      // loadFavoriteCat();
      setLoading(false);
      console.log(" data : ", data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const loadFavoriteCat = async () => {
    try {
      const url = "/favourites";
      const res = await api.get(url);
      const { data } = res;
      setFavoritesCats(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleSave = async (cat) => {
    try {
      if (favoritesCats.some((fav) => fav.image.id === cat.id)) {
        console.log("son iguales id");
        return;
      }

      const urlAxios = "/favourites";
      const objAxios = { image_id: cat.id };
      await api.post(urlAxios, objAxios);
      //  setFavoritesCats((prevFavs) => [...prevFavs, { image: { id: cat.id } }]);
      loadFavoriteCat();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleDelete = async (cat) => {
    try {
      const url = `/favourites/${cat.id}`;
      await api.delete(url);
      setFavoritesCats((prevFav) => prevFav.filter((fav) => fav.id !== cat.id));
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const obj = new FormData(formRef.current);
      const url = "/images/upload";
      await api.post(url, obj);
    } catch (error) {
      console.log("Error:", error.message); // Imprime el mensaje de error
      setError(error.message);
    }
  };

  useEffect(() => {
    loadRandomCat();
    loadFavoriteCat();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-screen  flex-col justify-center items-center bg-white">
        <Spinner className="h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white container mx-auto p-3 ">
      <Typography className="mt-6" variant="h2" color="green">
        Gatitos Aletorios
      </Typography>

      <section>
        <article className="grid grid-cols-3 gap-3">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col justify-center items-center m-1 gap-3"
            >
              <img
                src={cat.url}
                alt={cat.id}
                className="h-28 w-28 md:h-56 md:w-56 rounded-full object-cover object-center m-2 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300"
              />
              <Button
                color="green"
                onClick={() => handleSave(cat)}
                disabled={favoritesCats.some((fav) => fav.image.id === cat.id)}
                className="transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                Save Cat
              </Button>
            </div>
          ))}
        </article>
        <button></button>
      </section>

      <Typography className="mt-6" variant="h2" color="red">
        Gatitos Favoritos
      </Typography>

      <section>
        <article className="grid grid-cols-3 gap-5">
          {console.log(favoritesCats)}
          {favoritesCats.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col justify-center items-center m-1 gap-3"
            >
              <img
                src={`${cat.image?.url}`}
                alt={`${cat.image?.id}`}
                className="h-28 w-28 md:h-56 md:w-56 rounded-full object-cover object-center m-2 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300"
              />
              <Button
                color="red"
                onClick={() => handleDelete(cat)}
                className="transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                Delete Cat
              </Button>
            </div>
          ))}
        </article>
      </section>

      {/*  
      
       <Typography className="mt-6" variant="h2" color="blue">
        Cargar Gatitos
      </Typography>
      <section className="h-56 w-full flex justify-center items-center">
        <form
          action=""
          id="uploading"
          ref={formRef}
          onSubmit={(e) => handleUpdate(e)}
        >
          <input type="file" name="photo" />
          <Button color="blue" type="submit">
            Update Cat
          </Button>
        </form>
      </section> */}
    </div>
  );
};

export default App;

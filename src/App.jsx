import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

const App = () => {
  const [cats, setCats] = useState([]);
  const [favoritesCats, setFavoritesCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef(null);

  // axios
  const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
  const BASE_URL = "https://api.thecatapi.com/v1/";
  const API_KEY =
    "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";

  const api = axios.create({
    baseURL: BASE_URL,
    headers: { "X-Custom-Header": "foobar", "x-api-key": `${API_KEY}` },
    timeout: 3000,
  });

  const loadRandomCat = async () => {
    setLoading(true);
    try {
      const url = "/images/search?limit=3";
      const res = await api.get(url);
      const { data } = res;
      //
      setCats(data);
      loadFavoriteCat();
      setLoading(false);
      console.log(" data : ", data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const loadFavoriteCat = async () => {
    try {
      const url = "/favourites";
      const res = await api.get(url);
      const { data } = res;
      setFavoritesCats(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleSave = async (cat) => {
    console.log("handleSave");
    console.log(cat);
    try {
      const urlAxios = "/favourites";
      const objAxios = { image_id: cat.id };

      const resAxios = await api.post(urlAxios, objAxios);
      const { data, status } = resAxios;
      console.log(data);
      console.log(status);
      loadFavoriteCat();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleDelete = async (cat) => {
    try {
      const url = `/favourites/${cat.id}`;
      const res = await api.delete(url);
      const { data, status } = res;
      //
      setFavoritesCats((prevFav) => prevFav.filter((fav) => fav.id !== cat.id));
      console.log(data);
      console.log(status);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const obj = new FormData(formRef.current);
      const url = `/images/upload`;
      const res = await api.post(url, obj);
      //
      const { data, status } = res;
      console.log(data);
      console.log(status);
      loadRandomCat();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    loadRandomCat();
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
              className="flex flex-col justify-center items-center m-1"
            >
              <img
                src={cat.url}
                alt={cat.id}
                className="h-28 w-28 md:h-56 md:w-56 rounded-full object-cover object-center m-2"
              />
              <Button color="green" onClick={() => handleSave(cat)}>
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
              className="flex flex-col justify-center items-center m-1"
            >
              <img
                src={`${cat.image?.url}`}
                alt={`${cat.image?.id}`}
                className="h-28 w-28  md:h-56 md:w-56  rounded-full object-cover object-center m-2"
              />
              <Button color="red" onClick={() => handleDelete(cat)}>
                Delete Cat
              </Button>
            </div>
          ))}
        </article>
      </section>

      <Typography className="mt-6" variant="h2" color="blue">
        Cargar Gatitos
      </Typography>

      <section className="h-56 w-full flex justify-center items-center">
        <form action="" id="uploading" ref={formRef} onSubmit={handleUpdate}>
          <input type="file" name="photo" />
          <Button color="blue" type="submit">
            Update Cat
          </Button>
        </form>
      </section>
    </div>
  );
};

export default App;

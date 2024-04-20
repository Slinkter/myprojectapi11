import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [cats, setCats] = useState([]);
  const [favoritesCats, setFavoritesCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef(null);

  // axios
  const API_KEY =
    "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";
  const BASE_URL = "https://api.thecatapi.com/v1/";

  const api = axios.create({
    baseURL: BASE_URL,
    headers: { "X-Custom-Header": "foobar", "x-api-key": `${API_KEY}` },
    timeout: 1000,
  });

  const loadRandomCat = async () => {
    setLoading(true);
    try {
      const url = "/images/search?limit=3";
      const res = await api.get(url);
      const { data, status } = res;
      loadFavoriteCat();
      setCats(data);
      setLoading(false);
      console.log(data);
      console.log(status);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const loadFavoriteCat = async () => {
    try {
      const url = "/favourites";
      const res = await api.get(url);
      const { data, status } = res;
      setFavoritesCats(data);
      console.log(data);
      console.log(status);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleSave = async (cat) => {
    try {
      const urlAxios = "/favourites";
      const objAxios = { image_id: cat.id };
      // exec axios
      const resAxios = await api.post(urlAxios, objAxios);
      // return data
      const { data, status } = resAxios;
      console.log(data);
      console.log(status);
      loadRandomCat();
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
      console.log(data);
      console.log(status);
      loadRandomCat();
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
    return <h1>Cargando...</h1>;
  }

  return (
    <div>
      <h2>Gatitos Aletorios</h2>
      <section>
        <article>
          {cats.map((cat) => (
            <div key={cat.id}>
              <img src={cat.url} alt={cat.id} />
              <button onClick={() => handleSave(cat)}>Save Cat</button>
            </div>
          ))}
        </article>
        <button></button>
      </section>
      <h2>Gatitos Favoritos</h2>
      <section>
        {favoritesCats.map((cat) => (
          <div key={cat.id}>
            <img src={`${cat.image.url}`} alt={`${cat.image.id}`} />
            <button onClick={() => handleDelete(cat)}>Delete Cat</button>
          </div>
        ))}
      </section>
      <h2>Cargar Gatitos</h2>
      <section>
        <form action="" id="uploading" ref={formRef} onSubmit={handleUpdate}>
          <input type="file" name="photo" />
          <button type="submit">Update Cat</button>
        </form>
      </section>
    </div>
  );
};

export default App;

import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Button, Spinner, Typography } from "@material-tailwind/react";

const BASE_URL = "https://api.thecatapi.com/v1/";
const API_KEY =
    "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "X-Custom-Header": "foobar", "x-api-key": API_KEY },
    timeout: 3000,
});

// Función genérica para manejar peticiones
const fetchData = async (method, url, data = null) => {
    try {
        const res = await api[method](url, data);
        return res.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        throw error;
    }
};

// Componente reutilizable para mostrar gatos
const CatCard = ({ cat, onAction, actionLabel, actionColor, disabled }) => (
    <div className="flex flex-col justify-center items-center m-1 gap-3">
        <img
            src={cat.url || cat.image?.url}
            alt={cat.id || cat.image?.id}
            className="h-28 w-28 md:h-56 md:w-56 rounded-full object-cover object-center m-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        />
        <Button
            className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
            color={actionColor}
            onClick={() => onAction(cat)}
            disabled={disabled}
        >
            {actionLabel}
        </Button>
    </div>
);

const App = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cats, setCats] = useState([]);
    const [favoritesCats, setFavoritesCats] = useState([]);

    const getCatsRandom = async () => {
        setLoading(true);
        try {
            const data = await fetchData("get", "/images/search?limit=3");
            setCats(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadFavoriteCats = async () => {
        try {
            const data = await fetchData("get", "/favourites");
            setFavoritesCats(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSave = async (cat) => {
        if (favoritesCats.some((fav) => fav.image.id === cat.id)) return;
        try {
            await fetchData("post", "/favourites", { image_id: cat.id });
            loadFavoriteCats();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (cat) => {
        try {
            await fetchData("delete", `/favourites/${cat.id}`);
            setFavoritesCats((prevFavs) =>
                prevFavs.filter((fav) => fav.id !== cat.id)
            );
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        getCatsRandom();
        loadFavoriteCats();
    }, []);

    if (loading) {
        return (
            <div className="flex w-full h-screen flex-col justify-center items-center bg-white">
                <Spinner className="h-16 w-16" />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center bg-white container mx-auto p-3">
            <Typography className="mt-6" variant="h2" color="green">
                Gatitos Aleatorios
            </Typography>

            <section>
                <article className="grid grid-cols-3 gap-3">
                    {cats.map((cat) => (
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            onAction={() => handleSave(cat)}
                            actionLabel="Save"
                            actionColor="green"
                            disabled={favoritesCats.some(
                                (fav) => fav.image.id === cat.id
                            )}
                        />
                    ))}
                </article>
            </section>

            <Typography className="mt-6" variant="h2" color="red">
                Gatitos Favoritos
            </Typography>

            <section>
                <article className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {favoritesCats.map((cat) => (
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            onAction={() => handleDelete(cat)}
                            actionLabel="Delete"
                            actionColor="red"
                            disabled={false}
                        />
                    ))}
                </article>
            </section>
        </div>
    );
};

CatCard.propTypes = {
    cat: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired, // Puede ser string o number
        url: PropTypes.string,
        image: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            url: PropTypes.string,
        }),
    }).isRequired,
    onAction: PropTypes.func.isRequired,
    actionLabel: PropTypes.string.isRequired,
    actionColor: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default App;

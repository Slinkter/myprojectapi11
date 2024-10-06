import { useEffect } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCat,
    fetchCatsFav,
    fetchCatsRandom,
    saveCat,
} from "./redux/catsSlice";

import CatCard from "./components/CatCard";

const App = () => {
    window.document.title = "Projecto 11 - Luis J Cueva ";
    const dispatch = useDispatch();
    const { cats, favorites, loading } = useSelector((state) => state.cats);

    useEffect(() => {
        dispatch(fetchCatsRandom());
        dispatch(fetchCatsFav());
    }, [dispatch]);

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
                            onAction={() => dispatch(saveCat(cat))}
                            actionLabel="Save"
                            actionColor="green"
                            disabled={favorites.some(
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
                <article className="grid grid-cols-3 md:grid-cols-3 gap-5">
                    {favorites.map((cat) => (
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            onAction={() => dispatch(deleteCat(cat))}
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

export default App;

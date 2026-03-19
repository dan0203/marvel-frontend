// Modules internes
import './Comics.css';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';

const Comics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données de tous les comics
                const response = await axios.get(import.meta.env.VITE_API_URL + '/comics');

                setComics(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return isLoading ? (
        <p>Chargement en cours...</p>
    ) : (
        <main>
            {comics.results.map(comic => {
                return (
                    <article key={comic._id}>
                        <img src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`} alt={comic.title} />
                        <p className="title">{comic.title}</p>
                        <p className="description">{comic.description}</p>
                    </article>
                );
            })}
        </main>
    );
};

export default Comics;

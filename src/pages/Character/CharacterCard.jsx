// Modules internes
import './CharacterCard.css';
import ComicCard from '../Comics/ComicCard';
import Button from '../../components/Button/Button';
// Modules react
import { useState } from 'react';
// Modules yarn
import Cookies from 'js-cookie';
import { Link } from 'react-router';

const CharacterCard = ({ character }) => {
    const [favorites, setFavorites] = useState(JSON.parse(Cookies.get('characters_favorites')));

    return (
        <>
            <article className="character-card">
                {/* <Button
                    text="COEUR"
                    onClickFunc={() => {
                        // Ajouter le nouveau favori
                        if (!favorites.includes(character._id)) {
                            const copyFavorites = [...favorites];
                            copyFavorites.push(character._id);
                            setFavorites(copyFavorites);
                            Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
                        }
                    }}
                /> */}

                <Link to={`/character/${character._id}`}>
                    <h2>{character.name}</h2>
                    <div className="content">
                        <img src={character.thumbnail.path ? `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}` : '../../images/default.jpg'} alt={character.name} />
                        <p>{character.description || 'N/A'}</p>
                    </div>
                    {character.comics.show &&
                        character.comics.map(comic => {
                            return <ComicCard key={comic._id} comic={comic} />;
                        })}
                </Link>
            </article>
        </>
    );
};

export default CharacterCard;

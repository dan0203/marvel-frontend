// Modules internes
import './CharacterCard.css';
import defaultImage from '../../assets/images/default.jpg';
import Button from '../../components/Button/Button';
// Modules yarn
import { Link } from 'react-router';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

const CharacterCard = ({ character, favoriteCharacters, addToFavorites, removeFromFavorites }) => {
    return (
        <>
            <article className="card card-animation">
                <Button
                    text={favoriteCharacters && favoriteCharacters.includes(character._id) ? <FaHeart /> : <FaRegHeart />}
                    className="add-to-favorite"
                    onClickFunc={() => {
                        if (!favoriteCharacters.includes(character._id)) {
                            // Ajouter le nouveau favori
                            addToFavorites(favoriteCharacters, character._id, 'characters');
                        } else {
                            // Retirer le nouveau favori
                            removeFromFavorites(favoriteCharacters, character._id, 'characters');
                        }
                    }}
                />

                <Link to={`/character/${character._id}`}>
                    <h3>{character.name}</h3>
                    <div className="content">
                        <img src={character.thumbnail.path ? `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}` : defaultImage} alt={character.name} onError={e => (e.target.src = defaultImage)} />
                        <p>{character.description || 'N/A'}</p>
                    </div>
                </Link>
            </article>
        </>
    );
};

export default CharacterCard;

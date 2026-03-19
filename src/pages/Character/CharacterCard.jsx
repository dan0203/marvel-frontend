// Modules internes
import './Character.css';
import ComicCard from '../Comics/ComicCard';

const CharacterCard = ({ character }) => {
    return (
        <article>
            <img src={character.thumbnail.path ? `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}` : '../../images/default.jpg'} alt={character.name} />
            <p className="name">{character.name}</p>
            <p className="description">{character.description}</p>
            {character.comics.show &&
                character.comics.map(comic => {
                    return <ComicCard key={comic._id} comic={comic} />;
                })}
            ;
        </article>
    );
};

export default CharacterCard;

// Modules internes
import './ComicCard.css';

const ComicCard = ({ comic }) => {
    return (
        <article>
            <img src={comic.thumbnail.path ? `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}` : '../../images/default.jpg'} alt={comic.title} />
            <p className="title">{comic.title}</p>
            <p className="description">{comic.description}</p>
        </article>
    );
};

export default ComicCard;

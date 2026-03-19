// Modules internes
import './Limit.css';

const Limit = ({ limit, setLimit, setCurrentPage }) => {
    return (
        <div className="limit">
            <span>Afficher</span>
            <select
                name="limit"
                value={limit}
                onChange={event => {
                    setLimit(Number(event.target.value));
                    setCurrentPage(1);
                }}
            >
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="80">80</option>
                <option value="100">100</option>
            </select>
            <span>personnages par page</span>
        </div>
    );
};

export default Limit;

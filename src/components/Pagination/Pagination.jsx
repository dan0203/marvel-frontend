// Modules internes
import './Pagination.css';
import Button from '../Button/Button';

const Pagination = ({ setCurrentPage, currentPage, numberOfPages }) => {
    // Construction du tableau de boutons à afficher pour la pagination
    // On aura toujours au moins un bouton
    const pages = [1];

    if (numberOfPages <= 5) {
        // si numberOfPages <= 5, afficher tout
        for (let i = 2; i <= numberOfPages; i++) {
            pages.push(i);
        }
    } else if (currentPage <= 3) {
        // si currentPage <= 3 et numberOfPages > 5, afficher 1 2 3 ... lastPage
        pages.push(2);
        pages.push(3);
        pages.push('...');
        pages.push(numberOfPages);
    } else if (currentPage >= numberOfPages - 2) {
        // si currentPage >= numberOfPages - 2 et numberOfPages > 5, afficher 1 ... lastPage-2 lastPage-1 lastPage
        pages.push('...');
        pages.push(numberOfPages - 2);
        pages.push(numberOfPages - 1);
        pages.push(numberOfPages);
    } else {
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(numberOfPages);
    }

    return (
        <div className="pagination">
            <Button
                text="&lt;"
                onClickFunc={() => {
                    setCurrentPage(currentPage - 1);
                }}
                disabled={!(currentPage > 1)}
            />

            {pages.map((page, index) => (page === '...' ? <span key={index}>...</span> : <Button key={index} text={page} className={currentPage === page ? 'active' : ''} onClickFunc={() => setCurrentPage(page)} />))}

            <Button
                text="&gt;"
                onClickFunc={() => {
                    setCurrentPage(currentPage + 1);
                }}
                disabled={!(currentPage < pages[pages.length - 1])}
            />
        </div>
    );
};

export default Pagination;

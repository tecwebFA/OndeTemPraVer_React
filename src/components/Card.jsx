import notFoundImage from '../images/image-not-found.png';

function Card({card, showCardDetails}) {

    function handleDetailsClick() {
        showCardDetails(card.imdbID);
    }


    return (
        <div className="card">
            <img className="card__image" src={card.Poster === 'N/A' ? notFoundImage : card.Poster} alt={card.Title}/>
            <h2 className="card__title">{card.Title}</h2>
            <a href="#" className="card__details link" onClick={handleDetailsClick}>Mostrar Detalhes</a>
        </div>
    )
}

export default Card;
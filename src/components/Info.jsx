import imdbIcon from "../images/imdb-icon.svg";
import {Link} from "react-router-dom";
import notFoundImage from '../images/image-not-found.png';


function Info(props) {

    return (
        <div className="info">
            <Link to="/cards" className="link info__return">Voltar</Link>
            <div className="info__content">
                <img className="info__image" src={props.data.Poster === 'N/A' ? notFoundImage : props.data.Poster}
                     alt={props.data.Title}/>
                <div className="info__wrapper">
                    <h2 className="info__title">{props.data.Title}</h2>
                    <div className="info__stickers">
                        <div className="info__container">
                            <p className="info__text">{props.data.Year}</p>
                        </div>
                        <div className="info__container">
                            <p className="info__text">{props.data.Genre === 'N/A' ? '' : props.data.Genre}</p>
                        </div>
                        {props.data.Runtime === 'N/A' ? null :
                            <div className="info__container">
                                <p className="info__text">{props.data.Runtime}</p>
                            </div>}

                    </div>
                    {
                        props.rating ?
                            <div className="info__rating">
                                <img className="info__icon" src={imdbIcon} alt="imdb icon"/>
                                <p className="info__rating-number">{props.rating}</p>
                            </div> : ''
                    }
                    <p className="info__description">{props.data.Plot === 'N/A' ? '' : props.data.Plot}</p>
                    <p className="info__actors"><span className="accent">Actors: </span>
                        {props.data.Actors}</p>
                </div>
            </div>
        </div>
    )
}

export default Info;
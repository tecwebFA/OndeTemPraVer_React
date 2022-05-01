import Card from "./Card";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Cards({cards, showCardDetails}) {

    const navigate = useNavigate();

    useEffect(() => {
        if (cards === null) {
            navigate('/');
        }
    }, []);

    return (
        <>
            { cards &&
                cards.map((card) => (
                    <Card card={card} showCardDetails={showCardDetails} key={card.imdbID}/>
                ))
            }
        </>
    )
}

export default Cards;
import Info from "./Info";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import SearchForm from "./SearchForm";
import {useNavigate} from "react-router-dom";
import NotFound from "./NotFound";
import Error from "./Error";
import Cards from "./Cards";

function Main() {

    useEffect(() => {

        if (sessionStorage.getItem('cards')) {
            let cardsFromStorage = JSON.parse(sessionStorage.getItem('cards'));
            setCards(cardsFromStorage);
        } else {
            navigate('/');
        }

    }, []);

    const [inputValue, setInputValue] = useState('');

    const [cards, setCards] = useState(JSON.parse(sessionStorage.getItem('cards')) ?
        JSON.parse(sessionStorage.getItem('cards')) : null);

    const [currentCard, setCurrentCard] = useState(JSON.parse(sessionStorage.getItem('currentCard')) ?
        JSON.parse(sessionStorage.getItem('currentCard')) : null);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [filmRating, setFilmRating] = useState('');
    const apiKey = 'apikey=ed063e77';

    function handleApiError(err) {
        console.log('Запрос не выполнен: ', err);
    }

    function search(e) {
        e.preventDefault();

        navigate("/");

        setIsLoading(true);

        return fetch(`https://www.omdbapi.com/?s=${inputValue}&plot=full&`+apiKey)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((res) => {
                if (res.Error) {
                    navigate("/not-found");
                } else {
                    setCards(res.Search);

                    sessionStorage.setItem('cards', JSON.stringify(res.Search));

                    navigate("/cards");
                }

            })
            .catch((err) => {
                handleApiError(err);
                navigate("/error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function showCardDetails(filmId) {

        navigate("/");

        setIsLoading(true);

        return fetch(`https://www.omdbapi.com/?i=${filmId}&plot=full&`+apiKey)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((res) => {

                sessionStorage.setItem('currentCard', JSON.stringify(res));

                setCurrentCard(res);

                res.Ratings.forEach((rating) => {
                    if (rating.Source === 'Internet Movie Database') {
                        setFilmRating(rating.Value);
                    }
                })

                navigate("/info");
            })
            .catch((err) => {
                handleApiError(err);
                navigate("/error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <main className="main">
            <SearchForm handleChange={setInputValue} handleSubmit={search}/>
            <div className="main__content">
                {isLoading ? <div className="loader">
                </div> : ''}
                <Routes>
                    <Route path="/" element={null}/>
                    <Route path="/cards" element={<Cards cards={cards} showCardDetails={showCardDetails}/>}/>
                    <Route path="/info" element={currentCard && <Info data={currentCard} rating={filmRating}/>}/>
                    <Route path="not-found" element={<NotFound/>}/>
                    <Route path="error" element={<Error/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </div>
        </main>
    )
}

export default Main;
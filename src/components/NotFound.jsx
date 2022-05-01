import notFoundImg from '../images/not-found.svg';

function NotFound() {
    return (
        <div className="not-found">
            <img src={notFoundImg} alt="information not found" />
                <h2 className="not-found__text">Sorry, information not found</h2>
        </div>
)
}

export default NotFound;
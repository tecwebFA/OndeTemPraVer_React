import errorImg from '../images/error.svg';

function Error() {
    return(
        <div className="error">
            <img src={errorImg} alt="error icon"/>
            <h2 className="error__text" >Error 404. Please try again</h2>
        </div>
    )
}

export default Error;
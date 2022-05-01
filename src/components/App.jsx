import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import '../App.css';
import ErrorBoundary from "./ErrorBoundary";

function App() {

    return (
        <ErrorBoundary>
            <Header/>
            <Main/>
            <Footer/>
        </ErrorBoundary>
    );
}

export default App;

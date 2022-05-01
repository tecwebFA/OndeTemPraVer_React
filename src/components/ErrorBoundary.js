import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Error from "./Error";
import SearchForm from "./SearchForm";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
            <>
                <Header />
                <SearchForm />
                    <Error/>
                <Footer/>
            </>

            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
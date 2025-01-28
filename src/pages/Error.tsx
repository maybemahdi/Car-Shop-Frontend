import { ScrollRestoration } from "react-router-dom";
import ErrorPage from "../components/Pages/Error/ErrorPage";


const Error = () => {
    return (
        <div>
            <ErrorPage />
            <ScrollRestoration />
        </div>
    );
};

export default Error;
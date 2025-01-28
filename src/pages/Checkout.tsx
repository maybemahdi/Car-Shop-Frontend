import { ScrollRestoration } from "react-router-dom";
import CheckoutPage from "../components/Pages/Checkout/CheckoutPage";


const Checkout = () => {
    return (
        <div>
            <CheckoutPage />
            <ScrollRestoration />
        </div>
    );
};

export default Checkout;
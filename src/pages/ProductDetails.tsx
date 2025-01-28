import { ScrollRestoration } from "react-router-dom";
import ProductDetailsPage from "../components/Pages/ProductDetailsPage/ProductDetailsPage";

const ProductDetails = () => {
  return (
    <div>
      <ProductDetailsPage />
      <ScrollRestoration />
    </div>
  );
};

export default ProductDetails;

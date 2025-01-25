import { ScrollRestoration } from "react-router-dom";
import ShopPage from "../components/Pages/Shop/ShopPage";

const Shop = () => {
  return (
    <div>
      <ShopPage />
      <ScrollRestoration />
    </div>
  );
};

export default Shop;

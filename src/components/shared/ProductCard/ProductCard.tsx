import { motion } from "framer-motion";
import Button from "../Button/Button";
import { ICar } from "../../../types/car.interface";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";

const ProductCard = ({ car }: { car: ICar }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <div
          className={cn(
            "absolute top-2 left-2 text-white text-xs font-semibold py-1 px-2 rounded",
            {
              "bg-green-500": car.inStock,
              "bg-rose-500": !car.inStock,
            }
          )}
        >
          {car.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <img
          src={
            car.image ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={car.brand || "Product Image"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-2">
          <span className="text-primary">{car.model}</span>
        </h3>
        <p className="text-sm font-semibold mb-2">Model: {car.model}</p>
        <p className="text-sm font-semibold mb-2">Brand: {car.brand}</p>
        <p className="text-sm font-semibold mb-2">Category: {car.category}</p>
        <p className="text-sm text-primary font-semibold mb-2">
          Price: ${car.price}
        </p>
        {/* Add to Cart button */}
        <div className="flex justify-end items-center">
          <Button
            text={"View Details"}
            handleClick={() => {
              navigate(`/car/${car._id}`);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

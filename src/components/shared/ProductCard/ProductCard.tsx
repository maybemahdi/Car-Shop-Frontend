import { motion } from "framer-motion";
import { ICar } from "../../../data/carData";

const ProductCard = ({ product }: { product: ICar }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative h-48">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600">${product.price.toLocaleString()}</p>
    </div>
  </motion.div>
);

export default ProductCard;

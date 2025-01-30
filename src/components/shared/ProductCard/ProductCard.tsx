/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import Button from "../Button/Button";
import { ICar } from "../../../types/car.interface";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { useDeleteCarMutation } from "../../../redux/features/car/car.api";
import { toast } from "sonner";

const ProductCard = ({ car, isAdmin }: { car: ICar; isAdmin?: boolean }) => {
  const navigate = useNavigate();
  const [deleteCar] = useDeleteCarMutation();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting Test");
    try {
      const result = await deleteCar(car?._id).unwrap();
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (error: any) {
      if (error?.status === 401) {
        toast.error(error?.data?.message, { id: toastId });
        return;
      }
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

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
        {/* View Details button */}
        <div className="flex justify-end items-center">
          {!isAdmin && (
            <Button
              text={"View Details"}
              handleClick={() => {
                navigate(`/car/${car._id}`);
              }}
            />
          )}
        </div>
        {isAdmin && (
          <div className="flex items-center gap-3">
            <Button
              text={"Edit Car"}
              handleClick={() => {
                navigate(`/dashboard/edit-car/${car._id}`);
              }}
            />
            <Button text={"Delete Car"} handleClick={handleDelete} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;

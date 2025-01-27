import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../../redux/features/car/car.api";
import Loading from "../../shared/Loading/Loading";
import Button from "../../shared/Button/Button";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetSingleCarQuery(id);

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError || !response) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong. Please refresh and try again.
      </h3>
    );
  }

  // Car data from the response
  const car = response?.data;

  if (!car) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Car not found!
      </h3>
    );
  }

  return (
    <div className="max-w-5xl mt-32 md:mt-48 mb-16 md:mb-24 w-[90%] md:w-[88%] mx-auto flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div>
          <img
            src={car.image || "/placeholder.jpg"} // Assuming `car.image` contains the image URL
            alt={`${car.brand} ${car.model}`}
            className="w-full h-64 md:h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-primary text-2xl md:text-3xl font-bold">
            {car.brand} {car.model}
          </h3>
          <p>{car.description}</p>
          <div className="flex flex-col text-sm gap-1">
            <p>
              <span className="font-semibold">Brand:</span> {car.brand}
            </p>
            <p>
              <span className="font-semibold">Model:</span> {car.model}
            </p>
            <p>
              <span className="font-semibold">Year:</span> {car.year}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {car.category}
            </p>
            <p>
              <span className="font-semibold">Price:</span> $
              {car.price.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {car.description}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {car.quantity}
            </p>
            <p>
              <span className="font-semibold">In Stock:</span>{" "}
              {car.inStock ? "Yes" : "No"}
            </p>
          </div>
          <Button text="Buy Now" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

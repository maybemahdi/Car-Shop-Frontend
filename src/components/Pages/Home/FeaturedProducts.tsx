import { Link } from "react-router-dom";
import Button from "../../shared/Button/Button";
import SectionHead from "../../shared/SectionHead/SectionHead";
import ProductCard from "../../shared/ProductCard/ProductCard";
import { ICar } from "../../../types/car.interface";
import { useGetAllCarsQuery } from "../../../redux/features/car/car.api";
import Loading from "../../shared/Loading/Loading";

export const FeaturedProducts = () => {
  const queryParams = [{ name: "limit", value: 8 }];
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllCarsQuery(queryParams);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Broh! Refresh and try again
      </h3>
    );
  }
  const cars = response?.data;
  return (
    <section className="my-8 md:my-16 bg-gray-100">
      <div className="w-[90%] md:w-[88%] mx-auto">
        <SectionHead
          heading="Featured Cars"
          description="Check out our latest featured cars"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((product: ICar, index: number) => (
            <ProductCard key={index} car={product} />
          ))}
        </div>
        <div className="text-center mt-5 flex justify-end">
          <Link to="/shop">
            <Button text="View All Cars" />
          </Link>
        </div>
      </div>
    </section>
  );
};

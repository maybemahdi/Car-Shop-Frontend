const Banner = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pt-[100px]">
      {/* Content Container */}
      <div className="w-[90%] md:w-[88%] mx-auto lg:mt-20 mt-10">
        {/* Logo and Text Content */}
        <div className="max-w-2xl flex flex-col gap-8">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl font-bold leading-tight">
              Your Favorite
              <br />
              <span className="text-7xl text-primary">CarZ</span>
              <span className="text-sm text-grey-600 font-normal">
                {" "}
                Right Here
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-gray-300 max-w-xl">
              Discover the best cars in the market, tailored to meet all your
              needs and preferences. Experience the thrill of driving with our
              top-notch selection, ensuring quality and performance. Join us on
              a journey to find your perfect ride.
            </p>
          </div>
        </div>
      </div>

      {/* Car Images */}
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 gap-4 pr-4">
        <div className="w-72 h-72 rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Car tail light"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-72 h-72 rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="White sports car"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Red Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="bg-red-600 h-32 transform -skew-y-6 translate-y-20"></div>
      </div>
    </div>
  );
};

export default Banner;

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-main ml-3"></div>
    </div>
  );
};

export default Loading;

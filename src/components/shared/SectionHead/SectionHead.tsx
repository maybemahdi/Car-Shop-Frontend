interface IProps {
  heading: string;
  description?: string;
}

const SectionHead = ({ heading, description }: IProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-3 mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
        {heading}
      </h2>
      <p className="text-gray-800 font-normal text-center w-3/4 mx-auto">
        {description}
      </p>
    </div>
  );
};

export default SectionHead;

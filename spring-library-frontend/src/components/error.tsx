interface ErrorProps {
  title: string;
  description: string;
}

const ErrorComponent = ({ title, description }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-[6rem] sm:text-[8rem] lg:text-[10rem] font-space-grotesk font-bold leading-none">
        <span className="text-yellow-400">404</span>
      </h1>
      <p className="text-xl sm:text-2xl font-medium text-gray-700 mt-2">
        {title}
      </p>
      <p className="text-sm text-gray-500 mt-1 max-w-md">{description}</p>
    </div>
  );
};

export default ErrorComponent;

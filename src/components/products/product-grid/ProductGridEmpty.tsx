export const ProductGridEmpty = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col md:min-h-[30vh] items-center justify-center mt-8 p-6 max-w-xl mx-auto border-2 border-dashed rounded-lg">
      <div className="flex flex-col items-center text-center space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-md">{description}</p>
      </div>
    </div>
  );
};

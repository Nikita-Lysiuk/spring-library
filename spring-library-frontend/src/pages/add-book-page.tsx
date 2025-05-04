import { AddBookForm } from '@/components';

const AddBookPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col">
      <header className="flex justify-start items-center mb-4 px-8 py-12 border-b-2 bg-white">
        <h1 className="text-4xl">
          <span className="font-semibold">Add New</span>
          <span className="font-light"> Book</span>
        </h1>
      </header>

      <section className="mx-auto container px-8 py-6">
        <div className="flex justify-center bg-white shadow-md rounded-lg">
          <AddBookForm />
        </div>
      </section>
    </div>
  );
};

export default AddBookPage;

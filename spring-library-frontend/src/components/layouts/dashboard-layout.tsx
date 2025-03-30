import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-yellow-600 text-white p-4">
        <h1 className="text-2xl">My Application</h1>
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <footer className="bg-red-800 text-white p-4 text-center">
        &copy; 2023 My Application
      </footer>
    </div>
  );
};

export default DashboardLayout;

import { RouterProvider } from 'react-router';
import router from './routes';
import { ModalProvider } from './components/providers';

const App = () => {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  );
};

export default App;

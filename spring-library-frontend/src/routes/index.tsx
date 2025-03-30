import { MainLayout } from '@/components/layouts';
import { MainPage } from '@/pages';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<MainPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Route>
  )
);

export default router;

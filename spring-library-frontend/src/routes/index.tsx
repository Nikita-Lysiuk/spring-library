import { DashboardLayout, MainLayout } from '@/components/layouts';
import {
  MainPage,
  OAuthRedirectPage,
  ProfilePage,
  ResetPasswordPage,
} from '@/pages';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';
import Protected from './protected';
import isAuthenticated from './helpers';
import SignRedirect from './sign-redirect';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route
          path="sign-in"
          element={<SignRedirect redirectTo="signIn" />}
          loader={() => isAuthenticated()}
        />
        <Route
          path="sign-up"
          element={<SignRedirect redirectTo="signUp" />}
          loader={() => isAuthenticated()}
        />
        <Route
          path="forgot-password"
          element={<SignRedirect redirectTo="forgotPassword" />}
          loader={() => isAuthenticated()}
        />
        <Route path="/oauth2-redirect" element={<OAuthRedirectPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Dashboard routes can be added here */}
      <Route path="/dashboard" element={<Protected />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<div>My Library</div>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="store" element={<div>Store</div>} />
          <Route path="recommendations" element={<div>Recommendations</div>} />
          <Route path="download-pdf" element={<div>Download PDF</div>} />
        </Route>
      </Route>
    </>
  )
);

export default router;

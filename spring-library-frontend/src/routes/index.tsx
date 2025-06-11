import { BookLayout, DashboardLayout, MainLayout } from '@/components/layouts';
import {
  AddBookPage,
  BookPage,
  LibraryPage,
  MainPage,
  OAuthRedirectPage,
  ProfilePage,
  ResetPasswordPage,
  StorePage,
  TwoFApage,
} from '@/pages';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';
import Protected from './protected';
import isAuthenticated from './helpers';
import SignRedirect from './sign-redirect';
import AdminProtected from './admin-protected';
import CheckoutStatus from '@/pages/checkout-status';

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
        <Route path="2fa" element={<TwoFApage />} />
        <Route path="/checkout" element={<CheckoutStatus />} />
      </Route>

      {/* Dashboard routes can be added here */}
      <Route path="/dashboard" element={<Protected />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<LibraryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route element={<BookLayout />}>
            <Route path="books" element={<StorePage />} />
          </Route>
          <Route path="books/:bookId" element={<BookPage />} />
          <Route path="recommendations" element={<div>Recommendations</div>} />
          <Route path="download-pdf" element={<div>Download PDF</div>} />

          <Route element={<AdminProtected />}>
            <Route path="add-book" element={<AddBookPage />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

export default router;

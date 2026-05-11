import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import CartProvider from './context/CartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import OrderContext from './context/OrderContext';
import useVisitorTracker from './hooks/useVisitorTracker.js';
import Layout from "./Layout";

// ✅ Lazy load — সব page/component আলাদা chunk এ লোড হবে
const Home               = lazy(() => import("./pages/Home"));
const ProductDetails     = lazy(() => import("./pages/ProductDetails"));
const Cart               = lazy(() => import("./pages/Cart"));
const Categories         = lazy(() => import("./components/Categories"));
const TrendingProducts   = lazy(() => import("./components/TrendingProducts"));
const Profile            = lazy(() => import("./components/Profile"));
const Login              = lazy(() => import("./pages/Login"));
const Register           = lazy(() => import("./pages/Register"));
const Checkout           = lazy(() => import("./components/Checkout"));
const EditProfile        = lazy(() => import("./components/profile/EditProfile"));
const ProductReviews     = lazy(() => import("./components/ProductReviews"));
const Contact            = lazy(() => import("./components/Contact"));
const AddressBook        = lazy(() => import("./components/profile/AddressBook"));
const Messages           = lazy(() => import("./components/Message"));
const MyOrders           = lazy(() => import("./components/profile/MyOrders"));
const OrderSuccess       = lazy(() => import("./components/OrderSuccess"));
const RelatedPage        = lazy(() => import("./components/relatedProducts/RelatedPage"));
const Payment            = lazy(() => import("./sslpayments/Payment"));
const PaymentError       = lazy(() => import("./sslpayments/PaymentError"));
const PrivacyPolicy      = lazy(() => import("./components/privacypolicy/PrivacyPolicy"));
const RefundPolicy       = lazy(() => import("./components/privacypolicy/RefundPolicy"));
const FAQS               = lazy(() => import("./components/privacypolicy/FAQPage"));
const Terms              = lazy(() => import("./components/privacypolicy/TermsAndConditions"));




// ✅ QueryClient — aggressive caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,       // 10 মিনিট cache
      gcTime: 1000 * 60 * 60,           // 1 ঘণ্টা memory তে রাখো
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

// ✅ Loading spinner
function PageLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
    </div>
  );
}

function TrackerWrapper() {
  useVisitorTracker();
  return null;
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <TrackerWrapper />
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route element={<Layout />}>

                  {/* Public Routes */}
                  <Route path="/"                        element={<Home />} />
                  <Route path="/categories"              element={<Categories />} />
                  <Route path="/trendingproducts"        element={<TrendingProducts />} />
                  <Route path="/product/:id"             element={<ProductDetails />} />
                  <Route path="/checkout"                    element={<Checkout />} />
                  <Route path="/cart"                    element={<Cart />} />
                  <Route path="/product/:id/reviews"     element={<ProductReviews />} />
                  <Route path="/contact"                 element={<Contact />} />
                  <Route path="/order-success"           element={<OrderSuccess />} />
                  <Route path="/category/:categoryName"  element={<RelatedPage />} />
                  <Route path="/payment"                 element={<Payment />} />
                  <Route path="/payment-error"           element={<PaymentError />} />
                  <Route path="/privacy-policy"          element={<PrivacyPolicy />} />
                  <Route path="/refund-policy"           element={<RefundPolicy />} />
                  <Route path="/faqs"                    element={<FAQS />} />
                  <Route path="/terms"                   element={<Terms />} />
                  <Route path="/login"                   element={<Login />} />
                  <Route path="/register"                element={<Register />} />

                 

                  {/* Protected Routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute><Profile /></ProtectedRoute>
                  } />
                  <Route path="/profile/edit-profile" element={
                    <ProtectedRoute><EditProfile /></ProtectedRoute>
                  } />
                  <Route path="/profile/my-order" element={
                    <ProtectedRoute><MyOrders /></ProtectedRoute>
                  } />
                  <Route path="/profile/address-book" element={
                    <ProtectedRoute><AddressBook /></ProtectedRoute>
                  } />
                  <Route path="/profile/live-chat" element={
                    <ProtectedRoute><Messages /></ProtectedRoute>
                  } />

                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

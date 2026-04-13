

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthProvider";
import  CartProvider  from './context/CartContext';
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Categories from "./components/Categories";
import TrendingProducts from "./components/TrendingProducts";
import Layout from "./Layout";
import Profile from "./components/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./components/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import OrderContext from './context/OrderContext';
import EditProfile from "./components/profile/EditProfile";
import ProductReviews from "./components/ProductReviews";
import { Toaster } from "react-hot-toast";
import Contact from "./components/Contact";
import AddressBook from "./components/profile/AddressBook";
import Messages from "./components/Message";
import MyOrders from "./components/profile/MyOrders";
// import Messages from "./components/Message";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});


  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <CartProvider>
          <QueryClientProvider client={queryClient}> {/* 🔥 ADD */}
    <BrowserRouter>

     <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/trendingproducts" element={<TrendingProducts/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* <Route path="/profile" element={<Profile/>} /> */}
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/profile/edit-profile" element={<EditProfile />} /> */}
        <Route path="/product/:id/reviews" element={<ProductReviews />} />
        <Route path="/contact" element={<Contact />} />



  {/* Protected Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
  path="/profile/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>

            <Route
  path="/profile/my-order"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>

            <Route
  path="/profile/address-book"
  element={
    <ProtectedRoute>
      <AddressBook />
    </ProtectedRoute>
  }
/>

            <Route
  path="/profile/live-chat"
  element={
    <ProtectedRoute>
      <Messages />
    </ProtectedRoute>
  }
/>




          {/* checkout */}

          <Route 
          path="/checkout" 
          element={
            <OrderContext>
              <Checkout />
            </OrderContext>
          } 
        />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


        </Route>

      </Routes>


    </BrowserRouter>
    </QueryClientProvider>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
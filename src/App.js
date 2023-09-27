import HomePage from "./screens/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Cart from "./screens/Cart";
import { persistor, store } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
import Register from "./screens/Register";
import Login from "./screens/Login";
import AuthContext from "./auth/context";
import { useState } from "react";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import ProfileScreen from "./screens/User/ProfileScreen";
import EditProfile from "./screens/User/EditProfile";
import UpdatePassword from "./screens/User/UpdatePassword";
import jwtDecode from "jwt-decode";
import MyOrders from "./screens/Order/MyOrders";
import CategoryPage from "./screens/CategoryPage";
import ProductDetailsScreen from "./screens/Products/ProductDetailsScreen";
import Shipping from "./screens/Order/Shipping";
import ConfirmOrder from "./screens/Order/ConfirmOrder";
import Payment from "./screens/Order/Payment";
import SubCategoryPage from "./screens/SubCategoryPage";
import MyReward from "./screens/User/MyReward";
import SpecialCategoryPage from "./screens/SpecialCategoryPage";
import OrderDetail from "./screens/Order/OrderDetail";
import SearchProductsPage from "./screens/Products/SearchProductsPage";
import AllBest from "./screens/Products/Best/AllBest";
import ScrollToTop from "./ScrollToTop";
import OrderSuccess from "./screens/Order/OrderSuccess";
import MyCustomProductPage from "./screens/Products/Aquarium/MyCustomProductPage";
import AllSaleProducts from "./screens/Products/Sale/AllSaleProducts";
import AllAquariumProducts from "./screens/Products/Aquarium/AllAquariumProducts";
import AquariumPage from "./screens/AquariumPage";
import Footer from "./components/Footer";
import PaymentProcessing from "./screens/Order/PaymentProcessing";
import BrandPage from "./screens/BrandPage";
import AboutUs from "./screens/WebInfo/AboutUs";
import ContactUs from "./screens/WebInfo/ContactUs";
import PrivacyPolicy from "./screens/WebInfo/PrivacyPolicy";
import TermsConditions from "./screens/WebInfo/TermsConditions";
import ReturnPolicy from "./screens/WebInfo/ReturnPolicy";
import AllBrandsPage from "./screens/AllBrandsPage";

function App() {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await localStorage.getItem("token");
    if (user) setUser(jwtDecode(user));
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthContext.Provider value={{ user, setUser }}>
            <Router>
              <ScrollToTop>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/aquarium" element={<AquariumPage />} />
                  <Route path="/success" element={<OrderSuccess />} />
                  <Route path="/salelist" element={<AllSaleProducts />} />
                  <Route
                    path="/aquariumlist"
                    element={<AllAquariumProducts />}
                  />
                  <Route
                    path="/custom-product"
                    element={<MyCustomProductPage />}
                  />
                  <Route path="/category" element={<CategoryPage />} />
                  <Route
                    exact
                    path="/subcategory/:id"
                    element={<SubCategoryPage />}
                  />
                  <Route
                    path="/specialcategory/:id"
                    element={<SpecialCategoryPage />}
                  />
                  <Route
                    path="/product/:id"
                    element={<ProductDetailsScreen />}
                  />

                  <Route path="/cart" element={<Cart />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />

                  <Route
                    path="/shipping"
                    element={user ? <Shipping /> : <Login />}
                  />
                  <Route
                    path="/profile"
                    element={user ? <ProfileScreen /> : <Login />}
                  />
                  <Route
                    path="/edit-profile"
                    element={user ? <EditProfile /> : <Login />}
                  />
                  <Route
                    path="/myrewards"
                    element={user ? <MyReward /> : <Login />}
                  />
                  <Route
                    path="/update-password"
                    element={user ? <UpdatePassword /> : <Login />}
                  />
                  <Route
                    path="/myorders"
                    element={user ? <MyOrders /> : <Login />}
                  />
                  <Route
                    path="/payment"
                    element={user ? <Payment /> : <Login />}
                  />
                  <Route
                    path="/confirm-order"
                    element={user ? <ConfirmOrder /> : <Login />}
                  />
                  <Route
                    path="/order-detail"
                    element={user ? <OrderDetail /> : <Login />}
                  />
                  <Route path="/products" element={<SearchProductsPage />} />
                  <Route path="/best-sellers" element={<AllBest />} />
                  <Route
                    path="/payment-processing"
                    element={<PaymentProcessing />}
                  />
                  <Route exact path="/brand/:id" element={<BrandPage />} />
                  <Route exact path="/brands" element={<AllBrandsPage />} />
                  <Route exact path="/aboutus" element={<AboutUs />} />
                  <Route exact path="/contactus" element={<ContactUs />} />
                  <Route
                    exact
                    path="/privacypolicy"
                    element={<PrivacyPolicy />}
                  />
                  <Route
                    exact
                    path="/termsandconditions"
                    element={<TermsConditions />}
                  />
                  <Route
                    exact
                    path="/returnpolicy"
                    element={<ReturnPolicy />}
                  />
                </Routes>
              </ScrollToTop>
            </Router>
          </AuthContext.Provider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

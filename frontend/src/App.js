import HeaderComp from "./components/HeaderComp";
import FooterComp from "./components/FooterComp";
import {Container} from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import {Route, Routes} from 'react-router-dom'
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";



function App() {

  return (
      <div id='root'>
          <HeaderComp/>
  
          <main className="py-3">
            <Container>
                <Routes>
                    <Route path="/" element={<HomeScreen/>} > </Route>
                    <Route path="/product/:id" element={<ProductScreen/>} > </Route>
                    <Route path="/cart/:id?" element={<CartScreen/>} > </Route>
                    <Route path="/login" element={<LoginScreen/>} > </Route>
                    <Route path="/register" element={<RegisterScreen/>} > </Route>
                    <Route path="/profile" element = {<ProfileScreen/>}> </Route>
                    <Route path="/shipping" element = {<ShippingScreen/>}> </Route>
                    <Route path="/payment" element = {<PaymentScreen/>}> </Route>
                    <Route path="/placeorder" element = {<PlaceOrderScreen/>}> </Route>
                    <Route path="/order/:id" element = {<OrderScreen/>}> </Route>
                    <Route path="/admin/userlist" element = {<UserListScreen/>}> </Route>

                </Routes>
            </Container>
          
          </main>
          <FooterComp/>
      </div>
    )
}

export default App;

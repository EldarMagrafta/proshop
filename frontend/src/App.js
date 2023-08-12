import HeaderComp from "./components/HeaderComp";
import FooterComp from "./components/FooterComp.js";
import {Container} from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import CartScreen from "./screens/CartScreen.js";
import {Route, Routes} from 'react-router-dom'
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import UserListScreen from "./screens/UserListScreen.js";
import UserEditScreen from "./screens/UserEditScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import OrderListScreen from "./screens/OrderListScreen.js";



function App() {

  return (
      <div id='root'>
          <HeaderComp/>
          <main className="py-3">
            <Container>
                <Routes>
                    <Route path='/search/:keyword' element={<HomeScreen/>} exact />
                    <Route path='/page/:pageNumber' element={<HomeScreen/>} exact />
                    <Route path='/search/:keyword/page/:pageNumber'element={<HomeScreen/>} exact/>
                    <Route path='/' element={<HomeScreen/>} exact />
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
                    <Route path="/admin/user/:id/edit" element = {<UserEditScreen/>}> </Route>
                    <Route path="/admin/product/:id/edit" element = {<ProductEditScreen/>}> </Route>
                    <Route path="/admin/productlist" element = {<ProductListScreen/>} exact> </Route>
                    <Route path="/admin/productlist/:pageNumber" element = {<ProductListScreen/>} exact> </Route>
                    <Route path="/admin/orderlist" element = {<OrderListScreen/>}> </Route>
                </Routes>
            </Container>
          
          </main>
          <FooterComp/>
      </div>
    )
}

export default App;

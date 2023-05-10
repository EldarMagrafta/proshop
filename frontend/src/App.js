import HeaderComp from "./components/HeaderComp";
import FooterComp from "./components/FooterComp";
import {Container} from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import {Route, Routes} from 'react-router-dom'
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";



function App() {

  return (
      <>
          <HeaderComp/>
  
          <main className="py-3">
            <Container>
                <Routes>
                    <Route path="/" element={<HomeScreen/>} > </Route>
                    <Route path="/product/:id" element={<ProductScreen/>} > </Route>
                    <Route path="/cart/:id?" element={<CartScreen/>} > </Route>
                    <Route path="/login" element={<LoginScreen/>} > </Route>
                    <Route path="/register" element={<RegisterScreen/>} > </Route>
                </Routes>
            </Container>
          
          </main>
          <FooterComp/>
      </>
    )
}

export default App;

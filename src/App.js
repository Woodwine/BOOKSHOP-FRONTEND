import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import BookScreen from './screens/BookScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'



function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/register' Component={RegisterScreen} />
            <Route path='/login' Component={LoginScreen} />
            <Route path='/profile' Component={ProfileScreen} />
            <Route path='/shipping' Component={ShippingScreen} />
            <Route path='/payment' Component={PaymentScreen} />
            <Route path='/placeorder' Component={PlaceOrderScreen} />
            <Route path='/order/:id' Component={OrderScreen} />
            <Route path='/book/:id' Component={BookScreen} />
            <Route path='/cart/:id?' Component={CartScreen} />

            <Route path='/admin/userlist' Component={UserListScreen} />
            <Route path='/admin/userlist/:id' Component={UserEditScreen} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import dotenv from 'dotenv'
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import CardViewSingle from "./components/cardViewSingle/CardViewSingle";
import SearchView from "./components/searchView/SearchView";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import {Portfolio} from "./components/portfolio/Portfolio";
import {AuthProvider} from "./lib/contexts/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import {Container} from "react-bootstrap";

dotenv.config()


function App() {
  const [search,setSearch] = useState()
  const [singleCard,setSingleCard] = useState()
  const [portfolioValue,setPortfolioValue]=useState()
  const [firebaseCardList,setFirebaseCardList]=useState()

  return (
      <BrowserRouter>
          <AuthProvider>
            <div className='page-container'>
              <div className='content-wrap'>
                <Navigation portfolioValue={portfolioValue} setPortfolioValue={setPortfolioValue} firebaseCardList={firebaseCardList} setfirebaseCardList={setFirebaseCardList}/>
                <Container className='pt-5'>
                  <Switch>

                    <Route path = '/' exact>
                      <Home search={search} setSearch={setSearch}/>
                    </Route>

                    <Route path='/search'>
                      <SearchView search={search} setSingleCard={setSingleCard} portfolioValue={portfolioValue} firebaseCardList={firebaseCardList} />
                    </Route>

                    <Route path='/card'>
                      <CardViewSingle cardObj={singleCard}></CardViewSingle>
                    </Route>

                    <Route path='/signup'>
                      <Signup/>
                    </Route>

                    <Route path='/login'>
                      <Login/>
                    </Route>

                    <Route path='/forgot-password'>
                      <ForgotPassword/>
                    </Route>

                    <PrivateRoute path='/profile'>
                      <Profile setSingleCard={setSingleCard}/>
                    </PrivateRoute>

                    <PrivateRoute path='/update-profile'>
                      <UpdateProfile/>
                    </PrivateRoute>

                    <PrivateRoute path='/portfolio'>
                      <Portfolio setSingleCard={setSingleCard} portfolioValue={portfolioValue} setPortfolioValue={setPortfolioValue} firebaseCardList={firebaseCardList}/>
                    </PrivateRoute>
                  </Switch>
                </Container>
              </div>
              <Footer/>
            </div>
          </AuthProvider>
      </BrowserRouter>

  );
}

export default App;

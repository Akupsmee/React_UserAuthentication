import React from "react"
import { MainContextProvider } from "./contexts/mainContext"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"



import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dash from "./pages/Dash"
import Error from "./pages/Error"
import AuthComponent from "./services/Auth.Component"




const App = ()=> {

  return (
    <div className="App">
    <MainContextProvider>
    <Router>

        <Switch>
          <Route exact path="/" >
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dash" >
          <AuthComponent>
            <Dash />
          </AuthComponent>
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>

    </Router>
    </MainContextProvider>
      </div>
  );
}

export default App;

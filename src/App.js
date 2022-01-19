import { BrowserRouter as Router,  Route } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./errors/PageNotFound";
import PreloginRoutes from "./components/PreLoginRoute";
import PostloginRoutes from "./components/PostLoginRoute";

function App() {
  return (
    <Router>
        <PreloginRoutes exact path="/" component={Login} />
        <PostloginRoutes
          exact
          path="/Home"
        />
        {/* Masukan halaman baru diatas line ini */}
        <Route path="*" component={PageNotFound} />
     
    </Router>
  );
}

export default App;

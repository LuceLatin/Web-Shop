import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DodajProizvod from "./components/DodajProizvod";
import PregledProizvoda from "./components/PregledProizvoda";
import DetaljiProizvoda from "./components/DetaljiProizvoda";
import UnosProizvodaca from "./components/UnosProizvodaca";
import PregledProizvodaca from "./components/PregledProizvodaca";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import DetaljiProizvodaca from "./components/DetaljiProizvodaca";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import UrediProizvod from "./components/UrediProizvod";
import UrediProizvodaca from "./components/UrediProizvodaca";
import { CartProvider } from "./components/CartContext";
import Cart from "./components/Cart";
import { FavoriteProvider, useFavorites } from "./components/FavoriteContext";
import Favoriti from "./components/Favorite";
import { useCart } from "./components/CartContext";
import Results from "./components/Results";
import Obrana from "./components/Rezultati";
import { FilterProvider } from "./components/FilterContext";

const token = localStorage.getItem("jwt");

const checkUserRole = () => {
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin;
  }
  return null;
};

const Routing = () => {
  const userRole = checkUserRole();
  if (!token) {
    return <Login></Login>;
  }

  return (
    <Routes>
      {userRole && (
        <>
          <Route path="/addProduct" element={<DodajProizvod />} />
          <Route path="/proizvod/update/:id" element={<UrediProizvod />} />
          <Route path="/proizvodac/update/:id" element={<UrediProizvodaca />} />
          <Route path="/dodajProizvodaca" element={<UnosProizvodaca />} />
          <Route path="/obrana" element={<Results />} />
          <Route path="/" element={<PregledProizvoda />} />
          <Route path="/products/:id" element={<DetaljiProizvoda />} />
          <Route path="/proizvodac/:id" element={<DetaljiProizvodaca />} />
          <Route path="/proizvod/delete/:id" element={<DetaljiProizvodaca />} />
          <Route path="/proizvodaci" element={<PregledProizvodaca />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favoriti" element={<Favoriti />} />
          <Route path="/rezultati" element={<Obrana />} />

        </>
      )}
      {!userRole && (
        <>
          <Route path="/" element={<PregledProizvoda />} />
          <Route path="/obrana" element={<Results />} />
          <Route path="/rezultati" element={<Obrana />} />
          <Route path="/products/:id" element={<DetaljiProizvoda />} />
          <Route path="/proizvodac/:id" element={<DetaljiProizvodaca />} />
          <Route path="/proizvodaci" element={<PregledProizvodaca />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favoriti" element={<Favoriti />} />
        </>
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

const Navbar = () => {
  const userRole = checkUserRole();
  const { cart } = useCart();
  const totalQuantity = cart.reduce((total, item) => total + item.kolicina, 0);

  const { favorites } = useFavorites();

  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        {token ? (
          <div>
            {userRole && (
              <>
                <Link to="/dodajProizvodaca">
                  <button className="button-css">Dodaj proizvodaca</button>
                </Link>
                <Link to="/addProduct">
                  <button className="button-css">Dodaj proizvod</button>
                </Link>
              </>
            )}
            <Link to="/">
              <button className="button-css">Proizvodi</button>
            </Link>
            <Link to="/obrana">
              <button className="button-css">Results</button>
            </Link>
            <Link to="/proizvodaci">
              <button className="button-css">Proizvodaci</button>
            </Link>
            <Link to="/cart">
              <button className="button-css">Kosarica ({totalQuantity})</button>
            </Link>
            <Link to="/favoriti">
              <button className="button-css">
                Favoriti ({favorites.length}){" "}
              </button>
            </Link>
            <Link to="/logout">
              <button className="button-css">Logout</button>
            </Link>
          </div>
          
        ) : (
          <div>
            <Link to="/login">
              <button className="button-css">Login</button>
            </Link>
            <Link to="/register">
              <button className="button-css">Register</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <FilterProvider>
    <CartProvider>
      <FavoriteProvider>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </FavoriteProvider>
    </CartProvider>
    </FilterProvider>
  );
}

export default App;

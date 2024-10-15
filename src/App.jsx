import { Routes, Route, NavLink } from "react-router-dom";
import clsx from "clsx";
import Home from "path/to/pages/Home";
import About from "path/to/pages/About";
import Products from "path/to/pages/Products";
import NotFound from "path/to/pages/NotFound";
import css from "./App.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const App = () => {
  return (
    <div>
      <nav className={css.nav}>
             {" "}
        <NavLink to="/" className={buildLinkClass}>
                  Home      {" "}
        </NavLink>
             {" "}
        <NavLink to="/about" className={buildLinkClass}>
                  About      {" "}
        </NavLink>
             {" "}
        <NavLink to="/products" className={buildLinkClass}>
                  Products      {" "}
        </NavLink>
           {" "}
      </nav>
         {" "}
      <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />   {" "}
      </Routes>
       {" "}
    </div>
  );
};

export default App;

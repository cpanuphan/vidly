import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";

function App() {
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#top">
          Navbar
        </a>
      </nav>

      <main className="container">
        <Route path="/movies" component={Movies} />
        {/* <Movies /> */}
      </main>
    </div>
  );
}

export default App;

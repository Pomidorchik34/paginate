import { useEffect, useState } from "react";
import Card from "./components";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/cars?page=2&limit=15")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.results);
        console.log(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <Card></Card>
        {cars.map((value, index) => {
          <Card
            key={index}
            image={value.image}
            title={value.title}
            year={value.start_production}
          />;
        })}
      </div>
    </>
  );
}

export default App;

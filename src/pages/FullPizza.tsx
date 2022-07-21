import React from "react";

import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          `https://62a7887297b6156bff8ff64b.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        navigate("/");
        alert("Произошла ошибка");
      }
    }
    fetchPizzas();
  }, []);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px 0",
      }}
    >
      <img className="img" src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price} ₽.</p>
      <Link to="/" className="button">
        Назад
      </Link>
    </div>
  );
};

export default FullPizza;

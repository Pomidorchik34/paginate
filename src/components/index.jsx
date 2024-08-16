import React from "react";

function Card(props) {
  const { image, title, year } = props;
  return (
    <div>
      <img src={image} loading="lazy" />
      <h1>{title}</h1>
      <h2>{year}</h2>
    </div>
  );
}

export default Card;

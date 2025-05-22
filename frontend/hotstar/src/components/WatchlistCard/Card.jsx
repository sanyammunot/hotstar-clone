import "./Card.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Card = ({ id, title, description, imageUrl }) => {

  return (
    <Link to={`/${"movie"}/${id}`}>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className="row-card"
      >
        <div className="wrap">
          <div className="card-gradient">
            <div className="card-content">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
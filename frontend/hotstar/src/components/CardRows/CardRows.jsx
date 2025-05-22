import "./CardRows.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card } from "../Card/Card";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

function CardRows({ row_title, language, apiCategory }) {
  const ref = useRef(null);
  const [data, setData] = useState([]);

  const scroll = (offset) => {
    ref.current.scrollLeft += offset;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.themoviedb.org/3/${apiCategory || "movie/popular"}?api_key=23c421d7119114c8fafc43641f433e4c&language=${language}`;
        const res = await axios.get(url);
        setData(res.data.results || []);
      } catch (err) {
        console.error("Error fetching card row:", err);
      }
    };

    fetchData();
  }, [apiCategory, language]);

  return (
    <div className="row-title">
      <h3>{row_title}</h3>
      <div className="card-container" ref={ref}>
        <ArrowBackIosRoundedIcon onClick={() => scroll(-1700)} className="left-btn" />
        {data.map((el) => (
          <Card
            key={el.id}
            id={el.id}
            title={el.title || el.name}
            media_type={el.media_type}
            imageUrl={el.poster_path}
            description={el.overview}
          />
        ))}
        <ArrowForwardIosRoundedIcon onClick={() => scroll(1700)} className="right-btn" />
      </div>
    </div>
  );
}

export default CardRows;

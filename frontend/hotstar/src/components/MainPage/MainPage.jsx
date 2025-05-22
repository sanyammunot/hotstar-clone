import Banner from "../Banner/Banner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CardRows from "../CardRows/CardRows";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MainPage() {
  const { category, language } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [category, language]);

  const getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${category || "movie/popular"}?api_key=23c421d7119114c8fafc43641f433e4c&language=${language || "en"}`
      )
      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => console.error("Error fetching banner data:", err));
  };

  const row_titles = [
    { title: "Now Playing in Theatres", language: "te", apiCategory: "movie/now_playing" },
    { title: "Popular Movies", language: "en", apiCategory: "movie/popular" },
    { title: "Trending Today", language: "ta", apiCategory: "trending/all/day" },
    { title: "Top Rated Movies", language: "hi", apiCategory: "movie/top_rated" },
    { title: "Upcoming Movies", language: "ml", apiCategory: "movie/upcoming" },
  ];

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <div>
      <Carousel
        autoPlay
        interval={5000}
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        transitionTime={700}
        showThumbs={false}
      >
        {data.map((el, index) => (
          <Banner
            idm={el.id}
            key={index}
            img={`${baseImgUrl}${el.backdrop_path}`}
            title={el.title || el.name}
            genre={el.genre}
            description={el.overview}
            mediaType={el.media_type}
          />
        ))}
      </Carousel>

      {row_titles.map((el, index) => (
        <CardRows
          key={index}
          row_title={el.title}
          language={el.language}
          apiCategory={el.apiCategory}
        />
      ))}
    </div>
  );
}

export default MainPage;

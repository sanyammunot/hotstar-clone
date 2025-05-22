import YouTube from 'react-youtube';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Videopage.css';

function VideoPage() {
  const { id, category } = useParams();
  const [urlId, setUrlId] = useState(''); 

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/${category}/${id}/videos?api_key=23c421d7119114c8fafc43641f433e4c`)
      .then((response) => {
        const results = response.data.results;
        if (results.length !== 0) {
          setUrlId(results[0].key);
        } else {
          setUrlId(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
        setUrlId(null);
      });
  }, [category, id]);

  const opts = {
    height: '690',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      {urlId === '' ? (
        <h1 className="loading">Loading...</h1>
      ) : urlId ? (
        <YouTube videoId={urlId} opts={opts} />
      ) : (
        <h1 className="error">VIDEO NOT FOUND</h1>
      )}
    </div>
  );
}

export default VideoPage;

import "./Banner.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlayIcon from "@mui/icons-material/PlayArrowRounded";
import AddToListIcon from "@mui/icons-material/PlaylistAddRounded";
import ShareIcon from "@mui/icons-material/ShareRounded";
import AddCircleIcon from '@mui/icons-material/Add';
import ConfirmIcon from '@mui/icons-material/Check';
import { useEffect, useState } from "react";

function Banner({
  original_title,
  title,
  year,
  genre,
  description,
  img,
  idm,
  mediaType
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistItemId, setWatchlistItemId] = useState("");
  const { id, category } = useParams();
  const [watchlistData, setWatchlistData] = useState([]);

  // Fetch current user's watchlist from server
  const fetchWatchlist = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    
    const { token } = JSON.parse(storedUser);
    
    try {
      const response = await fetch("https://hotstar-v.herokuapp.com/watchlist", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authentication: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setWatchlistData(data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  // Check if this item already exists in watchlist
  useEffect(() => {
    fetchWatchlist();
  }, []);

  useEffect(() => {
    for (const item of watchlistData) {
      if (item.title === original_title) {
        setIsInWatchlist(true);
        setWatchlistItemId(item._id);
        break;
      }
    }
  }, [watchlistData]);

  useEffect(() => {
    setIsInWatchlist(false);
  }, [id]);

  // Add current item to watchlist
  const handleAddToWatchlist = async () => {
    setIsInWatchlist(true);
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please log in to add items to your watchlist");
      return;
    }

    const { token } = JSON.parse(storedUser);

    try {
      const res = await fetch("http://localhost:7000/watchlist", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authentication: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          imageUrl: img,
          title,
          overview: description,
        }),
      });

      const addedItem = await res.json();
      setWatchlistItemId(addedItem._id);
    } catch (err) {
      console.error("Failed to add to watchlist:", err);
    }
  };

  // Remove current item from watchlist
  const handleRemoveFromWatchlist = async () => {
    setIsInWatchlist(false);

    try {
      await fetch(`https://hotstar-v.herokuapp.com/watchlist/${watchlistItemId}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to remove from watchlist:", err);
    }
  };

  return (
    <Link to={mediaType === "tv" ? `/tv/${idm}` : `/movie/${idm || id}`}>
      <div className="banner-container">
        <div className="banner-left">
          <div className="banner-details">
            <h1>{title}</h1>
            <div id="genre">
              <span>{genre}</span>
            </div>
            <p className="banner-descr">{description}</p>
          </div>

          {id && (
            <div className="btns">
              <Link to={`/${category}/${id}/video`}>
                <div>
                  <PlayIcon fontSize="large" className="play-icon" />
                  <h2>Watch Movie</h2>
                </div>
              </Link>

              <div>
                <div className="playlist-btn">
                  {isInWatchlist ? (
                    <ConfirmIcon
                      className="checkIcon"
                      onClick={handleRemoveFromWatchlist}
                      fontSize="large"
                    />
                  ) : (
                    <AddCircleIcon
                      onClick={handleAddToWatchlist}
                      fontSize="large"
                    />
                  )}
                  watchlist
                </div>
                <div>
                  <ShareIcon />
                  share
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="banner-right"
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
      </div>
    </Link>
  );
}

export default Banner;

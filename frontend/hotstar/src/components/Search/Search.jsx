import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "./Searchcard/Card";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

export const Search = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const datafn = async () => {

    if(text===""){
        setData([]);
        return;
    }

    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=23c421d7119114c8fafc43641f433e4c&query=${text}&page=1&include_adult=false`
      )
      .then((res) => {
        setData(res.data.results);
      });
  };

  useEffect(() => {
    datafn();
  }, [text]);

  const clearBtn=()=>{
      setData([]);
      setText("");
  }

  return (
    <div>
      <div className="searchinput">
        <input 
          onInput={(e) => setText(e.target.value)}
          className="hotstarSearch"
          type="text"
          placeholder="Search"
        />
        <div>
         {text===""? <SearchIcon />:< CloseIcon id="clearBtn" onClick={clearBtn} /> }
        </div>
      </div>
      {data.length!=0 && 
      <div id="searchBox">
        {data.map((el) => (
            <Link to={`/movie/${el.id}`} onClick={clearBtn}>
               <Card path={el.backdrop_path} title={el.original_title} />
            </Link>
        ))}
      </div>
      }
    </div>
  );
};

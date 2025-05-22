
import { useParams } from "react-router-dom"
import Banner from "../Banner/Banner"
import {useEffect, useState} from "react"
import axios from "axios"
import CardRows from "../CardRows/CardRows";
import CheckIcon from '@mui/icons-material/Check';

function IndividualPage(props) {
  const {id, category} = useParams();
  useEffect(() => { getData() }, [id])

  
  const [data, setData] = useState({})
  const getData = async () => {
    const url = `https://api.themoviedb.org/3/${category}/${id}?api_key=23c421d7119114c8fafc43641f433e4c&language=en-US`
    const a = await axios.get(url)
    setData(a.data)
  }

  let baseImgUrl = 'https://image.tmdb.org/t/p/original'
  // console.log("data is not coming",data);
  
  return (
    
    <div key={props.pageId}>
      <Banner original_title={data.original_title} id={id}  img={`${baseImgUrl}${data.backdrop_path}`  } title={data.original_title || data.name} description={data.overview}></Banner>
      <CardRows language={data.original_language} row_title="More Like This"></CardRows>
    </div>
  )
}

export default IndividualPage
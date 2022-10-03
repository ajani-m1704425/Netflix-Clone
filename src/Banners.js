import React, {useState, useEffect, useContext} from 'react';
import instance from './axios';
import requests from './request';
import "./Banner.css"
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { BannerValue } from './Body';




function rando(min,max){ 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function truncateString(str, num) {
  return str?.length > num ? str.slice(0, num) + "..." : 
  str;
  }



const base_url = "https://image.tmdb.org/t/p/original/";

function Banners(props) {
    let [movie, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [{ banner }, dispatch] = useContext(BannerValue);

    useEffect(() => {
        async function fetchin() {
            const request = await instance.get(requests.fetchNetflixOriginals);
            if (banner) {
               setMovies(banner)
            } else {
                setMovies(
                request.data.results[
                rando(0, request.data.results.length - 1)]
                ); 
            }
            
            return request
        }
        fetchin();
    }, [banner]);
    
    
    

     const opts = {
      height: '450',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    function handleClick(movie) {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.originalname ||movie?.original_title || movie?.original_name ||"")
                .then((response) => {
                    const urlParams = new URLSearchParams(new URL(response).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log());
        } 
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${base_url}${movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path})`,
                backgroundPosition:"center center"
            }}>
            <div className='banner_contents'>
                <h1 className='banner_title'>
                    {movie?.title || movie?.name || movie?.originalname}
                </h1>
                <div className='banner_buttons'>
                    <button className='banner_button' onClick={()=>handleClick(movie)}>Play</button>
                    <button className='banner_button'>My List</button>
                </div>
                <h1 className="banner_description">
                    {truncateString(movie?.overview, 500)}
                </h1>
            </div>
            <div className="banner_fadebutton"></div>
            <div className='youtube_page'>
                {trailerUrl && < YouTube videoId={trailerUrl} opts={opts} />}
            </div>
            
        </header>
    );
}

export default Banners;
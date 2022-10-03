import instance from './axios';
import React, {useState, useEffect, useContext} from 'react';
import "./Row.css";
import { BannerValue } from './Body';
// import YouTube from 'react-youtube';
// import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

 
    
function Row({ title, fetchURL, isRowLarge }) {
    const [movies, setMovies] = useState([]);
    const [{ banner }, dispatch] = useContext(BannerValue);
   
    // const [newmovies, setNewmovies] = useState([]);

    useEffect(()=>{
        async function fetchin(){
            const request = await instance.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchin();
    }, [fetchURL]);
    

    function handleClick(selectMovies) { 
        dispatch({
            type: "SET_BANNER",
            banner : selectMovies
        })
    };
    
    
    // const opts = {
    //   height: '390',
    //   width: '100%',
    //   playerVars: {
    //     // https://developers.google.com/youtube/player_parameters
    //     autoplay: 1,
    //   },
    // };

    
   

    // function handleClick(movie) {
    //     if (trailerUrl) {
    //         setTrailerUrl("");
    //     } else {
    //         movieTrailer(movie?.name || movie?.title || "")
    //             .then((response) => {
    //                 const urlParams = new URLSearchParams(new URL(response).search)
    //                 setTrailerUrl(urlParams.get("v"));
    //             })
    //             .catch((error) => console.log());
    //     } 
    // }

    return (
        <div className="row">
            <h3>{ title.toUpperCase() }</h3>
            <div className="row_posters">
                {movies.map((movie)=>
                        <img 
                        key={movie.id}
                        onClick={() =>handleClick(movie)}
                        className={`row_poster ${isRowLarge && "row_poster_large"}`} src={`${base_url}${isRowLarge ? movie.poster_path : movie.backdrop_path }`}  alt={movie.name}/>
                    )}
            </div>
            {/* {trailerUrl && < YouTube videoId={trailerUrl} opts={opts} />} */}
        </div>  
    );
}

export default Row;

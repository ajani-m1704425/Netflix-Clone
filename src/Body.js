import React from 'react';
import "./Body.css";
import requests from "./request";
import Row from "./Row";
import Banners from './Banners';
import { createContext, useReducer } from "react";
import reducer,{ initialState } from './Reducer';


export const BannerValue = createContext();

function Body(props) {
    return (
        <div>
            < BannerValue.Provider value={useReducer(reducer,initialState)}>
                <Banners />
                <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isRowLarge/>
                <Row title="Trending Now" fetchURL={requests.fetchTrending}/>
                <Row title="Top Rated" fetchURL={requests.fetchTopRated}/>
                <Row title="Action Movies" fetchURL={requests.fetchActionMovies}/>
                <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies}/>
                <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies}/>
                <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies}/>
                <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
            </BannerValue.Provider>
        </div>
    );
}

export default Body;
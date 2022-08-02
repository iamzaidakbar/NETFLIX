import apiContext from "./apiContext";
import axios from "axios";
import {useState} from "react";

const ApiState = (props) => {
    const animationMarginOnLargerScreen = 112
    const animationMarginOnNormalScreen = 78
    const popularOnNetflix = []
    const trendingOnNetflix = []
    const movieTopRated = []

    const [popularNetflix, setPopularNetflix] = useState(popularOnNetflix);
    const [trendingNetflix, setTrendingNetflix] = useState(trendingOnNetflix);
    const [topRatedMovie, setTopRatedMovie] = useState(movieTopRated);

    const backdropPath = "https://image.tmdb.org/t/p/w500"
    // Calculations
    const totalCards = 20
    const pageSize = 5
    const totalPages = Math.ceil(totalCards / pageSize)


    const fetch_popular = async () => {
        await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=890b1191453c654b1dceeaba2f52c3a4')
            .then(res => {
                const data = res.data.results
                setPopularNetflix(data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const fetch_Trending = async () => {
        await axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=890b1191453c654b1dceeaba2f52c3a4')
            .then(res => {
                const data = res.data.results
                setTrendingNetflix(data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const fetch_Top_Rated = async () => {
        await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=890b1191453c654b1dceeaba2f52c3a4')
            .then(res => {
                const data = res.data.results.slice(0, 10)
                setTopRatedMovie(data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <apiContext.Provider
            value={{
                backdropPath,
                totalCards,
                pageSize,
                totalPages,
                popularNetflix,
                trendingNetflix,
                topRatedMovie,
                animationMarginOnLargerScreen,
                animationMarginOnNormalScreen,
                fetch_popular,
                fetch_Trending,
                fetch_Top_Rated,
            }}>
            {props.children}
        </apiContext.Provider>
    )

}

export default ApiState;
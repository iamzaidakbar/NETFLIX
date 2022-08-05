import apiContext from "./apiContext";
import axios from "axios";
import "../../src/components/VideoCollection/video-collection"
import {useState} from "react";

const ApiState = (props) => {
    const YOUTUBE_API_KEY_1 = "AIzaSyB1TIUkr-Gc8Jd-Xjagi-FrY0Y7AURFA-w"
    // const YOUTUBE_API_KEY_2 = "AIzaSyDJMKG0ydBUCx9HFoko_3cnhhKNqFB0M1I"
    const animationMarginOnLargerScreen = 112
    const animationMarginOnNormalScreen = 78
    const popularOnNetflix = []
    const trendingOnNetflix = []
    const movieTopRated = []
    const trailers = []

    const [popularNetflix, setPopularNetflix] = useState(popularOnNetflix);
    const [trendingNetflix, setTrendingNetflix] = useState(trendingOnNetflix);
    const [topRatedMovie, setTopRatedMovie] = useState(movieTopRated);
    const [randomTrailers, setRandomTrailers] = useState(trailers);
    const [allVideos, setAllVideos] = useState(movieTopRated);
    const [showSearchContent, setShowSearchContent] = useState(false);
    const [addMyListPage, setAddMyListPage] = useState(0);

    const backdropPath = "https://image.tmdb.org/t/p/w500"
    // Calculations
    const totalCards = 20
    const pageSize = 5
    const totalPages = Math.ceil(totalCards / pageSize)

    //   My list
    let myListPageSize = 5
    let totalMyListPages = Math.ceil(addMyListPage / myListPageSize)


    // YouTube Api Random Trailers

    const fetch_Trailers = async () => {
        await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=netflixtrailers&key=${YOUTUBE_API_KEY_1}`)
            .then(res => {
                const trailers = res.data.items.map(video => "https://youtu.be/" + video.id.videoId)
                console.log(trailers)
                setRandomTrailers(trailers)
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    const fetch_popular = async () => {
        await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=890b1191453c654b1dceeaba2f52c3a4')
            .then(res => {
                const data = res.data.results.slice(0, 19)
                for (const video of data) video.type = "Popular"
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
                for (const video of data) video.type = "Trending"
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
                for (const video of data) video.type = "Top10"
                setTopRatedMovie(data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const fetchAllVideos = () => {
        if (popularNetflix.length > 1 && trendingNetflix.length > 1 && topRatedMovie.length > 1) {
            let allVideos = [...popularNetflix, ...trendingNetflix, ...topRatedMovie]
            setAllVideos(allVideos)
        }
    }
    let filteredVideos = []
    const [filterVideos, setFilterVideos] = useState(filteredVideos);
    const handleSearchChange = (e) => {
        let value = e.target.value?.toLowerCase()
        if (e.target.value.length < 1) {
            setShowSearchContent(false)
        } else {
            let Videos = allVideos.filter(filteredItem => {
                return filteredItem.name?.toLowerCase().includes(value) || filteredItem.title?.toLowerCase().includes(value)


            })
            setFilterVideos(Videos)
            setShowSearchContent(true)
        }
    }

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }


    return (<apiContext.Provider
        value={{
            backdropPath,
            totalCards,
            pageSize,
            totalPages,
            popularNetflix,
            trendingNetflix,
            topRatedMovie, randomTrailers,
            animationMarginOnLargerScreen,
            animationMarginOnNormalScreen,
            allVideos,
            filterVideos,
            showSearchContent,
            setAddMyListPage,
            totalMyListPages,
            addMyListPage,
            makeid,
            fetch_Trailers,
            fetch_popular,
            fetch_Trending,
            fetch_Top_Rated,
            handleSearchChange,
            fetchAllVideos,
        }}>
        {props.children}
    </apiContext.Provider>)

}

export default ApiState;
import Navbar from "../Navbar/navbar";
import React, {useContext} from "react";
import Trending from "../Rows/Trending/trending";
import Popular from "../Rows/Popular/popular";
import Top10 from "../Rows/Top10/top10";
import SearchContent from "../SearchContent/search-content";
import apiContext from "../../context/apiContext";
import MyList from "../MyList/my-list";

export default function Home(props) {

    const context = useContext(apiContext)
    const {showSearchContent} = context

    return (<>
        <Navbar/>
        {!showSearchContent && <Popular randomNumber={props.randomNumber}/>}
        {!showSearchContent && <Trending/>}
        {!showSearchContent && <Top10/>}
        {!showSearchContent && <MyList randomNumber={props.randomNumber}/>}
        {showSearchContent && <SearchContent randomNumber={props.randomNumber}/>}
    </>)
}

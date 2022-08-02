import Navbar from "../Navbar/navbar";
import React from "react";
import Trending from "../Rows/Trending/trending";
import Popular from "../Rows/Popular/popular";
import Top10 from "../Rows/Top10/top10";

export default function Home() {

    return (<>
        <Navbar/>
        <Popular/>
        <Trending/>
        <Top10/>
    </>)
}

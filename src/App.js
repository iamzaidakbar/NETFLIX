import './App.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home/home";
import {Navbar} from "react-bootstrap";
import VideoPlayer from "./components/VideoPlayer/video-player";
import ApiState from "./context/apiState";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh, faVolumeMute} from "@fortawesome/free-solid-svg-icons";
import VideoCaption from "./components/HomeVideoCaption/video-caption";

function App(props) {
    const base_path = "http://youtu.be/"
    const homeVideos = [{
        id: 1,
        name: "Demon Slayer",
        src: base_path + "k_CxMefC7mA",
        description: "Demon Slayer: Kimetsu no Yaiba (鬼滅の刃, Kimetsu no Yaiba, \"Blade of Demon Destruction\") is a Japanese manga series written and illustrated by Koyoharu Gotouge. It follows teenage Tanjiro Kamado, who strives to become a demon slayer after his family was slaughtered and his younger sister, Nezuko, turned into a demon.",
    }, {
        id: 2,
        name: "Jujutsu Kasen",
        src: base_path + "CY5WLrSYPzo",
        description: "Jujutsu Kaisen (呪術廻戦) is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in nineteen tankōbon volumes as of April 2022.",
    }, {
        id: 3,
        name: "Black Adam",
        src: base_path + "JqtRDHiNW54?t=5",
        description: "As originally depicted, Black Adam was a corrupted, ancient Egyptian predecessor of Captain Marvel, who fought his way to modern times to challenge the hero and his Marvel Family associates.",
    }, {
        id: 4,
        name: "Stranger Things",
        src: base_path + "BYK0EqCAYdI?t=6",
        description: "Due to the events in Hawkins and the imminent danger to her friends, Eleven goes with Dr. Martin Brenner and Sam Owens to a secret facility to help her regain her powers. Mike, Will, Jonathan and Jonathan's friend Argyle try to track Eleven down.",
    }, {
        id: 5,
        name: "The Gray Man",
        src: base_path + "BmllggGO4pM?t=23",
        description: "When the CIA's top asset -- his identity known to no one -- uncovers agency secrets, he triggers a global hunt by assassins set loose by his ex-colleague.",
    }, {
        id: 6,
        name: "Money Heist",
        src: base_path + "juIcenNQWLs",
        description: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan. Watch all you want. This riveting crime series won Best Drama at the International Emmy Awards, Premios Fénix and Premios Iris (plus six more Iris wins).",
    }, {
        id: 7,
        name: "One Punch Man",
        src: base_path + "km2OPUctni4",
        description: "One-Punch Man is a Japanese superhero manga series created by One. It tells the story of Saitama, a superhero who, because he can defeat any opponent with a single punch, grows bored from a lack of challenge. One wrote the original webcomic manga version in early 2009.",
    }, {
        id: 8,
        name: "BAKI HANMA",
        src: base_path + "UmPFTUHdAyU?t=4",
        description: "The protagonist, Baki Hanma, trains with an intense focus to become strong enough to surpass his father, Yujiro Hanma, the strongest fighter in the world. Five of the world's most violent and brutal death row inmates are gathering to face Baki."
    }, {
        id: 9,
        name: "Breaking Bad",
        src: base_path + "31Voz1H40zI?t=4",
        description: "Set in Albuquerque, New Mexico, between 2008 and 2010, Breaking Bad follows Walter White, a modest high school chemistry teacher who transforms into a ruthless kingpin in the local methamphetamine drug trade, driven to financially provide for his family after being diagnosed with inoperable lung cancer"
    }, {
        id: 10,
        name: "All of us are Dead",
        src: base_path + "IN5TD4VRcSM?t=2",
        description: "Trapped students must escape their high school which has become ground zero for a zombie virus outbreak."
    }, {
        id: 11,
        name: "Peaky Blinders",
        src: base_path + "PxZ5gGfPtCQ",
        description: "Peaky Blinders is an epic centred on a crime family of mixed Irish Catholic and Romani origins based in Birmingham, England, starting in 1919, several months after the end of the First World War in November 1918. It centres on the Peaky Blinders street gang and their ambitious, cunning crime boss Tommy Shelby (Murphy)."
    }, {
        id: 12,
        name: "SHAZAM!",
        src: base_path + "EHRmypwgsxU",
        description: "Shazam. explores Billy Batson's life; an abandoned 14-year-old looking for his parents; isolating himself from anyone willing to give him anything until he is given a final chance to settle in with a new foster family (themselves orphans) hoping they can help him see sense."
    },]

    const [volume, setVolume] = useState(1);

    function handleClick() {
        if (volume === 1) {
            setVolume(0)
        } else {
            setVolume(1)
        }
    }

    const randomNumber = props.randomNumber

    useEffect(() => {
        document.getElementById("video").click()
    }, []);


    return (

        <div className="app">
            <ApiState>
                <Router>
                    <div id="homeVideo">
                        <VideoCaption title={homeVideos[randomNumber].name}
                                      description={homeVideos[randomNumber].description}/>
                        <VideoPlayer
                            url={homeVideos[randomNumber].src}
                            width="100vw"
                            height="100vh"
                            volume={volume}
                        />
                        <button data-placement="top"
                                title={volume ? "Mute" : "Unmute"}
                                data-animation={true} onClick={handleClick}
                                className="btn border transparent px-2 py-1 mute-btn">
                            <FontAwesomeIcon style={{zIndex: "2"}} className="p-0 py-2 m-0 " size={"lg"} color="white"
                                             icon={volume === 0 ? faVolumeMute : faVolumeHigh}/></button>
                    </div>

                    <Navbar/>
                    <Routes>
                        <Route exact path="" element={<Home randomNumber={props.randomNumber}/>}/>
                        {/*<Route exact path="/" element={<Signup/>}></Route>*/}
                        {/*<Route exact path="/login" element={<Login/>}></Route>*/}
                    </Routes>
                </Router>
            </ApiState>
        </div>

    );
}

export default App;

import React, {useState} from "react";
import VideoPlayer from "../VideoPlayer/video-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faPlay, faThumbsUp, faVolumeHigh, faVolumeMute} from "@fortawesome/free-solid-svg-icons";

export default function VideoCollection(props) {

    const [zIndex, setZIndex] = useState(1);
    const [volume, setVolume] = useState(0);
    const [pictureMode, setPictureMode] = useState(true);
    const [info, setInfo] = useState(false);


    function handleIndex() {
        setZIndex(3)
    }

    function handleMouseleave() {
        setZIndex(1)
        setPictureMode(true)
    }

    function handleMuteButtonClick() {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0)
        }
    }

    function showInfo() {
        setInfo(true)
    }

    function hideInfo() {
        setInfo(false)
    }

    function playTrailer() {
        if (pictureMode) {
            setPictureMode(false)
        } else {
            setPictureMode(true)
        }
    }

    return (<>
        <div className="row">
            <div className="mx-auto card-wrapper">
                <div id={"card"} onMouseOver={handleIndex} onMouseLeave={handleMouseleave} style={{zIndex: `${zIndex}`}}
                     className="card p-0">
                    <div onMouseOver={showInfo} onMouseLeave={hideInfo} className="card-img p-0">
                        {pictureMode && <img src={props.img_src} alt=""/>}
                        <div>
                            {!pictureMode && <div className={"video-wrapper bg-dark p-0"}>
                                <VideoPlayer url="https://youtu.be/X0tOpBuYasI?t=3" width={"100%"} height={"100%"}
                                             playing={true} volume={volume}/>
                                <div className="volume-button p-0">
                                    <FontAwesomeIcon onClick={handleMuteButtonClick} className="icon-mute"
                                                     icon={volume === 0 ? faVolumeMute : faVolumeHigh}
                                                     color={"black"}/>
                                </div>
                            </div>}

                            {info && <div className="card info-card bg-dark shadow p-0 m-0">
                                <div className="card-body m-0 p-3">
                                    <div className="action-icons d-flex justify-content-between mb-3">
                                        <div>
                                            <FontAwesomeIcon className={"action-icon m-1"} color={"black"}
                                                             icon={faPlay}/>
                                            <FontAwesomeIcon className={"action-icon m-1"}
                                                             style={{backgroundColor: "black"}} color={"white"}
                                                             icon={faThumbsUp}/>
                                            <FontAwesomeIcon className={"action-icon m-1"}
                                                             style={{backgroundColor: "black"}} color={"white"}
                                                             icon={faHeart}/>
                                        </div>
                                        <div>
                                            <button onClick={playTrailer}
                                                    className="btn trailer-btn btn-sm btn-light mt-1">{pictureMode ? "Play Trailer" : "Stop Trailer"}</button>
                                        </div>
                                    </div>
                                    <div className="labels d-flex align-items-center gap-1 mb-1">
                                        <h2 className={"text-success strong font-weight-bold"}>98% Match</h2>
                                        <h2 className={"text-white border px-1"}>U/A 16+</h2>
                                        <h2 className={"text-white"}>Limited Series</h2>
                                        <h2 className={"text-white border px-1"}>HD</h2>
                                    </div>
                                    <div className="tv-series-info d-flex align-items-center gap-3">
                                        <h2 className={"text-white"}>Explicit</h2>
                                        <h2 className={"text-white"}>Mind Bending</h2>
                                        <h2 className={"text-white"}>Thriller</h2>
                                    </div>
                                </div>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
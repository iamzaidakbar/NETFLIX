import React, {useContext, useState} from "react";
import VideoPlayer from "../VideoPlayer/video-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faHeart,
    faPlay,
    faPlusCircle,
    faTimesCircle,
    faVolumeHigh,
    faVolumeMute
} from "@fortawesome/free-solid-svg-icons";
import {popular_trailers} from "../../Videos/populartrailers";
import {useDispatch} from "react-redux";
import {addToList, removeFromTheList} from "../../actions";
import apiContext from "../../context/apiContext";

export default function VideoCollection(props) {
    const dispatch = useDispatch()

    const context = useContext(apiContext)
    const {setAddMyListPage, addMyListPage} = context

    const [zIndex, setZIndex] = useState(1);
    const [volume, setVolume] = useState(0);
    const [pictureMode, setPictureMode] = useState(true);
    const [info, setInfo] = useState(false);
    const [addedToList, setAddedToList] = useState(false);


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

    function handleClick() {
        dispatch(addToList(props.item))
        setAddedToList(true)
        document.getElementById("addListIcon").style.pointerEvents = "none"
        setAddMyListPage(addMyListPage + 1)
    }

    function removeFromList() {
        dispatch(removeFromTheList(props.item))
        setAddedToList(false)
        setAddMyListPage(addMyListPage - 1)
    }

    return (<>
        <div id="cards" className="row">
            <div className="mx-auto card-wrapper">
                <div id={"card"} onMouseOver={handleIndex} onMouseLeave={handleMouseleave} style={{zIndex: `${zIndex}`}}
                     className="card p-0">
                    <div onMouseOver={showInfo} onMouseLeave={hideInfo} className="card-img p-0">
                        {pictureMode && <img src={props.img_src} alt=""/>}
                        <div>
                            {!pictureMode && <div className={"video-wrapper bg-dark p-0"}>
                                <VideoPlayer url={popular_trailers[props.randomNumber].src} width={"100%"}
                                             height={"100%"}
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
                                            <a target="_blank" rel="noreferrer" href="https://www.netflix.com/in/login"><FontAwesomeIcon
                                                className={"action-icon m-1"} color={"black"}
                                                data-placement="top"
                                                title="Play"
                                                data-animation={true}
                                                icon={faPlay}/></a>
                                            <FontAwesomeIcon className={"action-icon m-1"} id="addListIcon"
                                                             onClick={handleClick}
                                                             data-placement="top"
                                                             title={addedToList ? "Added to list" : "Add to list to watch later."}
                                                             data-animation={true}
                                                             style={{
                                                                 backgroundColor: "transparent",
                                                                 transform: "scale(1.8)",
                                                                 display: `${props.displayButton}`
                                                             }} color={"white"}
                                                             icon={addedToList ? faCheck : faPlusCircle}
                                            />

                                            <FontAwesomeIcon className={"action-icon m-1"} border
                                                             data-placement="top"
                                                             title="Like"
                                                             data-animation={true}
                                                             style={{backgroundColor: "transparent"}} color={"white"}
                                                             icon={faHeart}/>

                                            <FontAwesomeIcon icon={faTimesCircle} color="white"
                                                             onClick={removeFromList}
                                                             className={"action-icon m-1"}
                                                             data-placement="top"
                                                             title="Remove from the list"
                                                             data-animation={true}
                                                             style={{
                                                                 backgroundColor: "transparent",
                                                                 display: `${!props.displayRemoveButton && "none"}`,
                                                                 transform: "scale(1.8)",
                                                             }}
                                            />
                                        </div>
                                        <div>
                                            <button onClick={playTrailer} data-placement="top"
                                                    title={pictureMode ? "Play trailer" : "Stop trailer"}
                                                    data-animation={true}
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
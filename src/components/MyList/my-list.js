import VideoCollection from "../VideoCollection/video-collection";
import React, {useContext, useState} from "react";
import {useSelector} from "react-redux";
import apiContext from "../../context/apiContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

export default function MyList(props) {
    const defaultPicture = "https://occ-0-3213-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVnUoqO98RZgU7QYapJnbAGPYxdWzxFORcnnyXL7_irTpxkSTU3S3k8BUqORLhVtJfNUxAJO3uyz_za9ReIn7Ah6Lhywb9ueq8ApJ_d6NRFR07GibgivxoGz7a27rs3KH-nS.jpg?r=ad9"
    const myState = useSelector((state) => state.addToMyList)
    const context = useContext(apiContext)
    const {
        backdropPath, animationMarginOnLargerScreen,
        animationMarginOnNormalScreen,
        totalMyListPages,addMyListPage, makeid
    } = context

    // Arrows

    const [rowFourMargin, setRowFourMargin] = useState(0);
    const [row4Page, setRow4Page] = useState(1);
    const [rowFourArrows, setRowFourArrows] = useState(true);

    function rowOneRight() {
        if (window.screen.width > 1400) {
            document.getElementById("box-4").style.marginLeft = rowFourMargin - animationMarginOnLargerScreen + "rem"
            setRowFourMargin(rowFourMargin - animationMarginOnLargerScreen)
        } else {
            document.getElementById("box-4").style.marginLeft = rowFourMargin - animationMarginOnNormalScreen + "rem"
            setRowFourMargin(rowFourMargin - animationMarginOnNormalScreen)
        }
        setRow4Page(row4Page + 1)
    }

    function rowOneLeft() {
        if (window.screen.width > 1400) {
            document.getElementById("box-4").style.marginLeft = rowFourMargin + animationMarginOnLargerScreen + "rem"
            setRowFourMargin(rowFourMargin + animationMarginOnLargerScreen)
        } else {
            document.getElementById("box-4").style.marginLeft = rowFourMargin + animationMarginOnNormalScreen + "rem"
            setRowFourMargin(rowFourMargin + animationMarginOnNormalScreen)
        }
        setRow4Page(row4Page - 1)
    }

    return (<>
        {addMyListPage && <div className="container-fluid position-absolute row-4 px-5" style={{marginTop: "34rem"}}>
            <h2 className="text-light popular-title ">My List</h2>
            <div id={"box-4"} onMouseOver={() => {
                setRowFourArrows(false);
            }} onMouseLeave={() => {
                setRowFourArrows(true)
            }} className="d-flex gap-1 mt-4 mb-5">
                {myState.map(item => {
                    return <VideoCollection item={item} displayRemoveButton="block" displayButton={"none"} randomNumber={props.randomNumber} key={makeid(20)}
                                            img_src={!item?.backdrop_path ? defaultPicture : backdropPath + item?.backdrop_path}/>
                })}

                <div className="arrow-buttons d-flex">
                    {row4Page > 1 && !rowFourArrows &&
                        <FontAwesomeIcon onClick={rowOneLeft} icon={faAngleLeft} className={"left-arrow"}
                                         color="white"
                                         size="3x"/>}
                    {row4Page < totalMyListPages ** !rowFourArrows &&
                        <FontAwesomeIcon onClick={rowOneRight} icon={faAngleRight} className={"right-arrow"}
                                         color="white"
                                         size="3x"/>}
                </div>
            </div>
        </div>}
    </>)
}
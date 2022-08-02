import VideoCollection from "../../VideoCollection/video-collection";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import apiContext from "../../../context/apiContext";

export default function Trending() {

    const context = useContext(apiContext)
    const {trendingNetflix, fetch_Trending, backdropPath, totalPages,  animationMarginOnLargerScreen,animationMarginOnNormalScreen} = context

    useEffect(() => {
        fetch_Trending()
        // eslint-disable-next-line
    }, []);
    const [row2Page, setRow2Page] = useState(1);
    const [rowTwoArrows, setRowTwoArrows] = useState(true);
    const [rowTwoMargin, setRowTwoMargin] = useState(0);


    function rowTwoRight() {
        if (window.screen.width > 1400) {
            document.getElementById("box-2").style.marginLeft = rowTwoMargin - animationMarginOnLargerScreen + "rem"
            setRowTwoMargin(rowTwoMargin - animationMarginOnLargerScreen)
        } else {
            document.getElementById("box-2").style.marginLeft = rowTwoMargin - animationMarginOnNormalScreen + "rem"
            setRowTwoMargin(rowTwoMargin - animationMarginOnNormalScreen)
        }
        setRow2Page(row2Page + 1)
    }

    function rowTwoLeft() {
        if (window.screen.width > 1400) {
            document.getElementById("box-2").style.marginLeft = rowTwoMargin + animationMarginOnLargerScreen + "rem"
            setRowTwoMargin(rowTwoMargin + animationMarginOnLargerScreen)
        } else {
            document.getElementById("box-2").style.marginLeft = rowTwoMargin + animationMarginOnNormalScreen + "rem"
            setRowTwoMargin(rowTwoMargin + animationMarginOnNormalScreen)
        }
        setRow2Page(row2Page - 1)
    }

    return (<>
        {/*TRENDING NOW ON NETFLIX*/}


        <div className="container-fluid position-absolute row-2 px-5" style={{marginTop: "7rem"}}>
            <h2 className="text-light popular-title">Trending Now</h2>
            <div id={"box-2"} onMouseOver={() => {
                setRowTwoArrows(false);
            }} onMouseLeave={() => {
                setRowTwoArrows(true)
            }} className="d-flex gap-1 mt-4 mb-5">
                {trendingNetflix.map(item => {
                    return <VideoCollection className={"row1Card"} key={item.id}
                                            img_src={backdropPath + item.backdrop_path}/>
                })}

                <div className="arrow-buttons d-flex">
                    {row2Page > 1 && !rowTwoArrows &&
                        <FontAwesomeIcon onClick={rowTwoLeft} icon={faAngleLeft} className={"left-arrow"}
                                         color="white"
                                         size="3x"/>}
                    {row2Page < totalPages ** !rowTwoArrows &&
                        <FontAwesomeIcon onClick={rowTwoRight} icon={faAngleRight} className={"right-arrow"}
                                         color="white"
                                         size="3x"/>}
                </div>
            </div>
        </div>
    </>)
}
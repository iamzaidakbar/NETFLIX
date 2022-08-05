import VideoCollection from "../../VideoCollection/video-collection";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import apiContext from "../../../context/apiContext";

export default function Top10() {

    const defaultPicture = "https://occ-0-3213-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVnUoqO98RZgU7QYapJnbAGPYxdWzxFORcnnyXL7_irTpxkSTU3S3k8BUqORLhVtJfNUxAJO3uyz_za9ReIn7Ah6Lhywb9ueq8ApJ_d6NRFR07GibgivxoGz7a27rs3KH-nS.jpg?r=ad9"

    const context = useContext(apiContext)
    const {
        topRatedMovie,
        fetch_Top_Rated,
        backdropPath,
        animationMarginOnLargerScreen,
        animationMarginOnNormalScreen
    } = context

    useEffect(() => {
        fetch_Top_Rated()
        // eslint-disable-next-line
    }, []);


    const [row3Page, setRow3Page] = useState(1);
    const [rowThreeMargin, setRowThreeMargin] = useState(0);
    const [rowThreeArrows, setRowThreeArrows] = useState(true);


    function rowThreeRight() {
        if (window.screen.width > 1400) {
            document.getElementById("box-3").style.marginLeft = rowThreeMargin - animationMarginOnLargerScreen + "rem"
            setRowThreeMargin(rowThreeMargin - animationMarginOnLargerScreen)
        } else {
            document.getElementById("box-3").style.marginLeft = rowThreeMargin - animationMarginOnNormalScreen + "rem"
            setRowThreeMargin(rowThreeMargin - animationMarginOnNormalScreen)
        }
        setRow3Page(row3Page + 1)
    }

    function rowThreeLeft() {
        if (window.screen.width > 1400) {
            document.getElementById("box-3").style.marginLeft = rowThreeMargin + animationMarginOnLargerScreen + "rem"
            setRowThreeMargin(rowThreeMargin + animationMarginOnLargerScreen)
        } else {
            document.getElementById("box-3").style.marginLeft = rowThreeMargin + animationMarginOnNormalScreen + "rem"
            setRowThreeMargin(rowThreeMargin + animationMarginOnNormalScreen)
        }
        setRow3Page(row3Page - 1)
    }


    return (<>
        {/*  TOP 10 MOVIES  */}

        <div className="container-fluid position-absolute row-3 px-5" style={{marginTop: "20.5rem"}}>
            <h2 className="text-light popular-title">Top 10 Movies</h2>
            <div id={"box-3"} onMouseOver={() => {
                setRowThreeArrows(false);
            }} onMouseLeave={() => {
                setRowThreeArrows(true)
            }} className="d-flex gap-1 mt-4 mb-5">
                {topRatedMovie.map(item => {
                    return <VideoCollection item={item} key={item.id}
                                            img_src={item?.backdrop_path === null ? defaultPicture : backdropPath + item?.backdrop_path}/>
                })}

                <div className="arrow-buttons d-flex">
                    {row3Page > 1 && !rowThreeArrows &&
                        <FontAwesomeIcon onClick={rowThreeLeft} icon={faAngleLeft} className={"left-arrow"}
                                         color="white"
                                         size="3x"/>}
                    {row3Page < 2 ** !rowThreeArrows &&
                        <FontAwesomeIcon onClick={rowThreeRight} icon={faAngleRight} className={"right-arrow"}
                                         color="white"
                                         size="3x"/>}
                </div>
            </div>
        </div>
    </>)
}
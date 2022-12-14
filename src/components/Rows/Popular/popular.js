import VideoCollection from "../../VideoCollection/video-collection";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import apiContext from "../../../context/apiContext";

export default function Popular(props) {
    const defaultPicture = "https://occ-0-3213-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVnUoqO98RZgU7QYapJnbAGPYxdWzxFORcnnyXL7_irTpxkSTU3S3k8BUqORLhVtJfNUxAJO3uyz_za9ReIn7Ah6Lhywb9ueq8ApJ_d6NRFR07GibgivxoGz7a27rs3KH-nS.jpg?r=ad9"
    const context = useContext(apiContext)
    const {
        popularNetflix,
        fetch_popular,
        backdropPath,
        totalPages,
        animationMarginOnLargerScreen,
        animationMarginOnNormalScreen
    } = context

    useEffect(() => {
        fetch_popular()
        // eslint-disable-next-line
    }, []);


    const [rowOneMargin, setRowOneMargin] = useState(0);
    const [row1Page, setRow1Page] = useState(1);
    const [rowOneArrows, setRowOneArrows] = useState(true);

    function rowOneRight() {
        if (window.screen.width > 1400) {
            document.getElementById("box-1").style.marginLeft = rowOneMargin - animationMarginOnLargerScreen + "rem"
            setRowOneMargin(rowOneMargin - animationMarginOnLargerScreen)
        } else {
            document.getElementById("box-1").style.marginLeft = rowOneMargin - animationMarginOnNormalScreen + "rem"
            setRowOneMargin(rowOneMargin - animationMarginOnNormalScreen)
        }
        setRow1Page(row1Page + 1)
    }

    function rowOneLeft() {
        if (window.screen.width > 1400) {
            document.getElementById("box-1").style.marginLeft = rowOneMargin + animationMarginOnLargerScreen + "rem"
            setRowOneMargin(rowOneMargin + animationMarginOnLargerScreen)
        } else {
            document.getElementById("box-1").style.marginLeft = rowOneMargin + animationMarginOnNormalScreen + "rem"
            setRowOneMargin(rowOneMargin + animationMarginOnNormalScreen)
        }
        setRow1Page(row1Page - 1)
    }

    return (<>
        <div style={{marginTop: "-7rem"}} className="container-fluid position-absolute px-5">
            <h2 className="text-light popular-title">Popular on Netflix</h2>
            <div id={"box-1"} onMouseOver={() => {
                setRowOneArrows(false);
            }} onMouseLeave={() => {
                setRowOneArrows(true)
            }} className="d-flex gap-1 mt-4 mb-5">
                {popularNetflix.map(item => {
                    return <VideoCollection item={item} randomNumber={props.randomNumber} key={item.id}
                                            img_src={item?.backdrop_path === null ? defaultPicture : backdropPath + item?.backdrop_path}/>
                })}

                <div className="arrow-buttons d-flex">
                    {row1Page > 1 && !rowOneArrows &&
                        <FontAwesomeIcon onClick={rowOneLeft} icon={faAngleLeft} className={"left-arrow"}
                                         color="white"
                                         size="3x"/>}
                    {row1Page < totalPages ** !rowOneArrows &&
                        <FontAwesomeIcon onClick={rowOneRight} icon={faAngleRight} className={"right-arrow"}
                                         color="white"
                                         size="3x"/>}
                </div>
            </div>
        </div>
    </>)
}
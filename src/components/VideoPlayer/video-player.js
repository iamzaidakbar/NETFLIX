import React from 'react'
import ReactPlayer from 'react-player'


export default function VideoPlayer(props) {

    return (
        <>
            <div id={"video-player"} className="video-player">
                <ReactPlayer
                    id={"video"}
                    url={props.url}
                    width={props.width}
                    height={props.height}
                    playing={true}
                    controls={false}
                    loop={true}
                    volume={props.volume}
                    playsinline={true}/>
            </div>
        </>
    )
}
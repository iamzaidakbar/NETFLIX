import React, {useContext, useEffect} from "react";
import apiContext from "../../context/apiContext";
import VideoCollection from "../VideoCollection/video-collection";

export default function SearchContent(props) {
    const defaultPicture = "https://occ-0-3213-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVnUoqO98RZgU7QYapJnbAGPYxdWzxFORcnnyXL7_irTpxkSTU3S3k8BUqORLhVtJfNUxAJO3uyz_za9ReIn7Ah6Lhywb9ueq8ApJ_d6NRFR07GibgivxoGz7a27rs3KH-nS.jpg?r=ad9"

    const context = useContext(apiContext)
    const {backdropPath, fetchAllVideos, filterVideos} = context
    useEffect(() => {
        fetchAllVideos()
        // eslint-disable-next-line
    }, []);


    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    return(
        <>
            {filterVideos && <div className="search-content-wrapper">
                {filterVideos.map(item => {
                    return <VideoCollection randomNumber={props.randomNumber} key={makeid(20)}
                                            img_src={ item.backdrop_path === null ? defaultPicture : backdropPath + item.backdrop_path}/>
                })}
                {filterVideos.length <1 && <div className="container-fluid no-results d-flex justify-content-center">
                    <p>Your search did not find any matches.</p>
                    <p>Suggestions:</p>
                    <ul>
                        <li>
                            Try different keywords
                        </li>
                        <li>
                            looking for a movie or a TV show?
                        </li>
                        <li>
                            Try using a movie, TV show title, an actor or director.
                        </li>
                        <li>
                            Try a genre, such as comedy, romance, sports or drama.
                        </li>
                    </ul>
                </div>}
            </div>}

        </>
    )
}
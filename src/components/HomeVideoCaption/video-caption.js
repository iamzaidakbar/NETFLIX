import logo from "../../Logo/netflix-small-logo.svg"
import {useEffect} from "react";
export default function VideoCaption(props) {
    useEffect(() => {
      setTimeout(()=>{
          document.getElementById("homeTitle").style.fontSize = "5rem"
      },4000)
    }, []);

    return(
        <>
          <div className="caption-wrapper p-3">
               <div className="logo-wrapper d-flex align-items-center">
                   <div><img src={logo} alt="..."/></div>
                <div><p className="pb-0 pt-3">SERIES</p></div>
               </div>
              <div className="title-description-wrapper">
                  <h2 id={"homeTitle"} className="mt-2 mb-3">{props.title}</h2>
                   <h5 className="mt-5">{props.description}</h5>
              </div>
          </div>
        </>
    )
}
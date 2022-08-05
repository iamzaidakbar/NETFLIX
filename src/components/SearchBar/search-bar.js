import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import apiContext from "../../context/apiContext";

export default function SearchBar() {

    const context = useContext(apiContext)
    const {handleSearchChange} = context

    return (<>
        <div data-placement="top"
             title="Search for Titles, peoples, genres..."
             data-animation={true} className={"d-flex search_wrapper align-items-center"}>
            <input id="search" autoFocus={true} onChange={handleSearchChange}
                   type="search" placeholder={"Titles, peoples, genres"} className="search_bar ps-5"/>
            <FontAwesomeIcon
                className="search_icon_bar ps-1" color={"white"} icon={faSearch}/>
        </div>
    </>)
}
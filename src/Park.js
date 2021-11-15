import React, { useEffect, useState } from "react";
import "../src/Style/ParkStyle.css"
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"
import axios from "axios"


function Park(props) {
    const key = "uoLqD9IwPhcoCzwooT7klUje0eZZk7JRmGTgtXds";
    const [parks, setParks] = useState([]);
    let { id } = useParams();


    useEffect(() => {
        axios.get('https://developer.nps.gov/api/v1/activities/parks/?id=' + id + 'limit=600&api_key=' + key).then(
            information => {
                setParks(information.data.data.map(element => ({ name: element.name, parks: element.parks.map(park => ({ fullName: park.fullName, parkCode: park.parkCode })) })));
            }

        );

    }, []);

    return <div className="activity">
        {/* <h3 onClick={() => props.parkCodeHandler(props.parkCode, props.fullName)}><Link to={"/info/" + props.parkCode}>{props.fullName}</Link></h3> */}
        {parks.map(activity => (
            <div>
                <div className="parkInfoTitle">
                <h1>Parks that Offer {activity.name}</h1>   
                </div>   
                <ul>  
            {activity.parks.map(park =>
                <li className="parkList" onClick={() => props.parkCodeHandler(park.parkCode, park.fullName)}><Link to={"/info/" + id +"/"+ park.parkCode}>{park.fullName}</Link></li>
                )
              }  </ul></div>

        ))}

    </div>

};

export default Park;
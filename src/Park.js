import React, { useEffect, useState } from "react";
import "../src/Style/ParkStyle.css"
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"


function Park (props){

    return <div className="activity">
        <h3 onClick={()=>props.parkCodeHandler(props.parkCode, props.fullName)}><Link to={"/info/" + props.parkCode}>{props.fullName}</Link></h3>
        

    </div>

};

export default Park;
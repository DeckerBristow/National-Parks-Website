import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Activity from "./Activity";


const ActivityInfo = props => {

   

    return(
        <div>
            <p>{props.n}</p>
            <Link to="/">Home Page</Link>
        </div>
    )
    };


export default ActivityInfo;
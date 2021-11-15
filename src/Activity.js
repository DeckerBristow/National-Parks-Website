import React, { useEffect, useState } from "react";
import "../src/Style/ActivityStyle.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"


function Activity (props){



    return <div className="activity">

        <li ><Link to={"/activity/"+props.id}>{props.name}</Link></li>

    </div>

};

export default Activity;
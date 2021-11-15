import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import Park from "./Park";
import axios from "axios"
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"
import "../src/Style/AppStyle.css"
import Images from "./Images";
import ParkInfo from "./ParkInfo";


function App() {



    const [activities, setActivities] = useState([]);
    const [parks, setParks] = useState([]);
    const [parkCode, setParkCode] = useState("");
    const [parkName, setParkName] = useState("");

    const [filter, setFilter] = useState("");


    const key = "uoLqD9IwPhcoCzwooT7klUje0eZZk7JRmGTgtXds";


    const parksHandler = (parks, activityName, ID) => {
        setParks(parks)
    };

    const parkCodeHandler = (code, name) => {
        setParkCode(code)
        setParkName(name)

    };

    const unfilter = () =>{
        axios.get("https://developer.nps.gov/api/v1/activities/parks?limit=600&api_key=" + key).then(
            information => {
                setActivities(information.data.data.map(element => ({ name: element.name, parks: element.parks.map(park => ({ fullName: park.fullName, parkCode: park.parkCode })) })));
            }

        ); 

    }

    useEffect(() => {
        axios.get("https://developer.nps.gov/api/v1/activities/parks?limit=600&api_key=" + key).then(
            information => {
                setActivities(information.data.data.map(element => ({id:element.id, name: element.name, parks: element.parks.map(park => ({ fullName: park.fullName, parkCode: park.parkCode })) })));
            }

        );

        axios.get("https://developer.nps.gov/api/v1/parks?limit=600&api_key=" + key).then(
            information => {
                setParks(information.data.data.map(element => ({ fullName: element.fullName, parCode: element.parkCode })));
            }
        );


    }, []);


    return (
        <div className="wholeThing">
            <div className="mostOfIt">
                <Router>

                    <Switch>
                        <Route exact path="/info/:id/:code">
                            <div>
                                <div className="images">
                                    <ParkInfo parkCode={parkCode} fullName={parkName} />

                                </div>

                            </div>
                        </Route>
                        <Route exact path="/images/:id/:code">
                            <div>

                                <div className="images">
                                    <Images parkCode={parkCode} fullName={parkName} />

                                </div>

                            </div>
                        </Route>
                        <Route exact path={"/activity/:id"}>
                            <div>

                                <Link to="/">Home Page</Link>
                                
                                <Park parkCodeHandler={parkCodeHandler}/>

                                {/* <ul className="parksArray">
                                    {parks.map(element => (
                                        <li>
                                            <Park parkCodeHandler={parkCodeHandler} fullName={element.fullName} parkCode={element.parkCode} />
                                        </li>
                                    ))}
                                </ul> */}

                            </div>
                        </Route>
                        <Route exact path="/">
                            <div>
                                <div className="activitiesHeader">
                                    <h1>Activities</h1>
                                </div>
                                <input type='text' placeholder="Search Activities" value={filter} onChange={e => setFilter(e.target.value)} />
                                <button
                                    onClick={() => {
                                        setActivities(activities.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())))
                                    }}
                                >Filter</button>
                                <button
                                    onClick={() => {
                                        unfilter();
                                        setFilter("");
                                    }}
                                >Clear Filter</button>
                                <div className="activitiesArray">
                                    {activities.map(element => (
                                        <ul>
                                            <Activity parksHandler={parksHandler} id={element.id}  name={element.name} parks={element.parks} code={element}/>
                                        </ul>
                                    ))}


                                </div>

                            </div>
                        </Route>
                    </Switch>
                </Router>


            </div>
        </div>
    )
};


export default App;
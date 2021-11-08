import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import Park from "./Park";
import axios from "axios"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "../src/Style/AppStyle.css"
import Images from "./Images";
import firestore from "./firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import ParkInfo from "./ParkInfo";


function App() {

    const [fireActs, setFireActs] = useState([]);
    useEffect(() => {
        let stuff = collection(firestore, "Activities");
        getDocs(stuff).then(snapshot => {
            //array of all the documents
            let tempPosts = []
            snapshot.forEach(document => {
                tempPosts.push(document.data());
            });
            setFireActs(tempPosts);
        });

    }, []
    );

    const [activities, setActivities] = useState([]);
    const [counter, setCounter] = useState(0);
    const [parks, setParks] = useState([]);
    const [parkCode, setParkCode] = useState("");
    const [parkName, setParkName] = useState("");

    const key = "uoLqD9IwPhcoCzwooT7klUje0eZZk7JRmGTgtXds";


    const parksHandler = (data) => {
        setParks(data)
    };

    const parkCodeHandler = (code, name) => {
        setParkCode(code)
        setParkName(name)

    };

    useEffect(() => {
        setCounter(counter + 10);
        axios.get("https://developer.nps.gov/api/v1/activities/parks?limit=600&api_key=" + key).then(
            information => {
                setActivities(information.data.data.map(element => ({ name: element.name, parks: element.parks.map(park => ({ fullName: park.fullName, parkCode: park.parkCode })) })));
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
                        <Route exact path="/info/:id">
                            <div>
                                <Link to="/activity">Activities</Link>
                                <div className="images">
                                    <ParkInfo parkCode={parkCode} fullName={parkName} />

                                </div>

                            </div>
                        </Route>
                        <Route exact path="/images">
                            <div>
                                <Link to="/info">Back</Link>

                                <div className="images">
                                    <Images parkCode={parkCode} fullName={parkName} />

                                </div>

                            </div>
                        </Route>
                        <Route exact path="/activity">
                            <div>
                                <Link to="/">Home Page</Link>
                                <h1>Parks that offer</h1>
                                <div className="parksArray">
                                    {parks.map(element => (
                                        <div>
                                            <Park parkCodeHandler={parkCodeHandler} fullName={element.fullName} parkCode={element.parkCode} />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </Route>
                        <Route exact path="/">
                            <div>
                                <div className="activitiesHeader">
                                    <h1>Activities</h1>
                                </div>
                                <div className="activitiesArray">
                                    {activities.map(element => (
                                        <ul>
                                            <Activity parksHandler={parksHandler} name={element.name} parks={element.parks} />
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

import React, { useEffect, useState } from "react";
import "../src/Style/ParkInfoStyle.css"
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"
import axios from "axios"


function ParkInfo() {
    let { id, code } = useParams();

    const [info, setInfo] = useState([]);

    const key = "uoLqD9IwPhcoCzwooT7klUje0eZZk7JRmGTgtXds";


    useEffect(() => {


        axios.get("https://developer.nps.gov/api/v1/parks?parkCode=" + code + "?limit=600&api_key=" + key).then(
            information => {

                setInfo(information.data.data.map(element => ({
                    directionsInfo: element.directionsInfo,
                    fullName: element.fullName,
                    phoneNumber: element.contacts.phoneNumbers[0].phoneNumber, description: element.description, activities: element.activities.map(activity => ({ name: activity.name })),
                    imageUrls: element.images.map(image => ({ credit: image.credit, title: image.title, url: image.url }))
                })));
                //console.log(information.data.data[0].images[0].url)
                //setImageUrls(information.data.data.images.map(element => ({url: element.url })));
            }
        );


    }, []);

    return <div className="activity">

        <div>

            {info.map(element => (
                <div>
                    <Link to={"/activity/" + id}>Back</Link>

                    <div className="parkInfoTitle">
                        <h1>{element.fullName}</h1>
                    </div>
                    <h3><Link to={"/images/" + id +"/"+ code}>Images and web cams</Link></h3>
                    <p>{element.description}</p>
                    <h4>Acivities at {element.fullName}</h4>
                    <ul>{element.activities.map(item => <li>{item.name}</li>)}</ul>
                    <p>Directions: {element.directionsInfo}</p>
                    <p>Phone Number: {element.phoneNumber}</p>

                    <div className="mySlides">{element.imageUrls.map(item =><div> 
                        <p className="mySlides">{item.title}</p>
                        <p className="mySlides">Credit: {item.credit}</p>
                        <div className="mySlides">
                        <img src={item.url} />
                        </div>

                    </div>
                    )}</div>

                </div>
            ))}
        </div>

    </div >

};

export default ParkInfo;
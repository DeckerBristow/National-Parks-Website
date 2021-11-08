import React, { useEffect, useState } from "react";
import "../src/Style/ParkInfoStyle.css"
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"
import axios from "axios"


function ParkInfo(props) {
    let { id } = useParams();

    const [info, setInfo] = useState([]);

    const key = "uoLqD9IwPhcoCzwooT7klUje0eZZk7JRmGTgtXds";
    const [parkCode, setParkCode] = useState(id);
    const [parkName, setParkName] = useState(props.fullName);


    useEffect(() => {
        setParkCode(id);
        setParkName(props.fullName);


        axios.get("https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "?limit=600&api_key=" + key).then(
            information => {
                setInfo(information.data.data.map(element => ({
                    description: element.description, activities: element.activities.map(activity => ({ name: activity.name })),
                    imageUrls: element.images.map(image => ({ title: image.title, url: image.url }))
                })));
                //console.log(information.data.data[0].images[0].url)
                //setImageUrls(information.data.data.images.map(element => ({url: element.url })));
            }
        );


    }, []);

    return <div className="activity">
        <h1>{parkName}</h1>
        <h3><Link to="/images">Images and LiveStreams</Link></h3>
        <div>
            {info.map(element => (
                <div>
                    <p>{element.description}</p>
                    <h5>Acivities at {parkName}</h5>
                    <ul>{element.activities.map(item => <li>{item.name}</li>)}</ul>

                    <div>{element.imageUrls.map(item => <div><div> <div className="mySlides">
                        {/* <div className="numbertext">1 / 3</div> */}
                        <img src={item.url} />
                    </div>

                        <a class="prev" onclick="plusSlides(-1)"></a>
                        <a class="next" onclick="plusSlides(1)"></a>
                    </div><div>
                            <span class="dot" onclick="currentSlide(1)"></span>
                            
                        </div></div>
                        )}</div>

                </div>                
            ))}
    </div>

    </div >

};

export default ParkInfo;
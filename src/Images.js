import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import axios from "axios"
import "../src/Style/ImageStyle.css"



function Images(props) {
    const [images, setImages] = useState([]);
    const [info, setInfo] = useState([]);


    const key = "uoLqD9IwPhcoCzwooT7klUje0eZZk7JRmGTgtXds";
    const [parkCode, setParkCode] = useState(props.parkCode);
    const [parkName, setParkName] = useState(props.fullName);



    useEffect(() => {
        setImages([]);
        setParkCode(props.parkCode);
        setParkName(props.fullName);

        axios.get("https://developer.nps.gov/api/v1/webcams?parkCode=" + parkCode + "?limit=600&api_key=" + key).then(
            information => {
                setImages(information.data.data.map(element => ({ title: element.title, url: element.url, imageUrls: element.images.map(image => ({ url: image.url })) })));
                //console.log(information.data.data[0].images[0].url)
                //setImageUrls(information.data.data.images.map(element => ({url: element.url })));
            }
        );

    }, []);


    return <div className="activity">
        <h3>{parkName}</h3>
        <div className="images">
            {images.map(element => (
                <div className="mySlides">
                    <a target="_blank" href={element.url}>{element.title} { } LiveStream: { }</a>
                    <p> {element.imageUrls.length > 0 ? element.title : null}</p>
                    {element.imageUrls.map(item => <img src={item.url} />)}
                </div>
            ))}
        </div>


    </div>

};

export default Images;
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"
import axios from "axios"
import "../src/Style/ImageStyle.css"



function Images(props) {
    let { id, code } = useParams();

    const [images, setImages] = useState([]);


    const key = "uoLqD9IwPhcoCzwooT7klUje0eZZk7JRmGTgtXds";
    const [parkName, setParkName] = useState([]);



    useEffect(() => {
        setImages([]);

        axios.get("https://developer.nps.gov/api/v1/parks?parkCode=" + code + "?limit=600&api_key=" + key).then(
            information => {

                setParkName(information.data.data.map(element => ({fullName: element.fullName})));
            }
        );



        axios.get("https://developer.nps.gov/api/v1/webcams?parkCode=" + code + "?limit=600&api_key=" + key).then(
            information => {
                setImages(information.data.data.map(element => ({ title: element.title, url: element.url, imageUrls: element.images.map(image => ({ url: image.url })) })));
            }
        );

    }, []);


    return <div className="activity">
        <Link to={"/info/" + id + "/" + code}>Back</Link>

        <div className="parkNameHeader">
            {parkName.map(element => (
            <h1>{element.fullName}</h1>

            ))}
        </div>
        <div className="images">
            {images.map(element => (
                <div className="mySlides">
                    <a target="_blank" href={element.url}>{element.title} { } LiveStream: { }</a>
                    <p> {element.imageUrls.length > 0 ? element.title : null}</p>
                    {element.imageUrls.map(item => <img src={item.url} />)}

                </div>
            ))}
            <p> {images.length === 0 ? "No web cams available" : null}</p>

        </div>


    </div>

};

export default Images;
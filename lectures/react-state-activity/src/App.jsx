import React, {useState, useEffect} from "react";
import Carousel from "./Carousel";
import Gaalleries from "./Galleries";
import "./App.css";
import Galleries from "./Galleries";

export default function App() {
    let [activeIndex, setActiveIndex] = useState(0);
    let  [photos, setPhotos] = useState([]);

    async function getFlickrPhotos() {
      const url = galleries[activeIndex].endpoint;
      const response = await fetch(url);
      const arrOfObjects = await response.json();
      const arrOfStrings = arrOfObjects.map(obj => obj.img_url);
      console.log(arrOfStrings);
      setPhotos(arrOfStrings);
    }

    useEffect(() => {
      getFlickrPhotos();
    }, [activeIndex])

    const galleries = [
      {
        name: "Cats",
        endpoint: "https://www.apitutor.org/flickr/simple/?tags=cat"
      },
      {
        name: "Dogs",
        endpoint: "https://www.apitutor.org/flickr/simple/?tags=dog"
      },
      {
        name: "Asheville",
        endpoint: "https://www.apitutor.org/flickr/simple/?tags=asheville"
      },
      {
        name: "Airplanes",
        endpoint: "https://www.apitutor.org/flickr/simple/?tags=airplane"
      },
      {
        name: "Space",
        endpoint: "https://www.apitutor.org/flickr/simple/?tags=space"
      }
    ];

    return (
        <div>
            <h1>This is a Gallery of Photos</h1>
            <Galleries 
              galleries={galleries} 
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            <Carousel photos={photos} />
        </div>
    );
}

import React, {useState} from "react"
export default function Galleries({galleries, activeIndex, setActiveIndex}) {

    function switchGallery(idx) {
        setActiveIndex(idx)
    }

    return (
        <>
            {
                galleries.map(function(gallery, idx) {
                    return (
                        <button 
                            
                            onClick={() => {switchGallery(idx)}}>{gallery.name} - {idx === activeIndex ? "actiive" : ""}</button>
                    )
                })
            }
        </>
    )
}
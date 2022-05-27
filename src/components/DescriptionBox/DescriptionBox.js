import React from "react";
import './DescriptionBox.css'

export default function DescriptionBox(props){
    return(
            <div className='desc_details'>
                <h4>{props.label}</h4>
                <p>{props.value}</p>
           
        </div>
    )
}


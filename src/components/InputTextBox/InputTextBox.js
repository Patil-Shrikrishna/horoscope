import React from "react";
import './InputTextBox.css'
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";  
import "primeicons/primeicons.css";
export default function InputTextBox({label, ...rest}){
    return(
        <div className="inputbox">
            <h5>{label} :</h5>
            <InputText {...rest}/>
        </div>
    )
}
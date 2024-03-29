import React from 'react';
import { Button } from 'primereact/button';
import DescriptionBox from './components/DescriptionBox/DescriptionBox'
import InputTextBox from './components/InputTextBox/InputTextBox'
import './App.css';
import {getZodiacRange} from './utils';
import moment from 'moment';
import axios from "axios";
import validator from 'validator'
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';


function App() {
  const [formData, setFormData] = React.useState(() => {
    var oldData = localStorage.getItem("formData");
    console.log(oldData)
    return oldData ? JSON.parse(oldData) :
    { name:  "" , 
      email: "" , 
      sign:  "" , 
      date:  "" ,
      day:  ""
   }
  })
  const [isLoading, setIsLoading] = React.useState(false);
  
  const today = moment().format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, 'day');
  const tomorrow = moment().add(1, 'day');
  const yesterdayDate = yesterday.format("YYYY-MM-DD")
  const tomorrowDate = tomorrow.format("YYYY-MM-DD")

  
  const days = [
    {label :'Yesterday', value : yesterdayDate},
    {label :'Today', value : today},
    {label :'Tomorrow', value : tomorrowDate},
];

const zodiac = [
   {name: "Aries", value : "aries"},
   {name: "Taurus", value : "taurus"},
   {name: "Gemini", value : "gemini"},
   {name: "Cancer", value : "cancer"},
   {name: "Leo", value : "leo"},
   {name: "Virgo", value : "virgo"},
   {name: "Libra", value : "libra"},
   {name: "Scorpio", value : "scorpio"},
   {name: "Sagittarius", value : "sagittarius"},
   {name: "Capricorn", value : "capricorn"},
   {name: "Aquarius", value : "aquarius"},
   {name: "Pisces", value : "pisces"}
];



  const [altColor, setAltColor] = React.useState(() => JSON.parse(localStorage.getItem("alt") || false) || false)
  const [description, setDescription] = React.useState(() => {
    const oldDescription = localStorage.getItem("description");
    return oldDescription ? JSON.parse(oldDescription) : undefined
  })
    
  function handleChange(event){
    setFormData(prevFormData => {
      const {name, value} = event.target;
      const updatedState = {
          ...prevFormData,
          [name] :value
      }
      if(name==='date'){
        updatedState[name] = moment(value).format("YYYY-MM-DD")
        if (updatedState.date === today){
          updatedState.day = 'today'
        }else if (updatedState.date === yesterdayDate) {
          updatedState.day = 'yesterday'
        }else if (updatedState.date === tomorrowDate){
          updatedState.day = 'tomorrow'
        }
      } 
      
      localStorage.setItem("formData", JSON.stringify(updatedState))
      return updatedState
    })
  }
  function formSubmit(event){
    console.log("submit called");
    if(validateInput()){
      setIsLoading(true);
      handleApi();
    }
  }

const validateInput = () => {
  return (formData.name || alert("Please enter your name")) && 
    (validator.isEmail(formData.email) || alert("Enter valid email")) && 
    (formData.sign || alert("Select your zodiac sign")) &&
    (formData.date || alert("Select a day")) 
}
console.log(altColor)
  function handleApi(){
    const options = {
      method: 'POST',
      url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
      params: {sign: formData.sign, day: formData.day},
      headers: {
        'X-RapidAPI-Key': '4aab697e7bmsh121f1f8d100cdc4p1d0f2fjsn0e6331d63096',
        'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response);
      setDescription(()=>{
        const description = response.data.description
        localStorage.setItem("description", JSON.stringify(description))
        return description;
      });

      setAltColor(() => {
        const sign = formData.sign.toLowerCase().trim();
        const day = (moment(formData.date).format("D"));
        const month = (moment(formData.date).format("MMMM"));
        const year = (moment(formData.date).format("YYYY"));
          
        const isMatch = getZodiacRange(day, month, year, sign)
        localStorage.setItem("alt", isMatch);
        setIsLoading(false)
        return isMatch;
      })    
    }).catch(function (error) {
  console.error(error);
  setIsLoading(false)
  });
}
  
  function resetUserDetails(){
    console.log("Form Reset")
    setFormData({
      name:"",
      email:"",
      sign:"",
      date:""
    })
    setDescription(undefined);
  
}
  
  return (
    <div className={`main_container ${(altColor) ? "secondary" : "primary"}`}>
      <div className='info_container'>
        <form className='info_form' onSubmit={() => {}}>
          <div className='input_group'>
            <InputTextBox className="width"  label="Name" onChange={handleChange} name="name" value={formData.name} required/>  
            <InputTextBox className="width"  label="E-mail" onChange={handleChange} name="email" value={formData.email} required/>
            <div className='zodiac_sign'>
              <h5>Zodiac Sign :</h5>
                <Dropdown className='dropdown width' name="sign" value={formData.sign} options={zodiac} optionLabel="name" onChange={handleChange} placeholder="Select a sign" required/>
            </div>  
          </div>

          <div className='days_picker'>
          <div>
            <div className="card">
              <SelectButton name = "date" value={days.value} options={days} onChange={handleChange} optionLabel="label" />
            </div>
          </div>
          </div>
          <div className='button_group'>
            <Button onClick={formSubmit} type="submit" label='Submit' />
            <Button label='Reset' onClick={() => {resetUserDetails()}}/>
          </div>
        </form>
      </div>
      <div className="desc_container">
        {isLoading && <h1> Loading .... </h1>}
      </div>
      { !isLoading && <div className={description === undefined ? "hide" : "desc_container"} >
        <DescriptionBox label={"Name of the User :"} value={formData.name}/>
        <DescriptionBox label={"Horoscope date :"} value={formData.date} />
        <DescriptionBox label={"Horoscope sign :"} value={formData.sign}/>
        <DescriptionBox label={"Horoscope description :"} value={description}/>
      </div>}
    </div>
  );
}
export default App;
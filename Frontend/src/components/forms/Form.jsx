import React,{useState} from "react";
import "./form.css"
import radio from "../../RadiosData/radioData";
import RadioBox from "./RadioBox";
import Input from "./Input";
import Name from "./nameGender";
import Gender from "./Gender";



function Form(props){
    props.func(props.set);
    console.log(props.set) // this is for navbar status 
    let [formData, setFormData] = useState({
        Name:"",
        Gender:"",
        Age:"",
        OnThyroid:"",
        OnAntithyroidMedication:"",
        Sick:"",
        Pregnant:"",
        ThyroidSurgery:"",
        I131Treatment:"",
        Goitre:"",
        Tumor:"",
        Hypopituitary:"",
        Psych:"",
        TSH:"",
        T3:"",
        TT4:"",        
    });

    function Details(object){
        return(  <RadioBox yes={object.yes} no={object.no} key={object.key} name={object.name} set={formData} func={setFormData}/>);
    }

    function handleSubmit(event){
        event.preventDefault();
        setFormData({
            ...formData,
        });
        try {
            const response = fetch("",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log(formData);
    }

    return(
        
            <div className="con">
                <div className="main_form">
                    <form id="formList" onSubmit={handleSubmit}>
                    <div className="form">
                        <Name set={formData} func={setFormData} />
                        <Gender set={formData} func={setFormData}/>
                        <Input type="number" name="Age" key="Age" set={formData} func={setFormData}/>
                        {radio.map(Details)}
                        <Input name="TSH" key="TSH" set={formData} func={setFormData}/>
                        <Input name="T3" key="T3" set={formData} func={setFormData}/>
                        <Input name="TT4" key="TT4" set={formData} func={setFormData}/>                                   
                    </div>
                    <div className="button_class" >
                        <button className="_button" type="submit" value="Submit">Submit</button>
                    </div>
                    </form> 
                </div>
            </div>
        
    );
}
export default Form;
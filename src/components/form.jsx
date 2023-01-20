import firebase from "firebase/compat/app"
import { useEffect } from "react";
import { useState } from "react"
import { formItems } from "../jsonsito"
import style from "./styles/form.module.css"
import { db, } from "../firebase";
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { useHistory, useLocation } from "react-router-dom";

export const Form = ()=>{
    const history = useHistory()
    let initialState ={};
    const [data, setData] = useState({})
    const [loader, setLoader] = useState(false)
    
    useEffect(()=>{
        formItems.items.forEach(e =>{
            if(e.name) e.name === "terms_and_conditions"? initialState[e.name] = false: initialState[e.name] = "" 
            if(e.name && e.type === "select") initialState[e.name] = e.options[0].value  
        })
        setData(initialState)
        return ()=> setData({})
    },[])

    const handleInput = async (e)=>{
        if(e.target.name === "terms_and_conditions"){
            setData({...data, [e.target.name]: data[e.target.name] === true? false: true})
            return
    }
        setData({...data, [e.target.name]: e.target.value})
  
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoader(true)
        const fireConnection = getFirestore(db);
    try {
        const docRef = await addDoc(collection(fireConnection, "form"), data);
        console.log("Document written with ID: ", docRef.id);
        setLoader(false)
        history.push(`/Results/${docRef.id}`)
      } catch (error) {
            console.error("Error adding document: ", error);
            alert("something it's wrong, not sure what though")
            setLoader(false)
      }
    }  

    if(Object.keys(data).length){
    return(
        <div className={style.container}> 
            <form className={style.form} onSubmit={handleSubmit}>
                {formItems.items.map((e,i)=>
                     e.type === "submit"?<button className={!loader?style.button:style.buttonLoading} key={e.label}>{!loader && e.label}</button>:
                        <div className={style.item}  key={i}> 
                            <label className={style.label} htmlFor={e.name}>
                                {e.label}
                            </label>
                            {e.type === "select"? 
                                <select value={data[e.name]} onChange={handleInput} name={e.name} className={style.select} id={e.name}>
                                    {e.options.map(a => 
                                        <option key={a.label} label={a.label}>{a.value}</option>
                                    )}                        
                                </select>:
                                    e.type === "checkbox"?
                                    <input type={e.type} checked={data[e.name]} onChange={handleInput} value={data[e.name]} name={e.name} required={e.required} className={style.checkbox} id={e.name} ></input>:
                                            <input onChange={handleInput} name={e.name} value={data[e.name]} required={e.required} className={style.input} id={e.name} type={e.type}></input>}
                        </div>
                    )}
            </form>
        </div>
    )}
    else return <div>Loading</div>
}
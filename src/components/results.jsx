import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import style from "./styles/results.module.css"
import loader from "./styles/loader2.gif"
import { getDoc, doc, getFirestore, collection } from "firebase/firestore";
import { db } from "../firebase";

export const Results=()=>{
    
    const {id} = useParams()
    const [results, setResults] = useState({})
    const services = getFirestore();
    const colRef = collection(services,"form")
    const docRef = doc(services, "form", id)

    useEffect(()=>{
        (async function(){
           let a = await getDoc(docRef)
           setResults(a.data())
        }())
    },[])

    if(Object.keys(results).length){
    return(
        <main className={style.main}>
            <div className={style.container}>
                <h1 className={style.title1}>Your data</h1>
                { Object.keys(results).filter(e=> e !== "terms_and_conditions").map(e=>
                    <div className={style.item} key={e}>
                        <h2 className={style.title}>{e.includes("_")? e.replaceAll("_"," ") + ":" : e +":"}</h2>
                        <p className={style.result}>{results[e]}</p>
                    </div>
                ) }
            </div>
        </main>
    )}

    return <div className={style.main}><img src={loader}></img></div>
}
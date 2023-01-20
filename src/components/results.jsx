import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import style from "./styles/results.module.css"
import loader from "./styles/loader2.gif"

import { db } from "../firebase";

export const Results=()=>{

    const [results, setResults] = useState({})

    const {id} = useParams()

    useEffect(()=>{
        (async function(){
            console.log(id)
            const formCollection = db.collection("form")
             const a = await formCollection.doc(id).get()
             setResults(a.data())
        }())
    },[])

    if(Object.keys(results).length){
        console.log(Object.keys(results))
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
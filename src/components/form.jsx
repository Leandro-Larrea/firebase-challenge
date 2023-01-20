import firebase from "firebase/compat/app"
import { formItems } from "../jsonsito"
import style from "./styles/form.module.css"

export const Form = ()=>{
 console.log(formItems)
    return(
        <form className={style.form}>
            {formItems.items.map((e,i)=>
                 e.type === "submit"?<button key={e.label}>{e.label}</button>:
                    <div className={style.item}  key={i}> 
                        <label className={style.label} htmlFor={e.name}>
                            {e.label}
                        </label>
                        {e.type === "select"? 
                            <select className={style.select} id={e.name}>
                                {e.options.map(a => 
                                    <option key={a.label} label={a.label}>{a.value}</option>
                                )}                        
                            </select>:
                                <input required={e.required} className={e.type === "checkbox"?style.checkbox: style.input} id={e.name} type={e.type}></input>}
                    </div>
                )}
        </form>
    )
}
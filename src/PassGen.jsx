import { useCallback, useEffect, useState, useRef } from "react";
import './PassGen.css'

function PassGen(){
    const [range ,setRange] = useState(6)
    const [numbers ,setNumbers] = useState(false)
    const [character ,setCharacter] = useState(false)
    const [password,setPasssword] = useState("")

    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(()=>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numbers) str += "0123456789";
        if (character) str += "!@#$%^&*";

        for(let i=1 ; i<=range ; i++){
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        
        setPasssword(pass)

    },[range,numbers,character,setPasssword])

    const copyPasswordToClickboard = useCallback(()=>{
          passwordRef.current?.select();
          passwordRef.current.setSelectionRange(0,15)
          window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{
        passwordGenerator()} 
     , [range,numbers,character ])

     

    return(
        <>
         <div className="container">
            <h2 className="heading">Password Generator</h2>
            <div>
              <input type="text" 
                      placeholder="password"
                      value={password}
                     className="input"
                     readOnly
                     ref={passwordRef} 
                    />
                    </div>

                    <div>

                    <button
                       className="btn"
                        onClick = {copyPasswordToClickboard}
                          > Copy </button>
                   </div>


                 <div >
                 <input type="range" 
                        min={1}
                        max={15}
                        value = {range}
                        onChange={(e)=> {setRange(e.target.value)}}
                />
                    <label htmlFor="length" className="label">length  {range}</label>
                        

                 <input type="checkbox" 
                        value= {numbers}
                        className="checkbox"
                        onChange = { () => {
                               setNumbers((prev)=> !prev)}}
                        />
                   <label htmlFor="numbers">Numbers</label>     
                 
                 <input type="checkbox" 
                        value= {character}
                        className="checkbox"
                        onChange={()=>{
                            setCharacter((prev)=>!prev)
                        }}
                        />
                   <label htmlFor="numbers">Character</label>     
                 </div>
         </div>
        </>
    )
}
export default PassGen
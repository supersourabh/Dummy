import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { signupAction } from '../Actions/AllActions'
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading'

export default function RegisterScreen(props) {


    const [name, setName] = useState()
    const [rollNo, setRollNo] = useState()
    const [branch, setBranch] = useState("Mechanical")
    const [sem, setSem] = useState(1)
    const [cr, setCr] = useState(false)
    const [contact, setContact] = useState();


    const studentRegister = useSelector(state => state.studentRegister)
    const{ studentInfo ,success, error ,loading }=studentRegister;


    const dispatch = useDispatch()
   
    useEffect(() => {
        
        if(success){
            props.history.push("/")
        }
    }, [props.history, success])
   



    const studentInfoDetails={
        name , rollNo , branch , cr , sem ,contact,
     }
     
    const submitHandler=(e)=>{

        e.preventDefault()

        dispatch(signupAction(studentInfoDetails))

    }

    return (
        <div className="register">
        <form onSubmit={submitHandler}>
             <ul>
                    <li>
                        <h2>  Welcome to UVCESS</h2>
                        <h2> Signup here !</h2>
                        <text>Already have an account?<a style={{color : "green"}} href="/">click here</a></text>
                    </li>
                    {
                        loading ?<Loading/>:
                        error&& <Alerts info="danger" message={error} />
                    }
                    <li>
                        <label htmlFor="name"> Student Name : </label>
                        <input type="text" required placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="rollNo" > Student RollNo (like 18GAEM5555): </label>
                        <input type="text" required placeholder="Enter RollNo" value={rollNo} onChange={(e)=>setRollNo(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="Branch" > Branch : </label>
                        <select  required onChange={(e)=>setBranch(e.target.value)}>
                            <option value="Mechanical" >Mechanical</option>
                            <option value="Computer-Science">Computer-Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical-</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Information Science">Information Science</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="crSem" > Sem : </label>
                        <select value={sem} onChange={(e)=>setSem(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="cr" > Are you CR : </label>
                        <select value={cr} onChange={(e)=>setCr(e.target.value)}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </li>
                    {
                       cr?(
                        
                        <li>
                            <label htmlFor="contact">Contact(CR , only numbers) :</label>
                            <input type="tel"  onChange={(e)=>setContact(e.target.value)} maxLength="10" pattern="[0-9]{10}" placeholder="Enter Mobile-Number" />
                        </li>
                        
                        ):''
                    }
                    <li>
                        <button type="submit"  className="btn btn-success">submit</button>
                    </li>
                    
                </ul>
        </form>
        
           
        </div>
    )
}

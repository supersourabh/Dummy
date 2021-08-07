import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../Actions/AllActions';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading';
import MainScreenTags from '../HomeComponents/MainScreenTags';
import Lottie from 'react-lottie';
import lotti from "../HomeComponents/59446-black-guy-animation.json"
import lotti2 from "../HomeComponents/63228-man-watching-a-movie.json"

export default function HomeScreen(props) {

    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('')

    const studentLogin = useSelector(state => state.studentLogin)
    const { studentInfo, loading, error, success } = studentLogin;

    const dispatch = useDispatch()
    useEffect(() => {
        if (success) {
            props.history.push("/")
        }
    }, [props.history, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginAction(name, rollNo))
    }

    
    var isMobile = (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent)) ? true : false;


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lotti,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        }
    }
    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: lotti2,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        }
    }


    return (
        <>

            <div className="main-div" style={{height : isMobile?1300:670}}>

                {
                    studentInfo ? <MainScreenTags /> :
                        <div className="main-tags">
                            <form onSubmit={ (e) => submitHandler(e) }>
                                <ul>
                                    <li>
                                        <h2 >Welcome</h2>
                                        <h2>Login to continue !</h2>
                                    </li>

                                    {
                                        loading ? <Loading /> :
                                            error && <Alerts info="danger" message={ error } />
                                    }


                                    <li>
                                        <label htmlFor="name"> Student Name : </label>
                                        <input type="text" required value={ name } placeholder="Enter Name" onChange={ (e => setName(e.target.value)) } />
                                    </li>
                                    <li>
                                        <label htmlFor="rollNo"> Student RollNo : </label>
                                        <input type="text" required value={ rollNo } placeholder="Enter RollNo" onChange={ (e => setRollNo(e.target.value)) } />
                                    </li>
                                    <li>
                                        <button type="submit" className="btn btn-success">submit</button>
                                    </li>
                                    <div style={ { textIndent: 30 } }>

                                        Are you new here? <a style={ { color: "green", cursor: "pointer" } } onClick={ (e) => props.history.push("/signup") }> SignUp here ...</a>
                                    </div>


                                </ul>
                            </form>


                        </div>
                }
                <div className="main-picture" style={ { zIndex: 10000 } }>
                    <Lottie options={ defaultOptions } height={500}  />
                </div>
            </div>

           

        </>
    )
}

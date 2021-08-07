import React, { lazy, Suspense, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { materialAction } from '../Actions/AllActions';
import Alerts from '../HomeComponents/Alerts';
import Loading from '../HomeComponents/Loading';
import LazyLoad from "react-lazyload"
import SubjectsMaterial from '../HomeComponents/SubjectsMaterial';

//const SubjectsMaterial = lazy(()=>import ("../HomeComponents/SubjectsMaterial") );

export default function SubjectScreen(props) {
    const [sem, setSem] = useState(null)
    const [data, setData] = useState(null)
    const [src, setSrc] = useState()

    const material = useSelector(state => state.material);


    const { materialInfo, error, success, loading } = material;

    const studentLogin = useSelector(state => state.studentLogin)

    const { studentInfo } = studentLogin;


    const dispatch = useDispatch()

    const showHandler = (e) => {
        e.preventDefault()
        if(sem!==null){
            dispatch(materialAction(sem, studentInfo.branch, 1))
        }else{
            alert("Please fill all the fields..")
        }
    }




    return (
        <div className="sem">

            <select value={ sem } onChange={ (e) => setSem(e.target.value) }>
                <option value={null} selected>Select sem</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
            <button type="button" style={ { margin: 20 } } className="btn btn-info" onClick={ showHandler }>GET</button>

            <ul >
                {
                    loading ? <Loading /> :
                        error ? <Alerts info="danger" message={ error } /> : (
                            materialInfo.length === 0 ?
                                <li>
                                    <div><h4>No Material , Sorry ...!(click GET)</h4></div>
                                </li> :
                                materialInfo.map(item =>

                                    <li key={ item._id }>
                                        <div>
                                            <h6>Name of Subject:</h6> <b>{ item.subject }</b>
                                        </div>
                                        <div>
                                            <h6>Professor:</h6><b>{ item.professor }</b>
                                        </div>
                                        <div>
                                            <h6>Date : </h6><b>{ item.date.substring(0,10) } </b>
                                        </div>
                                        <div style={ { flexDirection: "row" } }>

                                            <button type="button" className="btn btn-success" onClick={ (e) => props.history.push(`/material/download/${item._id}/subjectScreen`) }>Download</button>

                                            <button style={ { marginLeft: 10 } } type="button" className="btn btn-warning" onClick={ (e) => props.history.push(`/material/view/${item._id}`) }>View</button>

                                        </div>
                                    </li>
                                )



                        ) }
            </ul>


        </div>
    )
}

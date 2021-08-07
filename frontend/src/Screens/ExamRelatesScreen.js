import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { syllabusAction } from '../Actions/AllActions'
import Alerts from '../HomeComponents/Alerts'
import Loading from '../HomeComponents/Loading'

export default function ExamRelatesScreen(props) {
    const [sem, setSem] = useState(null)
    const [timetable, setTimetable] = useState(null)

    const syllabusMaterial = useSelector(state => state.syllabusMaterial)
    const { materialSyllabusInfo, error, loading } = syllabusMaterial;

    const studentLogin = useSelector(state => state.studentLogin)
    const { studentInfo } = studentLogin;




    const dispatch = useDispatch()


    const showHandler = (e) => {
        e.preventDefault()
        if (timetable===null || sem===null) {
            alert("Select all fields...")
        } else {
            dispatch(syllabusAction(timetable, sem, studentInfo.branch))
        }
    }



    return (
        <div className="sem" >
            <select value={ timetable } onChange={ (e) => setTimetable(e.target.value) }>
                <option value={null} selected>Select Type</option>
                <option value="Question-Paper">Question-paper</option>
                <option value="Results">Results</option>
            </select>
            <select value={ sem } onChange={ (e) => setSem(e.target.value) }>
                <option value={null} selected >Select Sem</option>
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

            <ul>
                {
                    loading ? <Loading /> :
                        error ? <Alerts info="danger" message={ error } /> :
                            materialSyllabusInfo.length === 0 ?
                                <li>
                                    <div>
                                        <h4>Sorry...No Material(Click GET)</h4>
                                    </div>
                                </li> :
                                materialSyllabusInfo.map(item =>
                                    <li>
                                        <div>
                                            <h6>Type :</h6><b>{ item.type }</b>
                                        </div>
                                        {
                                            item.subject &&
                                            <div>
                                                <h6>Subject : </h6><b>{ item.subject }</b>
                                            </div>
                                        }
                                        <div>
                                            <h6>Date : </h6><b>{ item.date.substring(0,10)}</b>
                                        </div>
                                        <div style={ { flexDirection: "row" } }>


                                            <button type="button" className="btn btn-success" onClick={ (e) => props.history.push(`/material/download/${item._id}/resultScreen`) }>Download</button>

                                            <button style={ { marginLeft: 10 } } type="button" className="btn btn-warning" onClick={ (e) => props.history.push(`/material/view/${item._id}`) }>View</button>


                                        </div>
                                    </li>
                                )
                }


            </ul>


        </div>
    )
}

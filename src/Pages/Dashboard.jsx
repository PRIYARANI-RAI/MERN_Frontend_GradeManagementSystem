import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from 'react'
import { showlist } from "../Services/Auth.Services";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../Services/Auth.Services";
import { getToken } from '../Services/Auth.Services'
import { getTeacherInfo } from "../Services/Auth.Header";
import {PieChart,Pie,Tooltip} from 'recharts'

export default function Dashboard() {

    const nav = useNavigate();
    const [show, setShow] = useState([]);

    const showForm = () => {
        nav("/addstudent")
    }

    useEffect(() => {
        const showList = async () => {
            const result = await showlist()
            const arr = result.data.result;
            setShow(arr);
        }
        showList();
    }, [])
    useEffect(() => {
        const showtoken = async () => {
            const veritytoken = await getToken()
            // console.log(veritytoken)
        }
        console.log(getTeacherInfo())
        showtoken()
    }, [])
    const deleteData = async (_id) => {
        alert("Are you Sure?")
        const apiResponse = await deleteStudent(_id)
        console.log(apiResponse.data)
        window.location.reload();

    }
    return (
        <div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div>
                            <button className="btn btn-dark" onClick={showForm}>Add Student Marks
                            </button>
                        </div>
                    </div>

                </div>
                <div className="row mt-4">
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Photo</th>
                                <th>Email</th>
                                <th>Pie Chart</th>
                                <th>Percentage(%)</th>
                                <th>Grade</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {show.map((data, index) => {
                                const pieResult = [
                                    {name: "English", value: data.english},
                                    {name: "Maths", value: data.maths},
                                    {name: "Science", value: data.science},
                                    {name: "Hindi", value: data.hindi},
                                ]
                                console.log(data.english)
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{data.fullname}</td>
                                        <td><img src={data.image} style={{
                                        width: '200px',
                                        height: '200px'}} /></td>
                                        <td>{data.email}</td>
                                        <td><PieChart width={200} height={200}>
                                            <Pie
                                            dataKey="value"
                                            isAnimationActive={false}
                                            data={pieResult}
                                            cx="30%"
                                            cy="30%"
                                            outerRadius={50}
                                            fill="#319DA0"
                                            label
                                            />
                                            <Tooltip/>
                                            </PieChart></td>
                                        <td>{data.percentage}</td>
                                        <td>{data.grade}</td>
                                        
                                        <td><Link to={`/edit/${data._id}`} >Edit</Link>&nbsp;
                                            <button type="submit" className="btn btn-dark" onClick={() => deleteData(data._id)} >Delete</button></td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )
}

import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import {getStudentDetail,updateStudent} from "../Services/Auth.Services";


export default function EditStudent() {
    let { id } = useParams();
const navigate = useNavigate();
const [img,setImg] = useState();
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        cls: "",
        english: 0,
        maths: 0,
        science: 0,
        hindi: 0,
        image: null,
    })
// console.log("inputdata"
// ,input )
    const [valid, setValid] = useState({
        english: false,
        maths: false,
        science: false,
        hindi: false,
        englishError: "",
        mathsError: "",
        scienceError: "",
        hindiError: "",
    });

    // const [img, setImg] = useState();
    //  const [cls,setCls] = useState ()
    const handleChange = (e) => {
        setInput((previousValue) => ({
            ...previousValue,
            image: e.target.files[0],

        }))
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value
        }));

    };
    useEffect(() => {
        const test = async (id) => {
            const response = await getStudentDetail(id);
            setInput(() => ({
                fullname : response.data.data.fullname,
                email:  response.data.data.email,
                cls:  response.data.data.cls,
                english: response.data.data.english,
                maths: response.data.data.maths,
                science:  response.data.data.science,
                hindi: response.data.data.hindi,
                image:  response.data.data.image,
            }))
        }
        test(id);
    }, [])
    // console.log(input)
    const ValidateEnglish = (mark) => {
        if (mark > 100) {
            setValid({
                english: true,
                englishError: "Enter marks less than 100",
            });
        } else {
            setValid({
                english: false,
                englishError: "",
            });
        }
    };

    const ValidateMaths = (mark) => {
        if (mark > 100) {
            setValid({
                maths: true,
                mathsError: "Enter marks less than 100",
            });
        } else {
            setValid({
                maths: false,
                mathsError: "",
            });
        }
    };
    const ValidateScience = (mark) => {
        if (mark > 100) {
            setValid({
                science: true,
                scienceError: "Enter marks less than 100",
            });
        } else {
            setValid({
                science: false,
                scienceError: "",
            });
        }
    };
    const ValidateHindi = (mark) => {
        if (mark > 100) {
            setValid({
                hindi: true,
                hindiError: "Enter marks less than 100",
            });
        } else {
            setValid({
                hindi: false,
                hindiError: "",
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
console.log("click")
        const formdata = new FormData();
        console.log(formdata)
        formdata.append('image',input.image);
        formdata.append('fullname',input.fullname)
        formdata.append('cls',input.cls)
        formdata.append('email',input.email)
        formdata.append('english',input.english)
        formdata.append('maths',input.maths)
        formdata.append('science',input.science)
        formdata.append('hindi',input.hindi)
        try {
            console.log("Run update code here");
            const updateResponse = await updateStudent(formdata);
            
            if(updateResponse.data.status){
                setImg(updateResponse.data.path);
                navigate("/dashboard");
            }else{
                alert("update failed");
            }
            console.log(updateResponse);
            // const apiResponse = await uploadFile(formdata);
            // console.log("priya", apiResponse.data.message)
            // setImg(apiResponse.data.path);
            // navigate("/dashboard")
        } catch (e) {
            console.log(e, "error")
        }
      
    }

    return (
        <div className="container mt-4">


            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form action="" method="post" encType="multipart/form-data" className="form-control" onSubmit={(e) => handleSubmit(e)}>
                        <h3>Update Student Marks</h3>
                        <br />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Full Name</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={input.fullname}name="fullname" onChange={handleInputChange} />

                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="email" className="form-control" name="email" value={input.email}
                                        onChange={handleInputChange} />

                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Class</label>
                                </div>
                                <div className="col-md-8">
                                    <select name="cls" class="form-select" aria-label="Default select example" value={input.cls} onChange={(e) => handleInputChange(e)} >
                                        <option value="">Select Class</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Photo</label>
                                </div>
                                <div className="col-md-8">
                                    <img src={img} style={{
                                        width: '100px',
                                        height: '100px',
                                    }} />

                                    <input type="file" name="image" onChange={(e) => handleChange(e)} />
                                </div>

                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>English</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="english" onChange={handleInputChange} value={input.english} onBlur={(e) => ValidateEnglish(e.target.value)} />
                                    {valid.english && (
                                        <span className="text-danger">{valid.englishError}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <input type="read-only" className="form-control"
                                        value="100"  />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Maths</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="maths" value={input.maths} onChange={handleInputChange} onBlur={(e) => ValidateMaths(e.target.value)} />
                                    {valid.maths && (
                                        <span className="text-danger">{valid.mathsError}</span>
                                    )}

                                </div>
                                <div className="col-md-4">
                                    <input type="text disable" className="form-control"
                                        value="100" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Science</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" value={input.science} name="science" onChange={handleInputChange}
                                        onBlur={(e) => ValidateScience(e.target.value)} />
                                    {valid.science && (
                                        <span className="text-danger">{valid.scienceError}</span>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <input type="text disable" className="form-control"
                                        value="100"  />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Hindi</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="hindi" value={input.hindi} onChange={handleInputChange}
                                        onBlur={(e) => ValidateHindi(e.target.value)} />
                                    {valid.hindi && (
                                        <span className="text-danger">{valid.hindiError}</span>
                                    )}

                                </div>
                                <div className="col-md-4">
                                    <input type="text disable" className="form-control"
                                        value="100" />
                                </div>
                            </div>
                          
                            <br />
                            <div className="row">
                                <div>
                             
                                    <button type="submit" class="btn btn-dark"
                                    >Update Marks</button>

                                </div>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}


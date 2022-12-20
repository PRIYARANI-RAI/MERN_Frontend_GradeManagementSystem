import { login } from "../Services/Auth.Services";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userlogin } from "../Slice/authSlice";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        'email': '',
        'password': '',
    });

    const handleChange = (e) => {

        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await login(input);
            if (response.data.status === 200) {
                dispatch(userlogin(response.data));
                toast.success(response.data.message);
                navigate("/dashboard")
            }
                else{
             toast.error(response.data.message);     
            }
        } catch (e) {
            console.warn(e);
        }
    }

    return (
        <div className="container mt-4">
            <ToastContainer/>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form className="form-control"
                        onSubmit={(e) => handleSubmit(e)}>
                        <h3>Login Form</h3>
                        <br />
                        <div className="form-group">

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="email"
                                        className="form-control"
                                        onChange={handleChange}
                                        name="email" />

                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Password</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="password"
                                        className="form-control"
                                        onChange={handleChange}
                                        name="password" />
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div>
                                    <button type="submit"
                                        class="btn btn-success" >Login</button>
                                </div>
                            </div>

                        </div>
                    </form>

                </div>

            </div>
        </div>

    )
}

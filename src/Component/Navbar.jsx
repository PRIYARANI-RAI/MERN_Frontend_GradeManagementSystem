import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from '../Slice/authSlice'

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userdata = useSelector((state) => (state.auth))
    const handleLogout = () => {
        localStorage.clear();
        dispatch(userlogout())
        navigate("/")
    }
    return (

        <header id="header ">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <b className="navbar-brand" >Grade Management System</b>
                    <button className="navbar-toggler" type="button"
                        data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className='text-right'>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto " >
                                {userdata.isLoggedIn ? (
                                    <div>
                                        <button className="btn btn-md btn-success"
                                            onClick={handleLogout} >Logout</button>
                                    </div>
                                ) : (
                                    <Link to="login">
                                        <button className="btn btn-md btn-success m-2">
                                            Login</button>
                                    </Link>

                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <h1>Welcome to Grade Management System</h1>
        </header>
    )
}
export default Navbar;
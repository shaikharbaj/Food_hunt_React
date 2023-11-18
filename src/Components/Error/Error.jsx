import React from 'react'
import {useNavigate, useRouteError} from 'react-router-dom'
import Page_NOT_Found from '../../assets/page_not_found.png'
import './Error.css'
const Error = () => {
    const error = useRouteError();
    console.log(error)
    const navigate = useNavigate();
    return (
        <>
            <div className="error_wrapper">
            <header className='error_header'>
                <div className="head-text">
                    <p>404 Page Not Found</p>
                </div>
            </header>

            <main>
                <div className="main-wrapper">
                    <picture className="scarecrow-img">
                        <img src={Page_NOT_Found} alt="scarecrow" />
                    </picture>
                    <div className="error-text">
                        <h2>I have bad news for you</h2>
                        <p>The page you are looking for might be removed or is temporarily unvailable.</p>
                        <span className="input-group-btn">
                            <button onClick={()=>navigate("/")} className="error_page_btn" type="button">Back to homepage</button>
                        </span>
                    </div>
                </div>

            </main>
            </div>

        </>
    )
}
export default Error
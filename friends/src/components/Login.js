import React, { useState } from "react";
import axios from "axios";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChanges = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true);
        axiosWithAuth().post("/login", user)
        .then(response => {
            console.log(response)
            localStorage.setItem("token", response.data.payload);
            props.history.push("/friends")
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Username: </label>
                <input
                    type="text"
                    name="username"
                    onChange={handleChanges}
                    value={user.username}
                />
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChanges}
                    value={user.password}
                />
                <button>Log in</button>
                {isLoading && <p>Logging In...</p>}
            </form>
        </div>
    )

}

export default Login;
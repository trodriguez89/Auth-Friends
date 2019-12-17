import React, { useState, useEffect } from "react";

import NewFriendForm from "./NewFriendForm";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const Friends = (props) => {
    const [friends, setFriends] = useState([])

    useEffect(() => {
        axiosWithAuth().get("/friends")
            .then(response => {
                console.log(response)
                setFriends(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <NewFriendForm />
            {friends.map(item => (
                <div>
                <h3>{item.name}</h3>
                <h3>{item.age}</h3>
                <h3>{item.email}</h3>
                </div>
        ))}
        </div>

    );
}

export default Friends;


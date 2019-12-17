import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const NewFriendForm = () => {
    const [newFriend, setNewFriend] = useState({
        id: Date.now(),
        name: "",
        age: "",
        email: ""
    })

    const handleChanges = event => {
        setNewFriend({
            ...newFriend,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth().post("/friends", newFriend)
        .then(response => {
            console.log(response)
            setNewFriend({
                name: "",
                age: "",
                email: ""
            })
        })
        .catch(error => {
            console.log(error)
        })
    }


    return (
        <div>
            <h3>Add New Friend!</h3>
        <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input 
            type="text"
            onChange={handleChanges}
            value={newFriend.name}
            />
            <label>Age: </label>
            <input 
            type="num"
            onChange={handleChanges}
            value={newFriend.age}
            />
            <label>Email: </label>
            <input 
            type="email"
            onChange={handleChanges}
            value={newFriend.email}
            />
            <button>Add New Friend!</button>
        </form>
        </div>
    )
}

export default NewFriendForm;
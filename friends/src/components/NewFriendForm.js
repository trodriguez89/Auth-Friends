import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import styled from "styled-components";

const AddButton = styled.button`
    padding: 5px;
    margin-left: 5px;
`

const NewFriendForm = (props) => {
    const [newFriend, setNewFriend] = useState({
        id: Date.now(),
        name: "",
        age: "",
        email: "",
        image: "https://i.ebayimg.com/images/g/pK0AAOSwt8Rc6WjJ/s-l400.jpg"
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
            <h3>Add New Dunder Mifflin Employee</h3>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input
                    type="text"
                    onChange={handleChanges}
                    value={newFriend.name}
                    name="name"
                />
                <label>Age: </label>
                <input
                    type="num"
                    onChange={handleChanges}
                    value={newFriend.age}
                    name="age"
                />
                <label>Email: </label>
                <input
                    type="email"
                    onChange={handleChanges}
                    value={newFriend.email}
                    name="email"
                />
                <AddButton type="submit">Add New Employee!</AddButton>
            </form>
        </div>
    )
}

export default NewFriendForm;
import React from "react";
import styled from "styled-components";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendsContain = styled.div`
    border: 1px solid black;
    width: 350px;
    height: 350px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const DeleteButton = styled.button`
    padding: 5px;
    margin-top: 5px;
`

const FriendCard = (props) => {
    const handleDelete = event => {
        event.preventDefault();
        axiosWithAuth().delete(`/friends/${props.friends.id}`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <FriendsContain>
            <img src={props.friends.image}/>
            <h4>{props.friends.name}</h4>
            <p>Age: {props.friends.age}</p>
            <p>Email: {props.friends.email}</p>
            <DeleteButton onClick={handleDelete}>Delete Employee</DeleteButton>
        </FriendsContain>
    )
}

export default FriendCard;
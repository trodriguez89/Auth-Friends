import React, { useState, useEffect } from "react";

import styled from "styled-components";

import NewFriendForm from "./NewFriendForm";
import FriendCard from './FriendCard';

import { axiosWithAuth } from "../utils/axiosWithAuth";
import NavLoggedIn from "./NavLoggedIn";

const MainContain = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

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
            <NavLoggedIn/>
            <NewFriendForm />
            <MainContain>
                {friends.map(item => (
                    <FriendCard key={item.id} friends={item} />
                ))}
            </MainContain>
        </div>

    );
}

export default Friends;


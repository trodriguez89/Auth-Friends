import React from "react";

import styled from "styled-components";

const LogOutButton = styled.button`
    padding: 5px;
`

const NavLoggedIn = () => {
    const logOut = event => {
        event.preventDefault();
        localStorage.clear("token");
    }

    return (
        <div>
        <h1>The Office Staff!</h1>
        <LogOutButton onClick={logOut}>Log Out</LogOutButton>
        </div>
    )
}

export default NavLoggedIn;
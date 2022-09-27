import React from "react";
import user_avatar from "../img/user_avatar.png";

function Avatar(props) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={user_avatar} className="avatar-img" alt="user avatar" />
            <p>{props.currentUsername}</p>
        </div>
    );
}

export default Avatar;
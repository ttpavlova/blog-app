import React from "react";
import user_avatar from "../img/user_avatar.png";

function Avatar(props) {
    return (
        <div className="d-flex justify-content-center justify-content-md-end">
            <div className="d-flex flex-column align-items-center">
                <img src={user_avatar} className="avatar-img" alt="user avatar" />
                <p>{props.currentUsername}</p>
            </div>
        </div>
    );
}

export default Avatar;
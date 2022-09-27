import React from "react";
import user_avatar from "../img/user_avatar.png";

function Avatar() {
    return (
        <div>
            <img src={user_avatar} className="avatar" alt="user avatar" />
        </div>
    );
}

export default Avatar;
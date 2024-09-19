import React from "react";

function UploadPopup(props) {
    return (props.trigger) ? (
        <div className="upload-popup">
            <div className="inner-popup">
                {props.children}
            </div>
        </div>
    ) : "";
}

export default UploadPopup
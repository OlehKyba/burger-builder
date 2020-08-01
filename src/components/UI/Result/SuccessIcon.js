import React from "react";

import classes from "./Result.module.css";

const SuccessIcon = () => {
    return (
        <svg
            className={classes.Svg}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2">
            <circle
                className={[classes.Path, classes.Circle].join(" ")}
                fill="none"
                stroke="#52c41a"
                strokeWidth="6"
                strokeMiterlimit="10"
                cx="65.1"
                cy="65.1"
                r="62.1"
            />
            <polyline
                className={[classes.Path, classes.Check].join(" ")}
                fill="none"
                stroke="#52c41a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
        </svg>
    );
}

export default SuccessIcon;

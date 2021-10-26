import React from 'react';

const Button = (props) => {
    return(
        <button
            onClick={(e) => {props.callback(e)}}
            className={props.disabled ? 'button-active': 'button-disabled'}>
            {props.name}
        </button>
    )
}

export default Button;

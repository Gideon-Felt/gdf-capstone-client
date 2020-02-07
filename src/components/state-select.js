import React, { Component, useState, useEffect} from "react";
import MultipleSelect from 'react-multiple-select-dropdown';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

const StateSelector = (props) => {

    return (
        <div className="state-selector-wrapper">
            <label>
            <Toggle
                defaultChecked={props.boolVal}
                onChange={() => props.handleStateToggle(props.state, props.boolVal)}
                className="state-toggle"
                />
            <span>{props.state}</span>
            </label>
        </div>
    )
}

export default StateSelector
import React, { Component, useState, useEffect} from "react";



const ChooseSource = (props) => {
    const [currentSource , setCurrentSource ] = useState(props.dbSource)
    return (
        <div>
            {props.dbSource === process.env.REACT_APP_MY_API_RDPS ? <p>Current: RDPS</p> : <p>Current: Appraisals</p>}
            <button onClick={() => props.handleDbSourceChange(process.env.REACT_APP_MY_API_RDPS)}>RDP's</button>
            <button onClick={() => props.handleDbSourceChange(process.env.REACT_APP_MY_API_APPRAISALS)}>Apraiser</button>
        </div>
    )
}

export default ChooseSource
import { Component , useState , useEffect } from 'react';

const ProgressBar = (props) => {
    // Progress bar gets width from the props
    const [progressWidth, setProgressWidth] = useState(100);
    const [progressColor, setProgressColor] = useState('#26C485');

    useEffect(() => {
        setProgressWidth(props.current / props.length * 100);
        setProgressColor(props.color);
    }, [props.current, props.length, props.color]);


    return (
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{width: progressWidth + '%', backgroundColor: progressColor}}/>
        </div>
    );
}

export default ProgressBar;
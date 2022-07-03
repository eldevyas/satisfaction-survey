import { Component , useState , useEffect } from 'react';

const ProgressBar = () => {
    // Progress bar
    const [progress, setProgress] = useState(0);

    const addProgress = () => {
        if (progress < 100) {
            setProgress(progress + 10);
        } else {
            setProgress(0);
        }
    }

    return (
        <div className="progress-bar" onClick={addProgress}>
            <div className="progress-bar-fill" style={{width: progress + '%'}}/>
        </div>
    );
}

export default ProgressBar;
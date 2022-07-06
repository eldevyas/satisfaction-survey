import Image from 'next/image';
import React from 'react';


export default function Loading(props) {
    // Get the props from the parent component
    const { loading } = props;
    // If the loading is true, set the style to display: block
    const style = loading ? { display: 'SlideToRight 800ms ease forward 0ms' } : { animation: 'SlideToLeft 800ms ease forwards 1500ms' };
    // Return the loader
    console.log(loading, style)

    return(
        <div className='Loader' id='Loader' style={style}>
            <div className= 'BackgroundImage'>
                <Image priority='true' src="/image/background.png" alt="background" width={1920} height={1080}/>
            </div>
            <Image priority='true' className= 'Logo' src= "/svg/logo.svg" alt="loading" width={200} height={200}/>
            <div className={'loader'}></div>
        </div>
    )
}
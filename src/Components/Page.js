import React from 'react';
import hipstagram from '../images/hipst.png';


export default function Page() {
    return (
        <>
            <div className='gallery'>
                <img src={hipstagram} className='photos' />
            </div>
        </>
    )
} 
import React from 'react';
import '../App.css'
export default function Users( props ){
    const { info } = props;
    console.log('Users ', info)
    console.log('Users info.first_name', info[0]);
    if( !info ){
        return <h3>Fetching user info...</h3>
    }

    return(
        <div className="user-card">
            <p>Name: { info.first_name + " " + info.last_name }</p>
            <p>Email: { info.email }</p>
        </div>
    )

} 
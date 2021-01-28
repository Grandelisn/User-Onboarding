import React from 'react';

export default function Users( props ){
    const { info } = props;
    console.log(info)
    if( !info ){
        return <h3>Fetching user info...</h3>
    }

    return(
        <div className="user-card">
            <p>Name: { info.first_name + " " + info.last_Name }</p>
            <p>Email: { info.email }</p>
        </div>
    )

} 
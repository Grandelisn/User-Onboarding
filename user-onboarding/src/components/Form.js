import React from 'react';

export default function Form( props ){
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = event => {
        event.preventDefault();
        submit();
    }

    const onChange = event => {
        const { name, value, type, checked } = event.target;

        change( name, type === 'checkbox' ? checked : value );
    }

    return(

        <form onSubmit={ onSubmit } className="info-form">
            <h2>User Onboarding</h2>
            <label>
                First Name: 
                <input type="text" name="fName" value={ values.fName } onChange={ onChange } />
            </label>
            <label>
                Last Name: 
                <input type="text" name="lName" value={ values.lName } onChange={ onChange } />
            </label>
            <label>
                Email: 
                <input type="text" name="email" value={ values.email } onChange={ onChange } />
            </label>
            <label>
                Password: 
                <input type="password" name="password" value={ values.password } onChange={ onChange } />
            </label>
            <label>
                Terms of Service:
                <input type="checkbox" name="terms" value={ values.terms } onChange={ onChange } />
            </label>
            <button disabled={ disabled }>Submit</button>

            <div className="errors">
                <div>{ errors.fname }</div>
                <div>{ errors.lname }</div>
                <div>{ errors.email }</div>
                <div>{ errors.password }</div>
                <div>{ errors.terms }</div>
            </div>
        </form>
    );
} 
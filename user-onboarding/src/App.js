
import './App.css';
import Form from './components/Form';
import Users from './components/Users'
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import schema from "./validation/formSchema";
import axios from "axios";
const initFormVal = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  terms: false,
}
const initFormErr = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  terms: false,
}

const initUsers = [];
const initDis = true;

function App() {
  const [user, setUser] = useState(initUsers);
  const [formVal, setFormVal] = useState(initFormVal);
  const [formErr, setFormErr] = useState(initFormErr);
  const [dis, setDis] = useState(initDis);

  const fetchUser = () => {
    axios.get(`https://reqres.in/api/users`).then(res => setUser(res.data.data)).catch(err => console.log('fetchUser get error: ', err));
  }
  const addUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser).then(res => setUser([res.data, ...user]))
    .catch(err => console.log('addUser post error: ', err)).finally(setFormVal(initFormVal));
  }
  const input = (name, val) => {
    yup.reach(schema, name).validate(val).then(()=> setFormErr({...formErr, [name]: ''}))
    .catch(err =>{ setFormErr({...formErr, [name]: err.errors[0]})});
    setFormVal({...formVal, [name]: val});
  }
  const formSub = () => {
    const newUser = {
      first_name: formVal.first_name.trim(),
      last_name: formVal.last_name.trim(),
      email: formVal.email.trim(),
      password: formVal.password.trim(),
      terms: formVal.terms,
    }
    addUser(newUser);
  }
  useEffect(()=> fetchUser(), []);
  useEffect(() => {
    schema.isValid(formVal).then(valid => setDis(!valid))
  },[formVal]);

  return (
    <div className="App">
      <Form 
        values = {formVal}
        change = {input}
        submit = {formSub}
        errors = {formErr}
        disabled = {dis}
      />
      <div className = 'userStuff'>
        {user.map(x => {return <Users info = {x}/>})}
      </div>
    </div>
  );
}

export default App;

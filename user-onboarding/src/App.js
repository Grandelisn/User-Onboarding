
import './App.css';
import Form from './components/Form';
import Users from './components/Users'
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import schema from "./validation/formSchema";
import axios from "axios";
const initFormVal = {
  fName: '',
  sName: '',
  email: '',
  password: '',
  terms: false,
}
const initFormErr = {
  fName: '',
  lName: '',
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
      fName: formVal.fName.trim(),
      lName: formVal.lName.trim(),
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
      <div>
        {user.map(x => {return <Users info = {user}/>})}
      </div>
    </div>
  );
}

export default App;

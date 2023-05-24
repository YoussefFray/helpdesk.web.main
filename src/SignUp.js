import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
 


export default function SignUp(props) {
  const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleFirstNameChange = (e) => {
      setFirstName(e.target.value);
    };
  
    const handleLastNameChange = (e) => {
      setLastName(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const dataOfForm = new Map([
        ['UserId', Math.floor(Math.random() * 500)],
        ['firstName', firstName],
        ['lastName', lastName],
        ['email',email],
        ['password', password],
      ]);
      var obj = Object.fromEntries(dataOfForm);

      console.log(JSON.stringify(obj));
    
      fetch('http://localhost:5284/api/Users', {
  method: 'POST',
  headers: {
   Accept: 'application.json',
    'Content-Type': 'application/json'
  }, 
   body: JSON.stringify(obj),
}).then((res)=>{
  
return res.json();
})
.then((resp)=>{
console.log(resp)  
sessionStorage.setItem("UserInfo",JSON.stringify(resp));
props.setUser(true) ;
props.setTechnician(false) ;
navigate('/AddComplaint');
 }).catch((err)=>
 {
  console.log("signup failed due to "+err.message);
 }
 );
 



    };

    return (
        <div className="mx-auto mb-3 w-25 p-3 mt-4 mb-4"    >
 
        <h1 className="mb-4" >Registration Form</h1>
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label  htmlFor="first-name" className="form-label">First Name</label>
        <input type="text" className="form-control" id="firstname"   value={firstName}
            onChange={handleFirstNameChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="last-name" className="form-label">Last Name</label>
        <input type="text" className="form-control" id="lastname"  value={lastName}
            onChange={handleLastNameChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"  value={email}
            onChange={handleEmailChange}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label  htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password"  value={password}
            onChange={handlePasswordChange}/>
      </div>
  
      <button  className="btn btn-primary mt-4 mb-4" type="submit">Sign Up</button>
     
    </form>
    <Link class="link-primary mt-4 mb-4"  to="/Login" >Login</Link>

    </div>

    );
}
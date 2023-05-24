import axios from "axios";
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";



export default function Login(props) {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
       
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        /* check if role = user */ 
        axios.get('http://localhost:5284/api/UsersAuth?email='+email+'&password='+password)
        .then(res =>{
          //to session
        console.log(res.data.firstName) ;
        props.setUser(true) ;
        props.setTechnician(false) ;
        sessionStorage.setItem("UserInfo",JSON.stringify(res.data) );
        navigate('/AddComplaint');
        }).catch(err =>{
        console.log(err) ;
        
        } )
         /* end check if role = user */ 
         /* check if role = technician */ 
         axios.get('http://localhost:5284/api/TechniciansAuth?email='+email+'&password='+password)
         .then(res =>{
           //to session
         console.log(res.data.firstName) ;
         props.setUser(false) ;
        props.setTechnician(true) ;
        sessionStorage.setItem("technicianInfo",JSON.stringify(res.data) );
         navigate('/ShowAllComplaints');
         }).catch(err =>{
         console.log(err) ;
         
         } )

        /* end check if role = technician */ 
        setIsVisible(!isVisible);  
      };


    return (
<div className="mx-auto mb-3 w-25 p-3 mt-4 mb-4"    >
    <h1 className="mb-4" >Login</h1>
    {isVisible &&  <div className="alert alert-danger" role="alert">
    incorrect email or password
     </div>}
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={email}
            onChange={handleEmailChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label  htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password}
            onChange={handlePasswordChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary mt-4 mb-4">Submit</button>
</form>
<Link className="link-primary mt-4 mb-4"  to="/SignUp" >SignUp</Link>

</div>

    );
}
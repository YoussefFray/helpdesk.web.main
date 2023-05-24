import React, { useState } from "react";
import { Link ,useLocation ,useNavigate } from "react-router-dom";



export default function UserNavBar(props) {
  const navigate = useNavigate();
  function logout()
{
  sessionStorage.clear();
  sessionStorage.removeItem('UserInfo');
  props.setUser(false) ;
  props.setTechnician(false) ;
  navigate('/');

}
  const location= useLocation();
  if(location.pathname =='/' || location.pathname =='/Login' || location.pathname =='/SignUp')
  {
return (<div></div>);
  }
return (
<div>
 <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <span class="navbar-brand" >HelpDesk User</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
            <Link class="nav-link active"  to="/AddComplaint" >Add Complaint</Link>
             </li>
            <li class="nav-item">
            <Link class="nav-link active"  to="/MyComplaints" >My Complaints</Link>
            </li>
            <li class="nav-item">
            <button type="button" class="btn btn-success float-right ml-2"  onClick={() => logout()}>Log Out</button>
          </li>
          </ul>
        </div>
      </div>
    </nav>
</div>
);
}
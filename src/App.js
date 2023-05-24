import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import Login from './Login';
import SignUp from './SignUp';
import axios from 'axios';
import TechNavBar from './TechNavBar';
import UserNavBar from './UserNavBar';
import Page404 from './Page404';
import {Routes,Route} from 'react-router-dom';
import AddComplaint from './AddComplaint';
import MyComplaints from './MyComplaints';
import EditComplaint from './EditComplaint';
import ShowAllComplaints from './ShowAllComplaints' ;
import ActionCor from './ActionCor' 

function App() {
  const [user, setUser] = useState(false);
  const [technician, setTechnician] = useState(false);

  return (
    <div className="App">


   {user &&
  <UserNavBar setUser={setUser}  setTechnician={setTechnician}    >
  </UserNavBar>
  }
   {technician &&
  <TechNavBar setUser={setUser}  setTechnician={setTechnician}    >
  </TechNavBar>
  }
  <Routes>
     {/* technician routes */}
     {technician &&
      <Route path="/ShowAllComplaints" element={<ShowAllComplaints/>}></Route>
      }
      {technician &&
      <Route path="/ActionCor" element={<ActionCor/>}></Route>
      }

    {/* technician routes */}
     {/* user routes */}
  {user &&
  <Route path="/AddComplaint" element={<AddComplaint/>}></Route>
  }
  {user &&
  <Route path="/MyComplaints" element={<MyComplaints/>}></Route>
  }
  {user &&
  <Route path="/AddComplaint" element={<EditComplaint/>}></Route>
  }
 {/* user routes*/} 

  <Route path="/" element={<Login user={user} setUser={setUser} technician={technician} setTechnician={setTechnician}/>}></Route>
  <Route path="/Login" element={<Login user={user} setUser={setUser} technician={technician} setTechnician={setTechnician} />}></Route>
  <Route path="/SignUp" element={<SignUp user={user} setUser={setUser} technician={technician} setTechnician={setTechnician}/>}></Route>
  <Route path="/*" element={<Page404 />} />
  </Routes>

</div>
  );
}

export default App;

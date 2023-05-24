import axios from "axios";
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

function ActionCor() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [description, setDescription] = useState('');
  var UserOb = JSON.parse(sessionStorage.getItem("technicianInfo"));
  const [selectedComplaint, setSelectedComplaint] = useState('');

  const handleComplaintChange = (event) => {
    setSelectedComplaint(event.target.value);
     
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  axios
  .get("http://localhost:5284/api/Complaints")
  .then((response) => {
    setData(response.data);
    
  })
  .catch((error) => {
    console.log(error);
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(UserOb.technicianId);
    const dataOfForm = new Map([
      ['actionId', Math.floor(Math.random() * 500)],
      ['complaintId',selectedComplaint ],
      ['technicianId',UserOb.technicianId],
      ['description',description ],
    ]);
   
    var body =JSON.stringify( Object.fromEntries(dataOfForm));
    console.log(body);
     
      axios.post('http://localhost:5284/api/ActionCorrectives', body , {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
      });
 

      setIsVisible(!isVisible); 

  }
  if (!data) {
    return (<div><h1>loding</h1></div>);
  }

  return (
    <div class="container-sm">
      <h1>Action corrective</h1>
      {isVisible &&  <div className="alert alert-success" role="alert">
      submitted successfully
     </div>}
      <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label  htmlFor="first-name" className="form-label mb-3">Unique codes of Complaints  </label>
    <select  class="form-select" aria-label="Default select example" onChange={handleComplaintChange}>
      <option value="">Select a complaint</option>
      {data.map((complaint) => (
        <option key={complaint.complaintId} value={complaint.complaintId}>
          {complaint.uniqueCode} : {complaint.description}
        </option>
      ))}
    </select>
        <label  htmlFor="first-name" className="form-label mb-3">Description</label>
        <textarea class="form-control mb-3" id="exampleFormControlTextarea1" rows="3" type="text" className="form-control"    value={description}
            onChange={handleDescriptionChange}></textarea>
         
      </div>


      <button  className="btn btn-primary mt-4 mb-4" type="submit">Send</button>
    </form>




    </div>
  )
}

export default ActionCor
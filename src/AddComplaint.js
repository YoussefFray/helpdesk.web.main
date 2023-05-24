import React, { useState } from "react";
import axios from "axios";
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
function AddComplaint() {
  const [isVisible, setIsVisible] = useState(false);
  const [description, setDescription] = useState('');
  var SessionObj = JSON.parse(sessionStorage.getItem("UserInfo"));
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
     
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataOfForm = new Map([
      ['complaintId', Math.floor(Math.random() * 500)],
      ['userId', SessionObj.userId],
      ['uniqueCode', makeid(10)  ],
      ['description',description],
      ['status', "not yet processed"],
      ['approved', false],
    ]);
    var body =JSON.stringify( Object.fromEntries(dataOfForm));
      axios.post('http://localhost:5284/api/Complaints', body , {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
      });
      setIsVisible(!isVisible);  
  }
  return (
    <div className="mx-auto mb-3 w-25 p-3 mt-4 mb-4" >
    <h1 className="mb-4"> Add Complaint</h1> 
    {isVisible &&  <div className="alert alert-success" role="alert">
    Your claim has been submitted successfully
     </div>}
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label  htmlFor="first-name" className="form-label">Description</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" type="text" className="form-control"    value={description}
            onChange={handleDescriptionChange}></textarea>
         
      </div>


      <button  className="btn btn-primary mt-4 mb-4" type="submit">Send</button>
    </form>
      </div>
  )
}

export default AddComplaint
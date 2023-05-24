import React, { useState } from "react";
import axios from "axios";

function ShowAllComplaints() {
  var i=0 ;
  const [data, setData] = useState(null);
/*get all Complaints   */
axios
.get("http://localhost:5284/api/UsersComplaints")
.then((response) => {
  setData(response.data);
})
.catch((error) => {
  console.log(error);
});
/*get all Complaints   */
/**
 editStatus
 */
function editStatus(a,uid)
{ var a2=a.status ;
if (a2==="not yet processed")
{
  a2="in progress"
}else if (a2==="in progress")
{
  a2="resolved"
}else
{
  a2="there is no solution"
}
  const dataOfForm = new Map([
    ['complaintId',a.complaintId  ],
    ['userId',uid ],
    ['uniqueCode', a.uniqueCode ],
    ['description',a.description ],
    ['status', a2 ],
    ['approved', a.approved ],
  ]);
  var obj = Object.fromEntries(dataOfForm);

  axios.put('http://localhost:5284/api/Complaints/'+a.complaintId, obj)
    .then(response => {
      console.log(response.data);  
    })
    .catch(error => {
      console.error(error); 
    });
}

/**
 editStatus
 */
/**
 * delete complaint
 */
function deleteComplaint (x)
{
  console.log(x)
  axios.delete('http://localhost:5284/api/Complaints/'+x)
  .then(response => {
    console.log(response.data);  
  })
  .catch(error => {
    console.error(error);   
  });




}

/**
 * delete complaint
 */


if (!data) {
  return (<div><h1>loading</h1></div>);
}

  return (

    <div class="container-sm" >
      <h1 className="mb-4">Show All Complaints</h1>
      {data.map(user => (
        <div key={user.userId}>
          <h2 class="p-2 bg-light border">{user.firstName} {user.lastName}</h2>
          <p>Email: {user.email}</p>
          <h3>Complaints:</h3>
          <table class="table">
  <thead>
    <tr>
       
      <th scope="col">Unique Code</th>
      <th scope="col">Description</th>
      <th scope="col">Status</th>
      <th scope="col">Approved</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody> 
  
               {user.complaints.map(complaint => (
               <tr>
              <td>  {complaint.uniqueCode} </td> 
              <td>     {complaint.description} </td> 
              <td>    {complaint.status} </td> 
              <td>   {complaint.approved ? 'Yes' : 'No'} </td> 
              <td>  <button class="btn btn-warning" onClick={() => editStatus(complaint,user.userId)}>Next</button>  </td> 
              
              {complaint.status ==="resolved" ?
                (   
                   <td>
                  <button type="button" class="btn btn-danger" onClick={() => deleteComplaint(complaint.complaintId)}>delete</button>
                  </td> 
                   )
                 :
                 ( <td> 
                  <button class="btn btn-danger" disabled >delete</button>
                   </td> 
                 
                 )
               }
                  
              </tr>
              
            )
            
            
            )}
           
            </tbody>
</table>
        </div>
      ))}
    </div>
  );
}

export default ShowAllComplaints
import React, { useState } from "react";
import axios from "axios";
import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai';
function MyComplaints() {
  var i=0 ;


  const [data, setData] = useState(null);
  const [editdata, seteditdata] = useState("");
  const [textareadata, settextareadata] = useState("");
  const [Complaintnumber, setComplaintnumber] = useState("");

  var SessionObj = JSON.parse(sessionStorage.getItem("UserInfo"));
/*get Complaints of current user */
  axios
  .get("http://localhost:5284/api/GetComplaintsByUser/"+SessionObj.userId)
  .then((response) => {
    setData(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
/*get Complaints of current user */
/*edit Complaint */ 
const editComplaint = (a) => {
  seteditdata(a);
  settextareadata(a.description);
  setComplaintnumber(a.uniqueCode);
}


const handletextareadataChange = (e) => {
  settextareadata(e.target.value);
};

/*edit Complaint */
const puteditComplaint = (e) => {
  e.preventDefault();
console.log(editdata);
console.log(textareadata);
const dataOfForm = new Map([
  ['complaintId',editdata.complaintId  ],
  ['userId',editdata.userId  ],
  ['uniqueCode', editdata.uniqueCode ],
  ['description',textareadata ],
  ['status', editdata.status ],
  ['approved', editdata.approved ],
]);
var obj = Object.fromEntries(dataOfForm);

axios.put('http://localhost:5284/api/Complaints/'+editdata.complaintId, obj)
  .then(response => {
    console.log(response.data);  
  })
  .catch(error => {
    console.error(error); 
  });


}
/*edit Complaint */ 
/*delete Complaint */

const deleteComplaint = (x) => {
console.log(x);
axios.delete('http://localhost:5284/api/Complaints/'+x.complaintId)
  .then(response => {
    console.log(response.data);  
  })
  .catch(error => {
    console.error(error);   
  });
 
}

/*delete Complaint */

/**
 like
 */
 const like = (a) => {
  console.log(a);
  const dataOfForm = new Map([
    ['complaintId',a.complaintId  ],
    ['userId',a.userId  ],
    ['uniqueCode', a.uniqueCode ],
    ['description',a.description ],
    ['status', a.status ],
    ['approved', ! a.approved ],
  ]);
  var obj = Object.fromEntries(dataOfForm);
  console.log(obj) ;
  axios.put('http://localhost:5284/api/Complaints/'+a.complaintId, obj)
    .then(response => {
      console.log(response.data);  
    })
    .catch(error => {
      console.error(error); 
    });

}


 /**
 like
 */


  if (!data) {
    return (<div><h1>loding</h1></div>);
  }
  return (
    <div className="d-grid gap-3" >
    <h1 className="mb-4">  My Complaints</h1> 
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Unique Code</th>
      <th scope="col">Description</th>
      <th scope="col">Status</th>
      <th scope="col">Approved</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody> 
    {data.map((dataC) => (
 <tr>
 <th scope="row">{i++}</th>
 <td>
  {dataC.uniqueCode}
 </td>
 <td>
 {dataC.description}
 </td>
 <td>
 {dataC.status}
 </td>
 {dataC.status ==="resolved" ?
 (<td>
 {dataC.approved ?
 (
 <AiTwotoneDislike onClick={() => like(dataC)} size="2em" color="#C70039" /> 
 ):
 (
 <AiTwotoneLike  onClick={() =>  like(dataC)} size="2em" color="#116530" /> 
 )
 }
 </td>
 ) :
 (
<td> 
<AiTwotoneLike    size="2em" color="#808080" /> 
</td>
 )
  }
  {dataC.status ==="not yet processed" ?
 (
 <td>
 <button type="button" class="btn btn-warning"  data-toggle="modal" data-target="#exampleModal" onClick={() => editComplaint(dataC)} >edit</button>
 </td>
 )
 :
 (
  <td>
  <button type="button" class="btn btn-warning" disabled>edit</button>
  </td>
 )
}

{dataC.status ==="not yet processed" ?
 (
  <td>
 <button type="button" class="btn btn-danger" onClick={() => deleteComplaint(dataC)}>delete</button>
 </td>
 )
 :
 (
  <td>
 <button type="button" class="btn btn-danger" disabled>delete</button>
 </td>
 )
}

</tr>

    ))}
      </tbody>
</table>
 {/* 
    Modal  
*/} 
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Pop-up Form</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p id="p1" > complaints number : {Complaintnumber}  </p>

          
          <form onSubmit={puteditComplaint}>
          <div class="form-group">
    <label for="texte1">description</label>
    <textarea class="form-control" id="texte1" rows="3" name="texte1"   onChange={handletextareadataChange} value={textareadata}></textarea>
            </div>
           
            <button type="submit" class="btn btn-primary">edit</button>
          </form>
        </div>
      </div>
    </div>
  </div>





















    </div>
  );
  }

export default MyComplaints 
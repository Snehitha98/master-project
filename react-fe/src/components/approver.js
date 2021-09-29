import React, { useState, useEffect } from 'react';
import '../App.css';
import "./navigation.css";
import ApproverList from './approver-components/approver-list';
import ApproverDetails from './approver-components/approver-details';
import ApproverForm from './approver-components/approver-form';

function Approver() {

  const [approvers, setApprovers] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState(null);
  const [editedApprover, setEditedApprover] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/approver-list/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then( resp => resp.json())
    .then( resp => setApprovers(resp))
    .catch(error => console.log(error))
  }, [])

  const loadApprover = approver => {
    setSelectedApprover(approver);
    setEditedApprover(null);
  }

 const editClicked = approver => {
    setEditedApprover(approver);
    setSelectedApprover(null);
  }

  const updatedApprover = approver => {
    const newApprovers = approvers.map( newApprover => {
      if (newApprover.approver_id === approver.approver_id) {
        return approver;
      }
      return newApprover;
    })
    setApprovers(newApprovers)
  }

  const newApprover = () => {
    setEditedApprover({approver_name: ''});
    setSelectedApprover(null);
  }

  const approverCreated = approver => {
    const newApprovers = [...approvers, approver];
    setApprovers(newApprovers);
  }

  const deleteClicked = approver => {
    const newApprovers = approvers.filter( ap => ap.approver_id !== approver.approver_id);
    console.log(newApprovers);
    setApprovers(newApprovers);
  }

  return (
    <div className="list-group">
      <br/>
      <header className="App-header">
        <div style={{ display: 'flex', alignItems:'center' }}>
          <h3 onClick={() => window.location.reload(false)}>Approvers</h3>
        </div>
      </header>
      <div className="layout">
            <ApproverList
              approvers={approvers}
              approverClick={loadApprover}
              editClicked={editClicked}
              createApprover={loadApprover}
              deleteClicked={deleteClicked}
              newApprover={newApprover}
            />
          { selectedApprover ?
          <ApproverDetails
            approver={selectedApprover}
            updateApprover={loadApprover}
          />
          : null }
          { editedApprover ?
          <ApproverForm
            approver={editedApprover}
            updatedApprover={updatedApprover}
            approverCreated={approverCreated}
          />
          : null}
      </div>
    </div>
  );
}

export default Approver;

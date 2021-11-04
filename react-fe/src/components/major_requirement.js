import React, { useState, useEffect } from 'react';
import '../App.css';
import MajorRequirememntList from './major-requirement-components/major-req-list';
import MajorRequirememntDetails from './major-requirement-components/major-req-details';
import MajorRequirememntForm from './major-requirement-components/major-req-form';

function MajorRequirememnt() {

    const [majorReqs, setMajorReqs] = useState([]);
    const [selectedMajorReq, setSelectedMajorReq] = useState(null);
    const [editedMajorReq, setEditedMajorReq] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/major-requirement-list/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then( resp => resp.json())
        .then( resp => setMajorReqs(resp))
        .catch(error => console.log(error))
      }, [])

    const loadMajorReq = majorReq => {
        setSelectedMajorReq(majorReq);
        setEditedMajorReq(null);
    }

    const newMajorReq = () => {
      setEditedMajorReq({description:'', major_req_title:'', major_id:1});
      setSelectedMajorReq(null);
    }

    const editClicked = majorReq => {
      setEditedMajorReq(majorReq);
      setSelectedMajorReq(null);
    }

    const deleteClicked = majorReq => {
      const newMajorReqs = majorReqs.filter( mr => mr.major_req_id !== majorReq.major_req_id);
      setMajorReqs(newMajorReqs);
    }

    const updatedMajorReq = majorReq => {
      const newMajorReqs = majorReqs.map( newMajorReq => {
        if (newMajorReq.major_req_id === majorReq.major_req_id) {
          return majorReq;
        }
        return newMajorReq;
      })
      setMajorReqs(newMajorReqs);
    }

    const majorReqCreated = majorReq => {
      const newMajorReqs = [...majorReqs, majorReq];
      setMajorReqs(newMajorReqs);
    }


    return (
        <div className="list-group">
          <br/>
            <header className="App-header">
              <div style={{ display: 'flex',alignItems:'center' }}>
                <h3>UNHM Courses</h3>
              </div>
            </header>
            <div className="layout">
                <MajorRequirememntList
                  majorReqs={majorReqs}
                  majorReqClicked={loadMajorReq}
                  editClicked={editClicked}
                  deleteClicked={deleteClicked}
                  newMajorReq={newMajorReq}
                />
                {selectedMajorReq ?
                <MajorRequirememntDetails
                  majorReq={selectedMajorReq}
                  updateMajorReq={loadMajorReq}
                />
                : null }
                {editedMajorReq ?
                <MajorRequirememntForm
                  majorReq={editedMajorReq}
                  updatedMajorReq={updatedMajorReq}
                  majorReqCreated={majorReqCreated}
                />
                : null}
            </div>
        </div>
      )

}

export default MajorRequirememnt;
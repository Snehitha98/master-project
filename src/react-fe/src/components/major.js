import React, { useState, useEffect } from 'react';
import '../App.css';
import MajorList from "./major-components/major-list";
import MajorDetails from "./major-components/major-details";
import MajorForm from "./major-components/major-form";

function Major() {
    const [majors, setMajors] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [editedMajor, setEditedMajor] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/major-list/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then( resp => resp.json())
        .then( resp => setMajors(resp))
        .catch(error => console.log(error))
      }, [])

    const loadMajor = major => {
        setSelectedMajor(major);
        setEditedMajor(null);
    }

    const editClicked = major => {
      setEditedMajor(major);
      setSelectedMajor(null);
    }

    const updatedMajor = major => {
      const newMajors = majors.map( newMajor => {
        if (newMajor.major_id === major.major_id) {
          return major;
        }
        return newMajor;
      })
      setMajors(newMajors);
    }

    const newMajor = () => {
      setEditedMajor({major_name: ''});
      setSelectedMajor(null);
    }

    const majorCreated = major => {
      const newMajors = [...majors, major];
      setMajors(newMajors);
    }

    const deleteClicked = major => {
      const newMajors = majors.filter( m => m.major_id !== major.major_id);
      console.log(newMajors);
      setMajors(newMajors);
    }

    return (
        <div className="list-group">
          <br/>
            <header className="App-header">
              <div style={{ display: 'flex', alignItems:'center' }}>
                <h3>Majors</h3>
              </div>
            </header>
            <div className="layout">
                <MajorList
                majors={majors}
                majorClicked={loadMajor}
                editClicked={editClicked}
                createMajor={loadMajor}
                deleteClicked={deleteClicked}
                newMajor={newMajor}/>
                { selectedMajor ?
                <MajorDetails
                major={selectedMajor}
                updateMajor={loadMajor}/>
                : null }
                { editedMajor ?
                <MajorForm
                major={editedMajor}
                updatedMajor={updatedMajor}
                majorCreated={majorCreated}/>
                : null }
            </div>
        </div>
      )

}

export default Major;
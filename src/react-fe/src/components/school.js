import React, { useState, useEffect } from 'react';
import '../App.css';
import SchoolList from './school-components/school-list';
import SchoolDetails from './school-components/school-details';
import SchoolForm from './school-components/school-form';

function School() {

    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [editedSchool, setEditedSchool] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/school-list/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then( resp => resp.json())
        .then( resp => setSchools(resp))
        .catch(error => console.log(error))
      }, [])

    const loadSchool = school => {
      setSelectedSchool(school);
      setEditedSchool(null);
    }

    const newSchool = () => {
      setEditedSchool({school_name:'', state_name:''});
      setSelectedSchool(null);
    }

    const editClicked = school => {
      setEditedSchool(school);
      setSelectedSchool(null);
    }

    const updatedSchool = school => {
      const newSchools = schools.map( newSchool => {
        if (newSchool.school_id === school.school_id) {
          return school;
        }
        return newSchool;
      })
      setSchools(newSchools);
    }

    const schoolCreated = school => {
      const newSchools = [...schools, school];
      setSchools(newSchools);
    }

    const deleteClicked = school => {
      const newSchools = schools.filter( s => s.school_id !== school.school_id);
      setSchools(newSchools);
    }

    return (
        <div className="list-group">
          <br/>
            <header className="App-header">
              <div style={{ display: 'flex',alignItems:'center' }}>
                <h3>Institutions</h3>
              </div>
            </header>
            <div className="layout">
                <SchoolList
                  schools={schools}
                  schoolClicked={loadSchool}
                  editClicked={editClicked}
                  deleteClicked={deleteClicked}
                  newSchool={newSchool}
                />
                { selectedSchool ?
                <SchoolDetails
                  school={selectedSchool}
                  updatedSchool={loadSchool}
                />
                : null }
                { editedSchool ?
                <SchoolForm
                  school={editedSchool}
                  updatedSchool={updatedSchool}
                  schoolCreated={schoolCreated}
                />
                : null }
            </div>
        </div>
      );

}

export default School;
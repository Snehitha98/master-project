import React, {useEffect, useState} from 'react';
import {Container, Table} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../../api-services/school-services';

function SchoolList(props) {

    const [currentPage, setCurrentPage] = useState();
    const [schoolsPerPage] = useState();

    // Get current Schools
    const indexOfLastSchool = currentPage * schoolsPerPage;
    const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;

    const [currentSchools,setcurrentSchools] = useState(props.schools);
    const [currentStates, setcurrentStates] = useState(props.schools.state_name);

    const schoolClicked = school => evt => {
        props.schoolClicked(school);
    }

    const editClicked = school => {
        console.log("Edit is clicked", school.school_id);
        props.editClicked(school);
    }

    const deleteClicked = school => {
        if (window.confirm("Are you sure?")) {
            API.deleteSchool(school.school_id)
            .then( () => props.deleteClicked(school))
            .catch( error => console.log(error))
        } else {
            console.log("You clicked cancel");
        }
      }

    const newSchool = () => {
        props.newSchool();
    }

    function compareaescSchool( a, b ) {
    if ( a.school_name < b.school_name ){
      return -1;
    }
    if ( a.school_name > b.school_name ){
      return 1;
    }
    return 0;
  }

  function comparedescSchool( a, b ) {
    if ( a.school_name < b.school_name ){
      return 1;
    }
    if ( a.school_name > b.school_name ){
      return -1;
    }
    return 0;
  }

  function compareaescState( a, b ) {
    if ( a.state_name < b.state_name ){
      return -1;
    }
    if ( a.state_name > b.state_name ){
      return 1;
    }
    return 0;
  }

  function comparedescState( a, b ) {
    if ( a.state_name < b.state_name ){
      return 1;
    }
    if ( a.state_name > b.state_name ){
      return -1;
    }
    return 0;
  }

    return (
        <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                    <div>SCHOOL NAME <br></br>
                     <Button variant="outline-secondary" onClick={() => {setcurrentSchools(props.schools.sort( compareaescSchool ).slice(indexOfFirstSchool, indexOfLastSchool))}}>asc</Button>
                      &nbsp;&nbsp;
                    <Button variant="outline-secondary" onClick={() => {setcurrentSchools(props.schools.sort( comparedescSchool ).slice(indexOfFirstSchool, indexOfLastSchool))}}>desc</Button>
                    </div>
                    </th>
                    <th>
                        <div>STATE NAME<br></br>
                     <Button variant="outline-secondary" onClick={() => {setcurrentStates(props.schools.sort( compareaescState ).slice(indexOfFirstSchool, indexOfLastSchool))}}>asc</Button>
                      &nbsp;&nbsp;
                    <Button variant="outline-secondary" onClick={() => {setcurrentStates(props.schools.sort( comparedescState ).slice(indexOfFirstSchool, indexOfLastSchool))}}>desc</Button>
                    </div>
                    </th>
                    <th />
                    <th>
                        <FontAwesomeIcon icon={faPlus} alignmentBaseline='before-edge' onClick={newSchool}/>
                    </th>
                </tr>
            </thead>
            <tbody>
                { props.schools && props.schools.map( (school,i) => {
                return (
                    <tr value={school.school_id} key={i}>
                        <td onClick={schoolClicked(school)}>
                        {school.school_name}
                        </td>
                        <td>
                            {school.state_name}
                        </td>
                        <td>
                            <Button variant="outline-primary" onClick={() => editClicked(school)}>Edit</Button>
                        </td>
                        <td>
                            <Button variant="outline-danger" onClick={() => deleteClicked(school)}>Delete</Button>
                        </td>
                    </tr>
                )})}
            </tbody>
        </Table>

        </Container>
    )
}

export default SchoolList;
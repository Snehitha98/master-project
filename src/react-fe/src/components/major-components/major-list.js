import React, { useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MajorAPI } from '../../api-services/major-service';
import '../../App.css';

function MajorList(props) {

    const [currentPage, setCurrentPage] = useState();
    const [majorsPerPage] = useState();

    // Get current Majors
    const indexOfLastMajor = currentPage * majorsPerPage;
    const indexOfFirstMajor = indexOfLastMajor - majorsPerPage;

    const [currentMajors,setcurrentMajors] = useState(props.majors);

    const majorClicked = major => evt => {
        props.majorClicked(major);
    }

    const editClicked = major => {
        props.editClicked(major);
      }

    const deleteClicked = major => {
    if (window.confirm("Are you sure? - All the transfer evaluations of this major will be deleted")) {
        MajorAPI.deleteMajor(major.major_id)
        .then( () => props.deleteClicked(major))
        .catch( error => console.log(error))
    } else {
        console.log("You clicked cancel");
    }
    }

    const newMajor = () => {
        props.newMajor();
    }

    function compareaescMajor( a, b ) {
    if ( a.major_name < b.major_name ){
      return -1;
    }
    if ( a.major_name > b.major_name ){
      return 1;
    }
    return 0;
  }

  function comparedescMajor( a, b ) {
    if ( a.major_name < b.major_name ){
      return 1;
    }
    if ( a.major_name > b.major_name ){
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
                <div>MAJOR NAME <br></br>
                    <Button variant="outline-secondary" onClick={() => {setcurrentMajors(props.majors.sort( compareaescMajor ).slice(indexOfFirstMajor, indexOfLastMajor))}}>asc</Button>
                    &nbsp;&nbsp;
                    <Button variant="outline-secondary" onClick={() => {setcurrentMajors(props.majors.sort( comparedescMajor ).slice(indexOfFirstMajor, indexOfLastMajor))}}>desc</Button>
                </div>
            </th>
            <th />
            <th>
                <FontAwesomeIcon icon={faPlus} alignmentBaseline='before-edge' onClick={newMajor}/>
            </th>
            </tr>
        </thead>
        <tbody>
            { props.majors && props.majors.map( (major,i) => {
            return (
                <tr key={i}>
                <td onClick={majorClicked(major)}>
                    {major.major_name}
                </td>
                <td>
                    <Button variant="outline-primary" onClick={() => editClicked(major)}>Edit</Button>
                </td>
                <td>
                    <Button variant="outline-danger" onClick={() => deleteClicked(major)}>Delete</Button>
                </td>
                </tr>
            )
            })}
        </tbody>
        </Table>
        </Container>
    )
}

export default MajorList;
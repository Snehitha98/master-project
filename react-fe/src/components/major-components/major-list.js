import React, { useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MajorAPI } from '../../api-services/major-service';
import '../../App.css';

function MajorList(props) {

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

    return (
        <Container>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th onClick={() => window.location.reload(false)}>MAJOR NAME</th>
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
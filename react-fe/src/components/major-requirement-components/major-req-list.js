import React, {useEffect, useState} from 'react';
import Pagination from '../../components/pagination';
import {Col, Container, Form, Table} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MRAPI } from '../../api-services/major-req-service';

function MajorRequirementList(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [majorReqsPerPage] = useState(5);

    // Get current transfer evals
    const indexOfLastMajorReq = currentPage * majorReqsPerPage;
    const indexOfFirstMajorReq = indexOfLastMajorReq - majorReqsPerPage;
    //const currentMajorReqs = props.majorReqs.slice(indexOfFirstMajorReq, indexOfLastMajorReq);

    const [currentMajorReqs,setcurrentMajorReqs] = useState(props.majorReqs.slice(indexOfFirstMajorReq, indexOfLastMajorReq));

    const [selectedMajorName, setselectedMajorName] = useState('');
    const [majorNamesArr,setmajorNamesArr] = useState(['select']);


    useEffect(() => {
        let temp = props.majorReqs;
        temp = selectedMajorName ? temp.filter(word => word.major === selectedMajorName) : temp;
        setcurrentMajorReqs(temp.slice(indexOfFirstMajorReq, indexOfLastMajorReq));

        setmajorNamesArr([...new Set(props.majorReqs.map(item => item.major))])

      }, [props.majorReqs,currentPage,selectedMajorName])

    useEffect(()=>{
      let temp = props.majorReqs.filter(word => word.major === selectedMajorName);
    },[selectedMajorName])

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const MajorSelect = () =>{
      function MajorOptions(){
        return majorNamesArr.map(
          (eachName,i) => {
            return  <option key={i}>{eachName}</option>
          }
        )
      }
      return(
        <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Major Name</Form.Label>
              <Form.Control as="select" size="sm" custom
                  value={selectedMajorName}
                  onChange={evt => setselectedMajorName(evt.target.value)}>
                <option>----Select Major Name----</option>
                <MajorOptions/>
              </Form.Control>
        </Form.Group>
      )
    }


    const majorReqClicked = majorReq => evt => {
        props.majorReqClicked(majorReq);
    }

    const editClicked = majorReq => {
        props.editClicked(majorReq);
      }

    const deleteClicked = majorReq => {
        if (window.confirm("Are you sure?")) {
            MRAPI.deleteMajorReq(majorReq.major_req_id)
            .then( () => props.deleteClicked(majorReq))
            .catch( error => console.log(error))
        } else {
            console.log("You clicked cancel");
        }
      }

    const newMajorReq = () => {
        props.newMajorReq();
    }

    return (
        <Container>
            <Form style={{ display: 'flex',alignItems:'center'}}>
            <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Row >
              <MajorSelect/>
              </Form.Row>
            </Form.Group>
          </Form>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th onClick={() => window.location.reload(false)}>MAJOR REQUIREMENT</th>
                    <th>MAJOR NAME</th>
                    <th/>
                    <th>
                        <FontAwesomeIcon icon={faPlus} alignmentBaseline='before-edge' onClick={newMajorReq}/>
                    </th>
                </tr>
            </thead>
            <tbody>
                    { currentMajorReqs && currentMajorReqs.map( majorReq => {
                    return (
                        <tr>
                            <td onClick={majorReqClicked(majorReq)}>
                                {majorReq.description}
                            </td>
                            <td>
                                {majorReq.major}
                            </td>
                            <td>
                                <Button variant="outline-primary" onClick={() => editClicked(majorReq)}>Edit</Button>
                            </td>
                            <td>
                                <Button variant="outline-danger" onClick={() => deleteClicked(majorReq)}>Delete</Button>
                            </td>
                        </tr>
                    )})}
            </tbody>
        </Table>
        <Pagination elementsPerPage={majorReqsPerPage} totalElements={props.majorReqs.length} paginate={paginate}/>
        </Container>
    )
}

export default MajorRequirementList;
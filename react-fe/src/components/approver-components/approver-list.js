import React, { useState, useEffect } from 'react';
import Pagination from '../../components/pagination';
import { Table, Button, Container } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApproverAPI } from '../../api-services/approver-service';
import '../../App.css';

function ApproverList(props) {

  const [currentPage, setCurrentPage] = useState(1);
  const [approversPerPage] = useState(6);

  // Get current transfer evals
  const indexOfLastApprover = currentPage * approversPerPage;
  const indexOfFirstApprover = indexOfLastApprover - approversPerPage;
  // const currentApprovers = props.approvers.slice(indexOfFirstApprover, indexOfLastApprover);

  const [currentApprovers,setcurrentApprovers] = useState(props.approvers.slice(indexOfFirstApprover, indexOfLastApprover));

  useEffect(() => {
    setcurrentApprovers(props.approvers.slice(indexOfFirstApprover, indexOfLastApprover));
  }, [props.approvers,currentPage])


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const approverClicked = approver => evt => {
    props.approverClick(approver);
  }

  const editClicked = approver => {
    props.editClicked(approver);
  }

  const deleteClicked = approver => {
    if (window.confirm("Are you sure? - All the transfer evaluations of this approver will be deleted")) {
      ApproverAPI.deleteApprover(approver.approver_id)
      .then( () => props.deleteClicked(approver))
      .catch( error => console.log(error))
    } else {
        console.log("You clicked cancel");
    }
  }

  const newApprover = () => {
    props.newApprover();
  }

  function compareaescApprover( a, b ) {
    if ( a.approver_name < b.approver_name ){
      return -1;
    }
    if ( a.approver_name > b.approver_name ){
      return 1;
    }
    return 0;
  }

  function comparedescApprover( a, b ) {
    if ( a.approver_name < b.approver_name ){
      return 1;
    }
    if ( a.approver_name > b.approver_name ){
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
            <div>APPROVER NAME <br></br>
            <Button variant="outline-secondary" onClick={() => {setcurrentApprovers(props.approvers.sort( compareaescApprover ).slice(indexOfFirstApprover, indexOfLastApprover))}}>asc</Button>
              &nbsp;&nbsp;
            <Button variant="outline-secondary" onClick={() => {setcurrentApprovers(props.approvers.sort( comparedescApprover ).slice(indexOfFirstApprover, indexOfLastApprover))}}>desc</Button>
            </div>
            </th>
          <th/>
          <th>
            <FontAwesomeIcon icon={faPlus} alignmentBaseline='before-edge' onClick={newApprover}/>
          </th>
        </tr>
      </thead>
      <tbody>
        { currentApprovers && currentApprovers.map( (approver,i) => {
          return (
            <tr key={i}>
              <td onClick={approverClicked(approver)}>
                {approver.approver_name}
              </td>
              <td>
                <Button variant="outline-primary" onClick={() => editClicked(approver)}>Edit</Button>
              </td>
              <td>
                <Button variant="outline-danger" onClick={() => deleteClicked(approver)}>Delete</Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
      <Pagination elementsPerPage={approversPerPage} totalElements={props.approvers.length} paginate={paginate} url='approver/!#'/>
    </Container>
  )
}

export default ApproverList;

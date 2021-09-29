import React, { useEffect, useState } from 'react';
import Pagination from '../../components/pagination';
import { Table } from 'react-bootstrap';
import { Button, Form , Col} from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../../api-services/transfer-eval-service';

function TransferEvaluationList(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [transferEvalsPerPage] = useState(5);

    // Get current transfer evals
    const indexOfLastTransferEval = currentPage * transferEvalsPerPage;
    const indexOfFirstTransferEval = indexOfLastTransferEval - transferEvalsPerPage;
    // const currentTransferEvals = props.transferEvals.slice(indexOfFirstTransferEval, indexOfLastTransferEval);
    const [currentTransferEvals,setcurrentTransferEvals] = useState(props.transferEvals.slice(indexOfFirstTransferEval, indexOfLastTransferEval));

    const [selectedMajorName, setselectedMajorName] = useState('');
    const [majorNamesArr,setmajorNamesArr] = useState(['select']);

    const [selectedSchoolName, setselectedSchoolName] = useState('');
    const [schoolNamesArr,setschoolNamesArr] = useState(['select']);

    useEffect(() => {
        let temp = props.transferEvals;
        temp = selectedMajorName ? temp.filter(word => word.major === selectedMajorName) : temp;
        temp = selectedSchoolName ? temp.filter(word => word.school === selectedSchoolName) : temp;
        setcurrentTransferEvals(temp.slice(indexOfFirstTransferEval, indexOfLastTransferEval));

        setmajorNamesArr([...new Set(props.transferEvals.map(item => item.major))])

        // setschoolNamesArr([...new Set(props.transferEvals.map(item => item.school))])
      }, [props.transferEvals,currentPage,selectedMajorName,selectedSchoolName])

    useEffect(()=>{
      let temp = props.transferEvals.filter(word => word.major === selectedMajorName);
      setschoolNamesArr([...new Set(temp.map(item => item.school))])
    },[selectedMajorName])

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

    const SchoolSelector = () =>{
      function SchoolOptions(){
        return schoolNamesArr.map(
          (eachName,i) => {
            return  <option key={i}>{eachName}</option>
          }
        )
      }
      return(
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>School Name</Form.Label>
              <Form.Control as="select" size="sm" custom
                value={selectedSchoolName}
                onChange={evt => setselectedSchoolName(evt.target.value)}>
                  <option>----Select School Name----</option>
                  <SchoolOptions/>
              </Form.Control>
        </Form.Group>
      )
    }


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const transferEvalClicked = transferEval => evt => {
        props.transferEvalClicked(transferEval);
    }

    const editClicked = transferEval => {
        props.editClicked(transferEval);
      }

    const deleteClicked = transferEval => {
        if (window.confirm("Are you sure?")) {
            API.deleteTransferEvaluation(transferEval.transfer_eval_id)
            .then( () => props.deleteClicked(transferEval))
            .catch( error => console.log(error))
        } else {
            console.log("You clicked cancel");
        }
      }

    const newTransferEval = () => {
        props.newTransferEval();
    }

    return (
        <>
        <Form style={{ display: 'flex',alignItems:'center'}}>
            <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Row >
              <MajorSelect/>
              <SchoolSelector/>
              </Form.Row>
            </Form.Group>
          </Form>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>MAJOR NAME</th>
                    <th>INSTITUTION/SCHOOL NAME</th>
                    <th>COURSE #</th>
                    <th>COURSE TITLE</th>
                    <th>UNHM EQUIVALENT</th>
                    <th>APPROVED STATUS</th>
                    <th>APPROVER NAME</th>
                    <th>SEM/YEAR TAKEN</th>
                    <th>EXPIRATION DATE</th>
                    <th/>
                    <th>
                        <FontAwesomeIcon icon={faPlus} alignmentBaseline='before-edge' onClick={newTransferEval}/>
                    </th>
                </tr>
            </thead>
            <tbody>
                    { currentTransferEvals && currentTransferEvals.map( (transferEval,i) => {
                    return (
                        <tr key={i}>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.major}
                            </td>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.school}
                            </td>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.course_number}
                            </td>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.course_title}
                            </td>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.unhm_eq}
                            </td>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.approved_status}
                            </td>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.approver}
                            </td>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.sem_year_taken}
                            </td>
                            <td onClick={transferEvalClicked(transferEval)}>
                                {transferEval.expiration_date}
                            </td>
                            <td>
                                <Button variant="outline-primary" onClick={() => editClicked(transferEval)}>Edit</Button>
                            </td>
                            <td>
                                <Button variant="outline-danger" onClick={() => deleteClicked(transferEval)}>Delete</Button>
                            </td>
                        </tr>
                    )})}
            </tbody>
        </Table>
            <Pagination elementsPerPage={transferEvalsPerPage} totalElements={props.transferEvals.length} paginate={paginate}/>
    </>
    )
}

export default TransferEvaluationList;
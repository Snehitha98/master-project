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

    function compareMajorName( a, b ) {
        if ( a.major < b.major ){
          return -1;
        }
        if ( a.major > b.major ){
          return 1;
        }
        return 0;
      }

      function comparedescMajorName( a, b ) {
        if ( a.major < b.major ){
          return 1;
        }
        if ( a.major > b.major ){
          return -1;
        }
        return 0;
      }

      function compareSchool( a, b ) {
        if ( a.school < b.school ){
          return -1;
        }
        if ( a.school > b.school ){
          return 1;
        }
        return 0;
      }

      function comparedescSchool( a, b ) {
        if ( a.school < b.school ){
          return 1;
        }
        if ( a.school > b.school ){
          return -1;
        }
        return 0;
      }

      function compareCourseNumber( a, b ) {
        if ( a.course_number < b.course_number ){
          return -1;
        }
        if ( a.course_number > b.course_number ){
          return 1;
        }
        return 0;
      }
      function comparedescCourseNumber( a, b ) {
        if ( a.course_number < b.course_number ){
          return 1;
        }
        if ( a.course_number > b.course_number ){
          return -1;
        }
        return 0;
      }

      function compareCourseTitle( a, b ) {
        if ( a.course_title < b.course_title ){
          return -1;
        }
        if ( a.course_title > b.course_title ){
          return 1;
        }
        return 0;
      }

      function comparedescCourseTitle( a, b ) {
        if ( a.course_title < b.course_title ){
          return 1;
        }
        if ( a.course_title > b.course_title ){
          return -1;
        }
        return 0;
      }

      function compareUnhm( a, b ) {
        if ( a.unhm_eq < b.unhm_eq ){
          return -1;
        }
        if ( a.unhm_eq > b.unhm_eq ){
          return 1;
        }
        return 0;
      }

      function comparedescUnhm( a, b ) {
        if ( a.unhm_eq < b.unhm_eq ){
          return 1;
        }
        if ( a.unhm_eq > b.unhm_eq ){
          return -1;
        }
        return 0;
      }

      function compareApprovedStatus( a, b ) {
        if ( a.approved_status < b.approved_status ){
          return -1;
        }
        if ( a.approved_status > b.approved_status ){
          return 1;
        }
        return 0;
      }

      function comparedescApprovedStatus( a, b ) {
        if ( a.approved_status < b.approved_status ){
          return 1;
        }
        if ( a.approved_status > b.approved_status ){
          return -1;
        }
        return 0;
      }

      function compareApprover( a, b ) {
        if ( a.approver < b.approver ){
          return -1;
        }
        if ( a.approver > b.approver ){
          return 1;
        }
        return 0;
      }

      function comparedescApprover( a, b ) {
        if ( a.approver < b.approver ){
          return 1;
        }
        if ( a.approver > b.approver ){
          return -1;
        }
        return 0;
      }


      function compareDate( a, b ) {
        var a = Date.parse(a.expiration_date);
        var b = Date.parse(b.expiration_date);
        if ( a < b ){
          return -1;
        }
        if ( a > b ){
          return 1;
        }
        return 0;
      }

      function comparedescDate( a, b ) {
        var a = Date.parse(a.expiration_date);
        var b = Date.parse(b.expiration_date);
        if ( a < b ){
          return 1;
        }
        if ( a > b ){
          return -1;
        }
        return 0;
      }

      function sortFunc(compareby) {
        if (compareby==='majorname'){
            setcurrentTransferEvals(props.transferEvals.sort( compareMajorName ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='descmajorname'){
            setcurrentTransferEvals(props.transferEvals.sort( comparedescMajorName ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='school'){
            setcurrentTransferEvals(props.transferEvals.sort( compareSchool ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='descschool'){
            setcurrentTransferEvals(props.transferEvals.sort( comparedescSchool ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='coursenumber'){
            setcurrentTransferEvals(props.transferEvals.sort( compareCourseNumber ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='desccoursenumber'){
            setcurrentTransferEvals(props.transferEvals.sort( comparedescCourseNumber ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='coursetitle'){
            setcurrentTransferEvals(props.transferEvals.sort( compareCourseTitle ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='coursedesctitle'){
            setcurrentTransferEvals(props.transferEvals.sort( comparedescCourseTitle ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }

        if (compareby==='unhm'){
            setcurrentTransferEvals(props.transferEvals.sort( compareUnhm ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='descunhm'){
            setcurrentTransferEvals(props.transferEvals.sort( comparedescUnhm ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='approvedstatus'){
            setcurrentTransferEvals(props.transferEvals.sort( compareApprovedStatus ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='descapprovedstatus'){
            setcurrentTransferEvals(props.transferEvals.sort( comparedescApprovedStatus ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='approver'){
            setcurrentTransferEvals(props.transferEvals.sort( compareApprover ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='descapprover'){
            setcurrentTransferEvals(props.transferEvals.sort( comparedescApprover ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='date'){
            setcurrentTransferEvals(props.transferEvals.sort( compareDate ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
        if (compareby==='descdate'){
            setcurrentTransferEvals(props.transferEvals.sort( comparedescDate ).slice(indexOfFirstTransferEval, indexOfLastTransferEval));
        }
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
                    <th>
                        <div>MAJOR NAME <br></br>
                            <Button variant="outline-secondary" onClick={() => sortFunc('majorname')}>asc</Button>
                            <Button variant="outline-secondary" onClick={() => sortFunc('descmajorname')}>desc</Button>
                        </div>
                    </th>
                    <th>
                        <div>INSTITUTION/SCHOOL NAME<br></br>
                    <Button variant="outline-secondary" onClick={() => sortFunc('school')}>asc</Button>
                            <Button variant="outline-secondary" onClick={() => sortFunc('descschool')}>desc</Button>
                        </div>
                    </th>
                    <th>
                        <div>COURSE #<br></br>
                            <Button variant="outline-secondary" onClick={() => sortFunc('coursenumber')}>asc</Button>
                            <Button variant="outline-secondary" onClick={() => sortFunc('desccoursenumber')}>desc</Button>

                        </div>
                    </th>
                    <th>
                        <div>COURSE TITLE<br></br>
                            <Button variant="outline-secondary" onClick={() => sortFunc('coursetitle')}>asc</Button>
                            <Button variant="outline-secondary" onClick={() => sortFunc('coursedesctitle')}>desc</Button>
                        </div>
                    </th>
                    <th>
                        <div>UNHM EQUIVALENT<br></br>
                            <Button variant="outline-secondary" onClick={() => sortFunc('unhm')}>asc</Button>
                            <Button variant="outline-secondary" onClick={() => sortFunc('descunhm')}>desc</Button>
                        </div>
                    </th>
                    <th>
                        <div>APPROVED STATUS<br></br>
                            <Button variant="outline-secondary" onClick={() => sortFunc('approvedstatus')}>asc</Button>
                            <Button variant="outline-secondary" onClick={() => sortFunc('descapprovedstatus')}>desc</Button>
                        </div>

                    </th>
                    <th>
                        <div>APPROVER NAME<br></br>
                            <Button variant="outline-secondary" onClick={() => sortFunc('approver')}>asc</Button>
                            <Button variant="outline-secondary" onClick={() => sortFunc('descapprover')}>desc</Button>
                        </div>
                    </th>
                    <th>
                        <div>EXPIRATION DATE<br></br>
                            <Button variant="outline-secondary" onClick={() => sortFunc('date')}>asc</Button>
                            <Button variant="outline-secondary" onClick={() => sortFunc('descdate')}>desc</Button>
                        </div>
                    </th>
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
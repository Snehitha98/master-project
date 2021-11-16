import React, { useState, useEffect } from 'react';
import { API } from '../../api-services/transfer-eval-service';
import { Form, Modal, Button } from 'react-bootstrap';
import '../../App.css';

function TransferEvaluationForm(props) {

    const [major_req_id, setMajorReqId] = useState('');
    const [majorReqs, setMajorReqs] = useState('');
    const [transfer_course_id, setTransferCourseId] = useState('');
    const [transferCourses, setTransferCourses] = useState('');
    const [approver_id, setApproverId] = useState('');
    const [approvers, setApprovers] = useState('');
    const [major_id, setMajorId] = useState('');
    const [majors, setMajors] = useState('');
    const [school_id, setSchoolId] = useState('');
    const [schools, setSchools] = useState('');
    const [subjectNumber, setSubjectNumber] = useState('');
    const [title, setTitle] = useState('');
    const [unhmEq, setUnhmEq] = useState('');
    const [approverName, setApproverName] = useState('');
    const [approvedStatus, setApprovedStatus] = useState('');
    const [semYearTaken, setSemYearTaken] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setSchoolId(props.transferEval.school_id)
        setMajorId(props.transferEval.major_id)
        setMajorReqId(props.transferEval.major_req_id);
        setTransferCourseId(props.transferEval.transfer_course_id);
        setApproverId(props.transferEval.approver_id);
        setSubjectNumber(props.transferEval.course_number);
        setTitle(props.transferEval.course_title);
        setUnhmEq(props.transferEval.unhm_eq);
        setApproverName(props.transferEval.approver);
        setApprovedStatus(props.transferEval.approved_status);
        setSemYearTaken(props.transferEval.sem_year_taken);
        setExpirationDate(props.transferEval.expiration_date)
    }, [props.transferEval])

    // changing the format of the date, django accepts date in only a specific format
    const formatExpirationDate = (value) => {
        value = value.split('-');
       return  value[2] + '-' + value[1] + '-' + value[0];
    }

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

    useEffect(() => {
        fetch("http://127.0.0.1:8000/transfer-course-list/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then( resp => resp.json())
        .then( resp => setTransferCourses(resp))
        .catch(error => console.log(error))
      }, [])

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

    useEffect(() => {
        fetch("http://127.0.0.1:8000/approver-list/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then( resp => resp.json())
        .then( resp => setApprovers(resp))
        .catch(error => console.log(error))
      }, [])

    const updateClicked = (e) => {
        debugger;
        API.updateTransferEvaluation(props.transferEval.transfer_eval_id,
                                        {
                                            transfer_eval_id: props.transferEval.transfer_eval_id,
                                            major_id: major_id,
                                            school_id: school_id,
                                            transfer_course_id: transfer_course_id,
                                            major_req_id: major_req_id,
                                            approver_id: approver_id,
                                            approved_status: approvedStatus,
                                            expiration_date: formatExpirationDate(expirationDate),
                                            sem_year_taken: semYearTaken
                                        })
            .then(resp => {
                    console.log(resp);
                    if(!resp.isError) {
                    props.updatedTransferEvaluation(resp);
                    } else {
                        setErrorMsg('updating');
                    }
                });
                e.preventDefault();
    };

    const createClicked =  (e) => {

        setErrorMsg(null);
        API.createTransferEvaluation({
                                        major_id: major_id,
                                        school_id: school_id,
                                        transfer_course_id: transfer_course_id,
                                        major_req_id: major_req_id,
                                        approver_id: approver_id,
                                        approved_status: approvedStatus,
                                        expiration_date: formatExpirationDate(expirationDate),
                                        sem_year_taken: semYearTaken
                                    })
            .then(resp => {

                if(!resp.isError) {
                    props.transferEvalCreated(resp.resp);
                } else {
                    setErrorMsg('creating');
                }
            });
            e.preventDefault();
    };

    const cancelClicked = (e) => {
        return(
            <p>You have clicked cancel</p>
        )
    }

    return (
        <div>
            {props.transferEval ? (
                <Form id='form-css'>
                    <Form.Label htmlFor="major">Major</Form.Label>
                    <select id="major"
                            className='form-control'
                            value={major_id}
                            onChange={evt => setMajorId(evt.target.value)}>
                                <option disabled selected>----select----</option>
                                {majors && majors.map( major => {
                                    return (
                                        <option key={major.major_id} value={major.major_id}>{major.major_name} </option>
                                    )
                                })}
                    </select>
                    <Form.Label htmlFor="school">School</Form.Label>
                    <select id="school"
                            className='form-control'
                            value={school_id}
                            onChange={evt => setSchoolId(evt.target.value)}>
                                <option disabled selected>----select----</option>
                                {schools && schools.map( school => {
                                    return (
                                        <option key={school.school_id} value={school.school_id}>{school.school_name} </option>
                                    )
                                })}
                    </select><br />
                    <Form.Label htmlFor="tcnumber">Transfer course number</Form.Label>
                    <select id="tcnumber"
                            className='form-control'
                            value={transfer_course_id}
                            onChange={evt => setTransferCourseId(evt.target.value)}>
                                <option>----select----</option>
                                {transferCourses && transferCourses.map( tc => {
                                    return (
                                        <option key={tc.transfer_course_id} value={tc.transfer_course_id}>{tc.subject_number} </option>
                                    )
                                })}
                    </select><br />
                    <Form.Label htmlFor="unhm">UNH M Equivalent</Form.Label>
                    <select id="unhm"
                            className='form-control'
                            value={major_req_id}
                            onChange={evt => setMajorReqId(evt.target.value)}>
                                <option>----select----</option>
                                {majorReqs && majorReqs.map( mr => {
                                    return (
                                        <option key={mr.major_req_id} value={mr.major_req_id}>{mr.description} </option>
                                    )
                                })}
                    </select><br />
                    <Form.Label htmlFor="approver">Approver name</Form.Label>
                    <select id="approver"
                            className='form-control'
                            value={approver_id}
                            onChange={evt => setApproverId(evt.target.value)}>
                                <option>----select----</option>
                                {approvers && approvers.map( app => {
                                    return (
                                        <option key={app.approver_id} value={app.approver_id}>{app.approver_name} </option>
                                    )
                                })}
                    </select>
                    <Form.Label htmlFor="approved_status">Approved status</Form.Label>
                    <select id="approved_status"
                            className='form-control'
                            value={approvedStatus}
                            onChange={evt => setApprovedStatus(evt.target.value)}>
                                <option selected>----select----</option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                    </select><br />
                    <Form.Label htmlFor="semyeartaken">Sem/year taken</Form.Label>
                    <Form.Control id="semyeartaken" type="text" placeholder="Enter the sem/year taken"
                        value={semYearTaken} onChange={evt => setSemYearTaken(evt.target.value)}/><br/>
                    <Form.Label htmlFor="expiration">Expiration date</Form.Label>
                    <Form.Control id="expiration" type="date" placeholder="dd.MM.yyyy"
                        value={expirationDate} onChange={evt => setExpirationDate(evt.target.value)}/><br/>

                    {
                        errorMsg ?
                        <p style={{color:'red'}}> Error {errorMsg} the transfer eval</p>
                        : null
                    }
                    { props.transferEval.transfer_eval_id ?
                            <Button variant="outline-success" type="submit" onClick={updateClicked}>
                                Update
                            </Button> :
                            <Button variant="outline-success" type="submit" onClick={createClicked}>
                                Create
                            </Button>
                        }&nbsp;&nbsp;
                    <Button variant="outline-danger" type="submit" onClick={cancelClicked}>Cancel</Button>
                </Form>
            ) : null }
        </div>
    )
}

export default TransferEvaluationForm;
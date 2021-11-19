import React, { useState, useEffect } from 'react';
import { API } from '../../api-services/transfer-eval-service';
import { Form, Modal, Button, Col } from 'react-bootstrap';
import '../../App.css';
import TransferCourseForm from '../transfer-course-components/transfer-course-form';
import { TCAPI } from '../../api-services/transfer-course-service';
import { MRAPI } from '../../api-services/major-req-service';

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

    const [school, setSchool] = useState('');
    // const schoolRef = React.useRef();

    const [state, setState] = useState('');
    const stateRef = React.useRef();

    const [subjectNumber, setSubjectNumber] = useState('');
    const subjectNumberRef = React.useRef();

    const [title, setTitle] = useState('');
    const titleRef = React.useRef();

    const [description, setDescription] = useState('');
    const descriptionRef = React.useRef();

    const[majorreqtitle, setMajorreqtitle] = useState('');
    const majorreqtitleRef = React.useRef();

    const [unhmEq, setUnhmEq] = useState('');
    const [approverName, setApproverName] = useState('');
    const [approvedStatus, setApprovedStatus] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setSchoolId(props.transferEval.school_id)
        setSchool(props.transferEval.school)
        setState(props.transferEval.state)
        setMajorId(props.transferEval.major_id)
        setMajorReqId(props.transferEval.major_req_id);
        setTransferCourseId(props.transferEval.transfer_course_id);
        setApproverId(props.transferEval.approver_id);
        setSubjectNumber(props.transferEval.course_number);
        setTitle(props.transferEval.course_title);
        setMajorreqtitle(props.transferEval.major_req_title);
        setDescription(props.transferEval.unhm_eq);
        setApproverName(props.transferEval.approver);
        setApprovedStatus(props.transferEval.approved_status);
        setExpirationDate(props.transferEval.expiration_date)
    }, [props.transferEval])

    // changing the format of the date, django accepts date in only a specific format
    const formatExpirationDate = (value) => {
        value = value.split('-');
       return  value[2] + '-' + value[1] + '-' + value[0];
    }

    useEffect(()=>{
        console.log("transfer_course_id",transfer_course_id)
    })

    useEffect(()=>{
        subjectNumberRef.current.focus();
     },[subjectNumber])

    useEffect(()=>{
        titleRef.current.focus();
        },[title])

    useEffect(()=>{
        descriptionRef.current.focus();
        },[description])

    useEffect(()=>{
        majorreqtitleRef.current.focus();
        },[majorreqtitle])

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
        // debugger;
        API.updateTransferEvaluation(props.transferEval.transfer_eval_id,
                                        {
                                            transfer_eval_id: props.transferEval.transfer_eval_id,
                                            major_id: major_id,
                                            school_id: school_id,
                                            school_name: school,
                                            transfer_course_id: transfer_course_id,
                                            major_req_id: major_req_id,
                                            major_req_title: majorreqtitle,
                                            approver_id: approver_id,
                                            approved_status: approvedStatus,
                                            expiration_date: formatExpirationDate(expirationDate),
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

        let createNewObjData = {
            major_id: major_id,
            school_id: school_id,
            transfer_course_id: transfer_course_id,
            major_req_id: major_req_id,
            approver_id: approver_id,
            approved_status: approvedStatus,
            expiration_date: formatExpirationDate(expirationDate),
        }

       let isTransferReady = true
       let isMajorReady = true
       let isSchoolReady = true

        function firstFunction(){
            if ( transfer_course_id==='' || transfer_course_id==='----select----'){
                isTransferReady = false
                console.log("Create new transfer_course")
                TCAPI.createTransferCourse({title: title, subject_number: subjectNumber, school: school_id})
                .then(resp => {
                    createNewObjData.transfer_course_id=resp.transfer_course_id
                    isTransferReady = true
                    console.log("obj:",createNewObjData)
                });
            }

            if ( major_req_id==='' || major_req_id==='----select----'){
                isMajorReady = false
                console.log("create new UNHM")
                MRAPI.createMajorReq({description: description, major_req_title: majorreqtitle, major_id: major_id})
                .then(resp => {
                    createNewObjData.major_req_id=resp.major_req_id
                    isMajorReady = true
                    console.log("obj:",createNewObjData)
                });
            }

            if ( school_id==='' || school_id==='----select----'){
                isSchoolReady = false
                console.log("create new school or state")
                API.createSchool({school_id: school_id, school: school, state: state})
                .then(resp => {
                    createNewObjData.school_id=resp.school_id
                    isSchoolReady = true
                    console.log("obj:",createNewObjData)
                });

            }
            return(createNewObjData)
        }

        const secondFunction = async () => {
            const result = await firstFunction()
            // do something else here after firstFunction completes

            setErrorMsg(null);


            setTimeout(function(){

                console.log("create new transfereval")
                API.createTransferEvaluation(result)
                    .then(resp => {

                        if(!resp.isError) {
                            props.transferEvalCreated(resp.resp);
                        } else {
                            setErrorMsg('creating');
                        }
                    });


            }, 1000);



            }
        secondFunction();
        e.preventDefault();
    };

    const cancelClicked = (e) => {
        return(
            <p>You have clicked cancel</p>
        )
    }

    const updatedTransferCourse = course => {
        const newCourses = transferCourses.map( newCourse => {
          if (newCourse.transfer_course_id === course.transfer_course_id) {
            return course;
          }
          return newCourse;
        })
        setTransferCourses(newCourses);
      }

    const transferCourseCreated = course => {
        const newCourses = [...transferCourses, course];
        setTransferCourses(newCourses);
      }

    const NewTransferCourse = () =>{

        return(
            <div>
                        <Form.Label htmlFor="subjectnumber">Transfer course #</Form.Label>
                        <Form.Control id="subjectnumber" type="text" placeholder="Enter course number"
                            value={subjectNumber} ref={subjectNumberRef} onChange={evt => setSubjectNumber(evt.target.value)}/>
                        <Form.Label htmlFor="name">Transfer course title</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter course title"
                            value={title} ref={titleRef} onChange={evt => setTitle(evt.target.value)}/>
                        {/*<Form.Label htmlFor="school">School name</Form.Label>*/}
                        {/*    <select id='school'*/}
                        {/*            className='form-control'*/}
                        {/*            value={school_id}*/}
                        {/*            onChange={evt => setSchoolId(evt.target.value)}>*/}
                        {/*        <option>----select----</option>*/}
                        {/*        { schools && schools.map( school => {*/}
                        {/*            return (*/}
                        {/*                <option key={school.school_id} value={school.school_id}>{school.school_name}</option>*/}
                        {/*            )*/}
                        {/*        })}*/}
                        {/*    </select>*/}
                </div>
        )
    }

    const NewUNHM = () => {

        return(

                <div>
                        <Form.Label htmlFor="name">UNHM course #</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter course number"
                            value={description} ref={descriptionRef} onChange={evt => setDescription(evt.target.value)}/>
                        <Form.Label htmlFor="unhm">UNHM course title</Form.Label>
                        <Form.Control id="unhm" type="text" placeholder="Enter course title"
                            value={majorreqtitle} ref={majorreqtitleRef} onChange={evt => setMajorreqtitle(evt.target.value)}/>
                        {/*<Form.Label htmlFor="school">Major name</Form.Label>*/}
                        {/*    <select id='major'*/}
                        {/*            className='form-control'*/}
                        {/*            value={major_id}*/}
                        {/*            onChange={evt => setMajorId(evt.target.value)}>*/}
                        {/*            <option>----select----</option>*/}
                        {/*        { majors && majors.map( major => {*/}
                        {/*            return (*/}
                        {/*                <option key={major.major_id} value={major.major_id}>{major.major_name}</option>*/}
                        {/*            )*/}
                        {/*        })}*/}
                        {/*    </select>*/}
                </div>
        )
    }

    return (
        <div style={{ display: 'flex',  justifyContent:'center', alignItems:'center' , padding:'20px'}}>
            {props.transferEval ? (
                <Form id='form-css'>
                    <Form.Label htmlFor="major">Major</Form.Label>
                    <select id="major"
                            className='form-control'
                            value={major_id}
                            onChange={evt => setMajorId(evt.target.value)}>
                                <option>----select----</option>
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
                                    <option >----select----</option>
                                    {schools && schools.map( school => {
                                        return (
                                            <option key={school.school_id} value={school.school_id}>{school.school_name} </option>
                                        )
                                    })}
                        </select>
                    <br />

                    {/*<div style={{ display:'flex', flexDirection:'row'}}>*/}
                    {/*    <div style={{ width:"250px"}}>*/}
                    {/*    <Form.Label htmlFor="tcnumber">Transfer course number</Form.Label>*/}
                    {/*    <select id="tcnumber"*/}
                    {/*            className='form-control'*/}
                    {/*            value={transfer_course_id}*/}
                    {/*            onChange={evt => setTransferCourseId(evt.target.value)}>*/}
                    {/*                <option>----select----</option>*/}
                    {/*                {transferCourses && transferCourses.map( tc => {*/}
                    {/*                    return (*/}
                    {/*                        <option key={tc.transfer_course_id} value={tc.transfer_course_id}>{tc.subject_number} </option>*/}
                    {/*                    )*/}
                    {/*                })}*/}
                    {/*    </select>*/}
                    {/*    </div>*/}

                    {/*    <p style={{ width:"150px", paddingTop:"50px"}}>OR</p>*/}

                        <div style={{ width:"500px"}}>
                            <NewTransferCourse/>
                        </div>
                    {/*</div>*/}
                    <br />

                    <div style={{ display:'flex', flexDirection:'row'}}>
                        <div style={{ width:"250px"}}>
                        <Form.Label htmlFor="unhm">UNHM course number</Form.Label>
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
                        </select>
                        </div>

                        <p style={{ width:"150px", paddingTop:"50px"}}>OR</p>

                        <div style={{ width:"500px"}}>
                        <NewUNHM/>
                        </div>
                    </div>
                    <br />
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
                                <option>----select----</option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                    </select>
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

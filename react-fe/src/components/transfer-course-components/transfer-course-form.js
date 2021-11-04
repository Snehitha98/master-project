import React, { useState, useEffect } from 'react';
import { TCAPI } from '../../api-services/transfer-course-service';
import { Form, Button } from 'react-bootstrap'
import '../../App.css'
import { optionsState } from 'react';

function TransferCourseForm(props) {

    const [school_id, setSchoolId] = useState('');
    const [schools, setSchools] = useState('');
    const [subjectNumber, setSubjectNumber] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(props.course.title);
        setSchoolId(props.course.school_id);
        setSubjectNumber(props.course.subject_number);
    }, [props.course])

    const updateClicked = () => {
        TCAPI.updateTransferCourse(props.course.transfer_course_id, {title: title, subject_number: subjectNumber, school: school_id})
            .then(resp => {
                 props.updatedTransferCourse(resp) });
    };

    const createClicked = () => {
        TCAPI.createTransferCourse({title: title, subject_number: subjectNumber, school: school_id})
            .then(resp => props.transferCourseCreated(resp));
    };

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

    return (
        <React.Fragment>
            { props.course ? (
                <div>
                    <Form id='form-css'>
                        <Form.Label htmlFor="name">Course Title</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter name"
                            value={title} onChange={evt => setTitle(evt.target.value)}/>
                        <Form.Label htmlFor="school">Institution name</Form.Label>
                            <select id='school'
                                    className='form-control'
                                    value={school_id}
                                    onChange={evt => setSchoolId(evt.target.value)}>
                                <option disabled selected>----select----</option>
                                { schools && schools.map( school => {
                                    return (
                                        <option key={school.school_id} value={school.school_id}>{school.school_name}</option>
                                    )
                                })}
                            </select>
                            {console.log(school_id)}
                        <Form.Label htmlFor="subjectnumber">Course #</Form.Label>
                        <Form.Control id="subjectnumber" type="text" placeholder="Enter subject number"
                            value={subjectNumber} onChange={evt => setSubjectNumber(evt.target.value)}/><br/>

                        { props.course.transfer_course_id ?
                            <Button variant="outline-success" type="submit" onClick={updateClicked}>
                                Update
                            </Button> :
                            <Button variant="outline-success" type="submit" onClick={createClicked}>
                                Create
                            </Button>
                        }
                    </Form>
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default TransferCourseForm;
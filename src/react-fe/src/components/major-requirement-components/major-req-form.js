import React, { useState, useEffect } from 'react';
import { MRAPI } from '../../api-services/major-req-service';
import { Form, Button } from 'react-bootstrap'
import '../../App.css'

function MajorRequirementForm(props) {

    const [major_id, setMajorId] = useState('');
    const [majors, setMajors] = useState('');
    const [description, setDescription] = useState('');
    const [major_req_title, setMajorReqTitle] = useState('');

    useEffect(() => {
        setDescription(props.majorReq.description);
        setMajorReqTitle(props.majorReq.major_req_title);
        setMajorId(props.majorReq.major_id);
    }, [props.majorReq])

    const updateClicked = () => {
        MRAPI.updateMajorReq(props.majorReq.major_req_id, {description: description, major_req_title: major_req_title, major_id: major_id})
            .then(resp => {
                 props.updateMajorReq(resp) });
    };

    const createClicked = () => {
        MRAPI.createMajorReq({description: description, major_req_title: major_req_title, major_id: major_id})
            .then(resp => props.majorReqCreated(resp));
    };

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

    return (
        <React.Fragment>
            { props.majorReq ? (
                <div>
                    <Form id='form-css'>
                        <Form.Label htmlFor="name">UNHM Course #</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter name"
                            value={description} onChange={evt => setDescription(evt.target.value)}/>
                        <Form.Label htmlFor="school">Major name</Form.Label>
                            <select id='major'
                                    className='form-control'
                                    value={major_id}
                                    onChange={evt => setMajorId(evt.target.value)}>
                                { majors && majors.map( major => {
                                    return (
                                        <option key={major.major_id} value={major.major_id}>{major.major_name}</option>
                                    )
                                })}
                            </select>
                            <Form.Label htmlFor="majorreqtitle">Course Title</Form.Label>
                        <Form.Control id="majorreqtitle" type="text" placeholder="Enter course title"
                            value={major_req_title} onChange={evt => setMajorReqTitle(evt.target.value)}/><br/>

                        { props.majorReq.major_req_id ?
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

export default MajorRequirementForm;
import React, { useState, useEffect } from 'react';
import { API } from '../../api-services/school-services';
import { Form, Button } from 'react-bootstrap'
import '../../App.css'

function SchoolForm(props) {

    const [schoolName, setSchoolName] = useState('');
    const [stateName, setStateName] = useState('');

    useEffect(() => {
        setSchoolName(props.school.school_name);
        setStateName(props.school.state_name);
    }, [props.school])

    const updateClicked = () => {
        API.updateSchool(props.school.school_id, {school_name: schoolName, state_name: stateName})
            .then(resp => {
                 props.updatedSchool(resp) });
    };

    const createClicked = () => {
        console.log("In school-form", stateName);
        API.createSchool({school_name: schoolName, state_name: stateName})
            .then(resp => props.schoolCreated(resp));
    };

    return (
        <React.Fragment>
            { props.school ? (
                <div>
                    <Form id='form-css'>
                        <Form.Label htmlFor="name">Institution name</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter name"
                            value={schoolName} onChange={evt => setSchoolName(evt.target.value)}/>
                        <Form.Label htmlFor="school">State name</Form.Label>
                         <Form.Control id="name" type="text" placeholder="Enter name"
                            value={stateName} onChange={evt => setStateName(evt.target.value)}/>
                            
                        { props.school.school_id ?
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

export default SchoolForm;
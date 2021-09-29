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
        console.log("In achool-form", stateName);
        API.createSchool({school_name: schoolName, state_name: stateName})
            .then(resp => props.schoolCreated(resp));
    };

    return (
        <React.Fragment>
            { props.school ? (
                <div>
                    <Form id='form-css'>
                        <Form.Label htmlFor="name">School name</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter name"
                            value={schoolName} onChange={evt => setSchoolName(evt.target.value)}/>
                        <Form.Label htmlFor="school">School name</Form.Label>
                        <select id = "state" className="form-control" onChange={evt => setStateName(evt.target.value)}>
                            <option disabled selected>-- Select State --</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select><br/>

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
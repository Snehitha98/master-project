import React, { useState, useEffect } from 'react';
import { MajorAPI } from '../../api-services/major-service';
import { Form, Button } from 'react-bootstrap'
import '../../App.css'

function MajorForm(props) {

    const [majorName, setMajorName] = useState('');

    useEffect(() => {
        setMajorName(props.major.major_name);
    }, [props.major])

    const updateClicked = () => {
        MajorAPI.updateMajor(props.major.major_id, majorName)
            .then(resp => {
                 props.updatedMajor(resp) });
    };

    const createClicked = () => {
        MajorAPI.createMajor(majorName)
            .then(resp => props.majorCreated(resp));
    };


    return (
        <React.Fragment>
            { props.major ? (
                <div>
                    <Form id='form-css'>
                        <Form.Label htmlFor="name">Major name</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter name"
                            value={majorName} onChange={evt => setMajorName(evt.target.value)}/><br/>
                        { props.major.major_id ?
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

export default MajorForm;
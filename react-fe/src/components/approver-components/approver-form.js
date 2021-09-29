import React, { useState, useEffect } from 'react';
import { ApproverAPI } from '../../api-services/approver-service';
import { Form, Button } from 'react-bootstrap'
import '../../App.css'

function ApproverForm(props) {

    const [approverName, setApproverName] = useState('');

    useEffect(() => {
        setApproverName(props.approver.approver_name);
    }, [props.approver])

    const updateClicked = () => {
        ApproverAPI.updateApprover(props.approver.approver_id, approverName)
            .then(resp => {
                 props.updatedApprover(resp) });
    };

    const createClicked = () => {
        debugger;
        ApproverAPI.createApprover(approverName)
            .then(resp => props.approverCreated(resp));
    };


    return (
        <React.Fragment>
            { props.approver ? (
                <div>
                    <Form id='form-css'>
                        <Form.Label htmlFor="name">Approver name</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter name"
                            value={approverName} onChange={evt => setApproverName(evt.target.value)}/><br/>
                        { props.approver.approver_id ?
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

export default ApproverForm;
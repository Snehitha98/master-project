import React from "react";
import { Modal, Button } from 'react-bootstrap';

function DetailModal(props) {

    return (
        <>
        <Modal.Dialog>
        <Modal.Header closeButton>
            <Modal.Title id='example-modal-sizes-title-lg'>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
        </Modal.Footer>
        </Modal.Dialog>
        <div>
            {props.transferEval ? (
                <div>
                    <h5><i> Details of the selected evaluation</i></h5><br />
                    <em> &nbsp;Transfer Eval ID: {props.transferEval.transfer_eval_id}</em><br />
                    <em> &nbsp;Transfer Course name: {props.transferEval.course_title}</em><br />
                    <em> &nbsp;Major name: {props.transferEval.major}</em><br />
                    <em> &nbsp;Course number: {props.transferEval.course_number}</em><br />
                    <em> &nbsp;UNHM Equivalent: {props.transferEval.unhm_eq}</em><br />
                    <em> &nbsp;Approved Status: {props.transferEval.approved_status}</em><br />
                    <em> &nbsp;Approver: {props.transferEval.approver}</em><br />
                    <em> &nbsp;Sem/year taken: {props.transferEval.sem_year_taken}</em><br />
                    <em> &nbsp;Expiration date: {props.transferEval.expiration_date}</em><br />
                </div>
            ) : null}
        </div>
        </>
    )
}

export default DetailModal;
import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-layout-components';

function TransferEvaluationDetails(props) {

    const openList = () => {
        props.openList();
    }

    return (
        <Modal.Dialog>
        <Modal.Header closeButton onClick={openList}>
            <Modal.Title id='example-modal-sizes-title-lg'>Transfer evaluation details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <em> &nbsp;Transfer Eval ID: {props.transferEval.transfer_eval_id}</em><br />
            <em> &nbsp;Transfer Course name: {props.transferEval.course_title}</em><br />
            <em> &nbsp;Major name: {props.transferEval.major}</em><br />
            <em> &nbsp;Course number: {props.transferEval.course_number}</em><br />
            <em> &nbsp;UNHM Equivalent: {props.transferEval.unhm_eq}</em><br />
            <em> &nbsp;Approved Status: {props.transferEval.approved_status}</em><br />
            <em> &nbsp;Approver: {props.transferEval.approver}</em><br />
            <em> &nbsp;Sem/year taken: {props.transferEval.sem_year_taken}</em><br />
            <em> &nbsp;Expiration date: {props.transferEval.expiration_date}</em><br />
            <em> &nbsp;Notes: {props.transferEval.notes}</em><br />
        </Modal.Body>
        </Modal.Dialog>
    )
}

export default TransferEvaluationDetails;
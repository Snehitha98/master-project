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
            {/*<em> &nbsp;Transfer Eval ID: {props.transferEval.transfer_eval_id}</em><br />*/}
            <strong> &nbsp;Major name: </strong> {props.transferEval.major}<br />
            <strong> &nbsp;School name:</strong> {props.transferEval.school}<br/>
            <strong> &nbsp;State name:</strong> {props.transferEval.state}<br/>
            <strong> &nbsp;Transfer Course title:</strong> {props.transferEval.course_title}<br />
            <strong> &nbsp;Transfer Course number:</strong> {props.transferEval.course_number}<br />
            <strong> &nbsp;UNHM Course #:</strong> {props.transferEval.unhm_eq}<br />
            <strong> &nbsp;UNHM Course title: </strong> {props.transferEval.major_req_title}<br />
            <strong> &nbsp;Approved Status:</strong> {props.transferEval.approved_status}<br />
            <strong> &nbsp;Approver: </strong> {props.transferEval.approver}<br />
            <strong> &nbsp;Expiration date: </strong> {props.transferEval.expiration_date}<br />
            <strong> &nbsp;Notes: </strong> {props.transferEval.notes}<br />
        </Modal.Body>
        </Modal.Dialog>
    )
}

export default TransferEvaluationDetails;
import React, { Modal, useState, useEffect } from 'react';
import '../App.css';
import { withRouter } from "react-router-dom";
import TransferEvaluationList from './transfer-eval-components/transfer-eval-list';
import TransferEvaluationDetails from './transfer-eval-components/transfer-eval-details';
import TransferEvaluationForm from './transfer-eval-components/transfer-eval-form';


function TransferEvaluation() {

    const [transferEvals, setTransferEvals] = useState([]);
    const [selectedTransferEval, setSelectedTransferEval] = useState(null);
    const [editedTransferEval, setEditedTransferEval] = useState(null);
    const [courses, setCourses] = useState([]);
    const [transferCourseId, setTransferCourseId] = useState('');
    const [majorReqs, setMajorReqs] = useState([]);
    const [majorReqId, setMajorReqId] = useState('');

    useEffect(() => {
        fetch("http://127.0.0.1:8000/transfer-evaluation-list/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then( resp => resp.json())
        .then( resp => setTransferEvals(resp))
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
        .then( resp => setCourses(resp))
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

    const loadTransferEval = transferEval => {
        setSelectedTransferEval(transferEval);
        setEditedTransferEval(null);
    }

    const newTransferEval = () => {
      setEditedTransferEval({transfer_course_id: '', major_req_id:'', expiration_date: '', approved_status: '', notes:'', approver_id:''});
      setSelectedTransferEval(null);
    }

    const editClicked = transferEval => {
      setEditedTransferEval(transferEval);
      setSelectedTransferEval(null);
    }

    const deleteClicked = transferEval => {
      const newTransferEvals = transferEvals.filter( te => te.transfer_eval_id !== transferEval.transfer_eval_id);
      setTransferEvals(newTransferEvals);
    }

    const updatedTransferEval = transferEval => {
      const newTransferEvals = transferEvals.map( newTransferEval => {
        if (newTransferEval.transfer_eval_id === transferEval.transfer_eval_id) {
          return transferEval;
        }
        return newTransferEval;
      })
      setTransferEvals(newTransferEvals);
      setSelectedTransferEval(null);
      setEditedTransferEval(null);
    }

    const transferEvalCreated = transferEval => {
      const newTransferEvals = [...transferEvals, transferEval];
      setTransferEvals(newTransferEvals);
      setSelectedTransferEval(null);
      setEditedTransferEval(null);
    }

    const openList = () => {
        setSelectedTransferEval(false);
    }

    const transferCourseCreated = course => {
      const newCourses = [...courses, course];
      setCourses(newCourses);
      setTransferCourseId(course.transfer_course_id);
    }

    const majorReqCreated = majorReq => {
      const newMajorReqs = [...majorReqs, majorReq];
      setMajorReqs(newMajorReqs);
      setMajorReqId(majorReq.major_req_id);
    }

    return (
        <div>
            <div className="transfereval">
                {!selectedTransferEval && !editedTransferEval ?
                <TransferEvaluationList
                  transferEvals={transferEvals}
                  transferEvalClicked={loadTransferEval}
                  editClicked={editClicked}
                  deleteClicked={deleteClicked}
                  newTransferEval={newTransferEval}
                />
                    : null }
                {selectedTransferEval ?
                    <TransferEvaluationDetails
                    openList={openList}
                    transferEval={selectedTransferEval}
                    updateTransferEval={loadTransferEval}
                    />
                    : null }
                {editedTransferEval ?
                    <TransferEvaluationForm
                    transferEval={editedTransferEval}
                    updatedTransferEvaluation={updatedTransferEval}
                    transferEvalCreated={transferEvalCreated}
                    transferCourseCreated={transferCourseCreated}
                    transferCourseId={transferCourseId}
                    majorReqCreated={majorReqCreated}
                    majorReqId={majorReqId}
                    />
                    : null}
            </div>
        </div>
      )
}
export default withRouter(TransferEvaluation);


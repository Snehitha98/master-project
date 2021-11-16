export class API {

    static updateTransferEvaluation(transfer_eval_id, body) {

        // debugger;
        const formData = new FormData();
        formData.append('expiration_date', body.expiration_date);
        formData.append('course_number', body.course_number)
        formData.append('transfer_course_id', body.transfer_course_id)
        formData.append('course_title', body.course_title)
        formData.append('major_id', body.major_id)
        formData.append('school_id', body.school_id)
        formData.append('school_name', body.school)
        formData.append('state_name', body.state)
        formData.append('major_req_id', body.major_req_id)
        formData.append('description', body.unhm_eq)
        formData.append('major_req_title', body.major_req_title)
        formData.append('approved_status', body.approved_status)
        formData.append('notes', body.notes)
        formData.append('approver_id', body.approver_id)

        return fetch(`http://127.0.0.1:8000/transfer-evaluation/${transfer_eval_id}/`, {
            crossDomain: true,
            method: 'PUT',
            body: formData
        }).then(resp => resp.json())
            .then(
                resp => {
                    console.log('TESTTTTTT', resp)
                    return resp;
                },
                err => {
                    console.log('TESTTTTTT', err)
                })


    }

    static createTransferEvaluation(body) {
        const formData = new FormData();
        formData.append('expiration_date', body.expiration_date);
        formData.append('transfer_course_id', body.transfer_course_id)
        formData.append('major_id', body.major_id)
        formData.append('school_id', body.school_id)
        formData.append('major_req_id', body.major_req_id)
        formData.append('sem_year_taken', body.sem_year_taken)
        formData.append('approved_status', body.approved_status)
        formData.append('notes', body.notes)
        formData.append('approver_id', body.approver_id)

        return fetch(`http://127.0.0.1:8000/transfer-evaluation-list/`, {
            crossDomain: true,
            method: 'POST',
            body: formData
        })
            .then(
                resp => {
                    if(resp.ok){
                        return resp.json().then(r =>  {
                            return  { isError: false, resp: r};
                        })
                    } else {
                        return {isError: true};
                    }

                });
    }

    static deleteTransferEvaluation(transfer_eval_id) {

        return fetch(`http://127.0.0.1:8000/transfer-evaluation/${transfer_eval_id}/`, {
            crossDomain: true,
            method: 'DELETE',
        })
    }
}


export class TCAPI {

    static updateTransferCourse(transfer_course_id, body) {

        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('subject_number', body.subject_number);
        formData.append('school_id', body.school);

        return fetch(`http://127.0.0.1:8000/transfer-course/${transfer_course_id}/`, {
            crossDomain: true,
            method: 'PUT',
            body: formData
        }).then(resp => resp.json())
            .then(
                resp => {
                    console.log(resp)
                    return resp;
                },
                err => console.log(err))

    }

    static createTransferCourse(body) {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('subject_number', body.subject_number);
        formData.append('school_id', body.school);

        return fetch(`http://127.0.0.1:8000/transfer-course-list/`, {
            crossDomain: true,
            method: 'POST',
            body: formData
        }).then(resp => resp.json())
        .then(
            resp => {
                console.log(resp)
                return resp;
            },
            err => console.log(err))
    }

    static deleteTransferCourse(transfer_course_id) {

        return fetch(`http://127.0.0.1:8000/transfer-course/${transfer_course_id}/`, {
            crossDomain: true,
            method: 'DELETE',
        })
    }
}


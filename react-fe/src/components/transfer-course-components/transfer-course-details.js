import React from "react";

function TransferCourseDetails(props) {

    return (
        <div>
            {props.course ? (
                <div>
                    <h5><i>Transfer Course details</i></h5><br />
                    <em> &nbsp;Transfer Course ID: {props.course.transfer_course_id}</em><br />
                    <em> &nbsp;Transfer Course title: {props.course.title}</em><br />
                    <em> &nbsp;Institution name: {props.course.school}</em><br />
                    <em> &nbsp;Transfer Course #: {props.course.subject_number}</em><br />
                </div>
            ) : null}
        </div>
    )
}

export default TransferCourseDetails;
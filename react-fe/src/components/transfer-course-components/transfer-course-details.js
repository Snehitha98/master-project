import React from "react";

function TransferCourseDetails(props) {

    return (
        <div>
            {props.course ? (
                <div>
                    <h5><i>Transfer Course details</i></h5><br />
                    {/*<em> &nbsp;Transfer Course ID: {props.course.transfer_course_id}</em><br />*/}
                    <strong> &nbsp;Transfer Course title:</strong> {props.course.title}<br />
                    <strong> &nbsp;Institution name:</strong> {props.course.school}<br />
                    <strong> &nbsp;Transfer Course #:</strong> {props.course.subject_number}<br />
                </div>
            ) : null}
        </div>
    )
}

export default TransferCourseDetails;
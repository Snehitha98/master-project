import React from "react";

function TransferCourseDetails(props) {

    return (
        <div>
            {props.course ? (
                <div>
                    <h5><i> Details of '{props.course.title}' course</i></h5><br />
                    <em> &nbsp;Transfer Course ID: {props.course.transfer_course_id}</em><br />
                    <em> &nbsp;Transfer Course name: {props.course.title}</em><br />
                    <em> &nbsp;School name: {props.course.school}</em><br />
                    <em> &nbsp;Subject number: {props.course.subject_number}</em><br />
                </div>
            ) : null}
        </div>
    )
}

export default TransferCourseDetails;
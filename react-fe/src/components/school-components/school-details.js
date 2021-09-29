import React from "react";

function SchoolDetails(props) {

    return (
        <div>
            {props.school ? (
                <div>
                    <h5><i> Details of '{props.school.school_name}' school</i></h5><br />
                    <em> &nbsp;School ID: {props.school.school_id}</em><br />
                    <em> &nbsp;School name: {props.school.school_name}</em><br />
                    <em> &nbsp;State name: {props.school.state_name}</em><br />
                </div>
            ) : null}
        </div>
    )
}

export default SchoolDetails;
import React from "react";

function SchoolDetails(props) {

    return (
        <div>
            {props.school ? (
                <div>
                    <h5><i> Institution details</i></h5><br />
                    {/*<em> &nbsp;Institution ID: {props.school.school_id}</em><br />*/}
                    <strong> &nbsp;Institution name:</strong> {props.school.school_name}<br />
                    <strong> &nbsp;State name:</strong> {props.school.state_name}<br />
                </div>
            ) : null}
        </div>
    )
}

export default SchoolDetails;
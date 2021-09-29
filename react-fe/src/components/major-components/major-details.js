import React from "react";

function MajorDetails(props) {

    return (
        <div>
            {props.major ? (
                <div className='major-detail'>
                    <h4>Major ID: {props.major.major_id}</h4>
                    <h4>Major name: {props.major.major_name}</h4>
                </div>
            ) : null}
        </div>
    )
}

export default MajorDetails;
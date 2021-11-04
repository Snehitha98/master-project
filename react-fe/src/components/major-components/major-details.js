import React from "react";

function MajorDetails(props) {

    return (
        <div>
            {props.major ? (

                <div>
                    <h5><i>Major details</i></h5><br/>
                    <em>&nbsp;Major ID: {props.major.major_id}</em><br/>
                    <em>&nbsp;Major name: {props.major.major_name}</em>
                </div>
            ) : null}
        </div>
    )
}

export default MajorDetails;
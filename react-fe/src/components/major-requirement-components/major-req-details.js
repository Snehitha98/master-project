import React from "react";

function MajorRequirementDetails(props) {

    return (
        <div>
            {props.majorReq ? (
                <div>
                    <h5><i>UNHM Course details</i></h5><br />
                    <em> &nbsp;UNHM Course ID: {props.majorReq.major_req_id}</em><br />
                    <em> &nbsp;UNHM Course #: {props.majorReq.description}</em><br />
                    <em> &nbsp;Major name: {props.majorReq.major}</em><br />
                </div>
            ) : null}
        </div>
    )
}

export default MajorRequirementDetails;
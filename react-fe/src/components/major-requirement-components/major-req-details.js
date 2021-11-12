import React from "react";

function MajorRequirementDetails(props) {

    return (
        <div>
            {props.majorReq ? (
                <div>
                    <h5><i>UNHM Course details</i></h5><br />
                    {/*<em> &nbsp;UNHM Course ID: {props.majorReq.major_req_id}</em><br />*/}
                    <strong> &nbsp;UNHM Course #:</strong> {props.majorReq.description}<br />
                    <strong> &nbsp;UNHM Course Title:</strong> {props.majorReq.major_req_title}<br />
                    <strong> &nbsp;Major name:</strong> {props.majorReq.major}<br />
                </div>
            ) : null}
        </div>
    )
}

export default MajorRequirementDetails;
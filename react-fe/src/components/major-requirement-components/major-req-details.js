import React from "react";

function MajorRequirementDetails(props) {

    return (
        <div>
            {props.majorReq ? (
                <div>
                    <h5><i> Details of '{props.majorReq.description}'</i></h5><br />
                    <em> &nbsp;Major Requirement ID: {props.majorReq.major_req_id}</em><br />
                    <em> &nbsp;Major Req(UNHM): {props.majorReq.description}</em><br />
                    <em> &nbsp;Major name: {props.majorReq.major}</em><br />
                </div>
            ) : null}
        </div>
    )
}

export default MajorRequirementDetails;
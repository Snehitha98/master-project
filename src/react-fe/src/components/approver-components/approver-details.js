import React from 'react';

function ApproverDetails(props) {

    const approv = props.approver

    return (
        <div>
            {approv ? (
                <div>
                    <h5><i>Approver details</i></h5><br/>
                    {/*<em>&nbsp;Approver ID: {approv.approver_id}</em><br/>*/}
                    <strong>&nbsp;Approver name:</strong> {approv.approver_name}
                </div>
            ) : null}
        </div>
    )
}

export default ApproverDetails;
import React from 'react';

const TripCard =({trip})=> {
    const {source,destination,members} =trip;
    console.log(members);
    return (
        <div>
            <div className="card text-white bg-dark mb-3 ml-5" style={{"maxWidth": "18rem"}}>
            <div className="card-header text-light">{source} - {destination}</div>
            <div className="card-body bg-light">
                <h5 className="card-title text-dark">Members</h5>
                {members.map((member) =>{
                    // const name=member.name;
                   return (
                    <li key={member._id} className="text-dark">{member.firstName}</li>
                //    <p className="">{name}</p> 
                   )
                    // console.log(x);
                })}
                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            </div>
            </div>
           
        </div>
    )
}

export default TripCard;
import React from 'react';
import moment from 'moment';

const TripCard =({trip})=> {
    const {source,destination,members,start,end} =trip;
    console.log(moment(start).format('MMMM Do YYYY, h:mm:ss a').toString());
    return (
        <div>
            <div className="card text-white bg-dark mb-3 ml-5 mx-auto" style={{width:"20em",height:"25em"}}>
            <div className="card-header text-light">
            <p><i className="fa fa-home mt-2" aria-hidden="true"></i>{' '}{source} </p>
            <p><i className="fa fa-map-marker" aria-hidden="true"></i>{' '}{destination}</p>
            <p className="text-info "><i class="fa fa-clock-o" aria-hidden="true"></i>{' '}{moment({start}).startOf('hour').fromNow().toString()}</p></div>
            <div className="card-body bg-light">
                <h6 className="card-title text-dark">Members</h6>
                {members.map((member) =>{
                   return (
                    <p key={member._id} className="text-dark"><i class="fa fa-user" aria-hidden="true"></i> {member.firstName} </p>
                   )
                })}
                 <h6 className="card-title text-dark" >Time</h6>
                 <p className="text-dark">{moment({start}).format('MMMM Do YYYY, h:mm:ss a').toString()}</p>
                 <p className="text-dark" style={{marginBottom:"0px"}}>{moment({end}).format('MMMM Do YYYY, h:mm:ss a').toString()}</p>
             
                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            </div>
            </div>
           
        </div>
    )
}

export default TripCard;
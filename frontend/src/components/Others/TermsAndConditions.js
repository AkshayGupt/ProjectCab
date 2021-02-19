import React,{useState} from 'react'
const TermsAndConditions = ({agreeToTerms,setAgreeToTerms,modalShow,setModalShow}) => {


    const[ check,setCheck] = useState(false);


    const handleCheck =()=>{
        setCheck(!check);
    }

    const handleSubmit = () =>{
        setAgreeToTerms(!agreeToTerms);
        setModalShow(false);
    }


    return (
        <div className="mx-5">
            <h1 className="text-center m-3">Terms & Conditions</h1>
            <ul>
                <li>
                    This application stores your email address, name and other info only to improve user experience.We do not have
                    any intention of misusing your data.
                </li>
                <li>
                    We do not have direct control over grouping users.Grouping is solely based on algorithms written.
                </li>
                <li>
                    We do not guarantee the authenticity of any person or information.We recommend you to contact the person 
                    before travelling with him/her.
                </li>
                <li>
                    If a person cancels the trip at any moment, we are not bound to group with any user at that moment.However,
                    the algorithm will add member if possible.
                </li>
                <li>
                    We expect you to enter your correct details to ensure smooth service.
                </li>
                <li>
                    We use cookies for smooth running of the application.
                </li>

                <div></div>
                
                <form>
                    <input type="checkbox" onClick={()=>handleCheck()} />
                </form>
                <p className="my-2">I have read and I agree for the above terms and conditions.</p>
                <br/>
                <div className="">
                    
                <p className={check?"btn btn-info":"d-none"} onClick={()=> handleSubmit()}> Proceed</p>
                </div>
                
             
                
            
            </ul>
        </div>
    )
}

export default TermsAndConditions

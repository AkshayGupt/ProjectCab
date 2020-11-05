import React,{useState} from 'react'
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import{Form} from 'react-bootstrap';    
const TimeSlot =({text,handleEvent,timeSlotValidator,time =0}) => {

    return (
        <div>
                <h2 className="text-center">{text}</h2>
                <Form.Text className="text-center">Please Confirm after choosing time Slot</Form.Text>
                <DayTimePicker 
                    timeSlotSizeMinutes={60}
                    onConfirm={handleEvent}
                    confirmText ={time == 0?"Confirm":"Edit"}
                 />
              
        </div>
    )
};

export default TimeSlot;

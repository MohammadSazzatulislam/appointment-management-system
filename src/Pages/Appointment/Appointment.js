import React, { useContext } from "react";
import { UserAuthContext } from "../../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  const { newEvent, setNewEvent, handleAddEvent } = useContext(UserAuthContext);
  return (
    <div className="h-screen px-5 py-5 ">
      <h1> Calendar</h1>
      <h2> Add New Event </h2>
      <div>
        <input
          onChange={(e) => setNewEvent({...newEvent, title: e.target.value })}
          type="text"
          placeholder="Add Title"
        //   value={newEvent.title}
        />
        <DatePicker
          placeholderText="Start Date"
          selected={newEvent.start}
          onChange={(start) =>
            setNewEvent({...newEvent, start })
          }
        ></DatePicker>
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) =>
            setNewEvent({...newEvent, end})
          }
        ></DatePicker>
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default Appointment;

import React, { useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { UserAuthContext } from "../../Context/AuthContext";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const Home = () => {
  const { newEvent, loading, allEvent,  } =
    useContext(UserAuthContext);

 

  return (
    <div className="px-5 my-5">
      <Calendar
        events={allEvent}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
      ></Calendar>
    </div>
  );
};

export default Home;

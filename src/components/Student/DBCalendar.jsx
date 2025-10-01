import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Calendar } from "antd";
import moment from "moment";
import { Button, Drawer } from "antd";
import { useSelector } from "react-redux";

const DBCalendar = () => {
  let studepartment = localStorage.getItem("userDepartment");

  // const student = useSelector((state) => state?.student?.student);
  // console.log("studenttttttttttttt", student);
  //calendar drower
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //calendar data
  const [allCalendar, setAllCalendar] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8000/api/createtable")
        .then((Response) => {
          setAllCalendar(Response.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //display module in drawer
  useEffect(() => {
    if (selectedDate) {
      const dateString = moment(selectedDate).format("YYYY-MM-DD");
      const events = allCalendar.filter(
        (single) =>
          single.lecture_date === dateString &&
          single.department === studepartment
      );
      setEventsForSelectedDate(events);
    }
  }, [selectedDate, allCalendar]);

  const modifyDateDisplayObject = (value) => {
    let listData = [];
    const dateString = value.format("YYYY-MM-DD");

    allCalendar.map((single) => {
      // console.log("___single data :", single);
      if (
        single.lecture_date === dateString &&
        single.department === studepartment
      ) {
        listData.push({
          type: "success",
          content: `${single.modulename}`,
        });
      }
    });
    // console.log("___list data :", listData);

    return listData || [];
  };

  const handleCellData = (current, info) => {
    if (info.type === "date") {
      const listData = modifyDateDisplayObject(current);

      return (
        <ul>
          {listData.map((singelCalendarDay, index) => (
            <li key={index}>
              <Badge
                status={singelCalendarDay.type}
                text={singelCalendarDay.content}
                onClick={() => {
                  setSelectedDate(current.format("YYYY-MM-DD"));
                  showDrawer();
                }}
              />
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="w-auto h-auto">
      {/* {
        allCalendar.map((singleCalenderData, index) => {
          console.log(singleCalenderData);
          return (
            <h1 key={index}>
              {singleCalenderData.faculty_name }
            </h1>
          )
        })
      } */}
      <Calendar cellRender={handleCellData} />

      <Drawer title="More details" onClose={onClose} open={open}>
        {selectedDate && (
          <div>
            <h3 className="font-bold text-center mb-4 text-lg ">
              Selected Date: {moment(selectedDate).format("YYYY-MM-DD")}
            </h3>
            <ul>
              {eventsForSelectedDate.map((event, index) => (
                <li key={index} className="mb-10">
                  <div>
                    <strong>{index + 1}. </strong>
                    <strong>Module Name:</strong> {event.modulename}
                    <br />
                    <p className="bg-orange-300">
                      Lecture Start Time: {event.start_time}
                    </p>
                    <p className="bg-green-400">
                      Lecture End Time: {event.end_time}
                    </p>
                    <p className="bg-blue-400">Lecture Hall: {event.halls}</p>
                    <p className="bg-red-500">Lecturer: {event.lecturername}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default DBCalendar;

// TODO: Create Timeline View for calendar
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import moment from "moment";
import "react-vertical-timeline-component/style.min.css";
import "./Timeline.css";

const Timeline = ({ trips }) => {
  const timelineElements =
    trips.length > 0 &&
    trips.map((trip) => {
      let { source, destination, members, startTime, endTime } = trip;
      const startDate = moment(startTime).format("MMMM Do YYYY").toString();
      const endDate = moment(endTime).format("MMMM Do YYYY").toString();
      const timeline =
        startDate === endDate ? startDate : startDate + " - " + endDate;
      startTime = moment(startTime).format("h:mm a").toString();
      endTime = moment(endTime).format("h:mm a").toString();

      return (
        <VerticalTimelineElement
          className="vertical-timeline-element"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{
            borderRight: "7px solid  rgb(33, 150, 243)",
          }}
          date={timeline}
          dateClassName="dateStyle"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        >
          <h3>
            {source} to {destination}
          </h3>
          <h6>
            <i class="fa fa-clock-o" aria-hidden="true"></i> {startTime} -{" "}
            {endTime}
          </h6>
          {members.length === 1 ? (
            <p>Traveling alone!</p>
          ) : (
            <p>Traveling with {members.length} people.</p>
          )}
        </VerticalTimelineElement>
      );
    });
  return (
    <VerticalTimeline className="vertical-timeline-custom-line">
      {timelineElements}
    </VerticalTimeline>
  );
};

export default Timeline;

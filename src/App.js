import React from "react";
import EventForm from "./components/event-form";
import { Route, Routes } from "react-router";
import DetailEvent from "./components/events";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EventForm />}></Route>
        <Route path="/events" element={<DetailEvent />}></Route>
      </Routes>
    </div>
  );
};

export default App;

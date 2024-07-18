import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteEvent, updateEvent } from "../../redux/eventSlice";
import { CommonModal } from "../molecules/modal";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";

const Events = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    id: null,
    name: "",
    startDate: "",
    endDate: "",
    eventType: "",
    organisation: "",
    subEventsCount: 0,
    handledBy: "",
    description: "",
  });
  const eventData = useSelector((state) => state.events.events) || [];
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  const handleEdit = (event) => {
    setEventDetails(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEventDetails({
      id: null,
      name: "",
      startDate: "",
      endDate: "",
      eventType: "",
      organisation: "",
      subEventsCount: 0,
      handledBy: "",
      description: "",
    });
  };
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchKey, setSearch] = useState("");
  const handleChange = (e) => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEvent({ id: eventDetails.id, updatedEvent: eventDetails }));
    navigate(0);
    closeModal();
  };
  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: field, direction: direction });
  };

  const sortedData = [...eventData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter(
    (item) =>
      item?.name.toLowerCase()?.includes(searchKey.toLowerCase()) ||
      item?.handledBy?.toLowerCase()?.includes(searchKey.toLowerCase()) ||
      item?.eventType?.toLowerCase()?.includes(searchKey.toLowerCase())
  );

  return (
    <section className="py-8">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between py-4">
          <h3
            className="text-xl font-bold flex gap-1 items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
            Back
          </h3>
          <div className="border border-gray-500 rounded">
            <input
              className="p-1 outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={searchKey}
            />
            <button className="p-1" onClick={() => setSearch("")}>
              Reset
            </button>
          </div>
        </div>
        <div className="shadow rounded">
          <div className="flex px-6 py-4 border-b bg-gray-500 text-white">
            <h3 className="text-xl font-bold">Event List</h3>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="text-xs text-gray-500 text-left">
                  <th className="pb-3 font-medium">Sr.No.</th>
                  <th className="pb-3 font-medium">
                    <div className="flex gap-1 items-center">
                      Event Name{" "}
                      {sortConfig.key === "name" &&
                      sortConfig.direction === "asc" ? (
                        <HiOutlineArrowNarrowUp
                          className="cursor-pointer"
                          onClick={() => handleSort("name")}
                        />
                      ) : (
                        <HiOutlineArrowNarrowDown
                          className="cursor-pointer"
                          onClick={() => handleSort("name")}
                        />
                      )}
                    </div>
                  </th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Start-Date</th>
                  <th className="pb-3 font-medium">End-Date</th>
                  <th className="pb-3 font-medium">Event Type</th>
                  <th className="pb-3 font-medium">Organisation</th>
                  <th className="pb-3 font-medium">Sub Events Count</th>
                  <th className="pb-3 font-medium">
                    <div className="flex gap-1 items-center">
                      Handled By
                      {sortConfig.key === "handledBy" &&
                      sortConfig.direction === "asc" ? (
                        <HiOutlineArrowNarrowUp
                          className="cursor-pointer"
                          onClick={() => handleSort("handledBy")}
                        />
                      ) : (
                        <HiOutlineArrowNarrowDown
                          className="cursor-pointer"
                          onClick={() => handleSort("handledBy")}
                        />
                      )}
                    </div>
                  </th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, id) => (
                  <tr className="text-xs bg-gray-50" key={id}>
                    <td className="py-5 px-6 font-medium">{id + 1}</td>
                    <td className="py-5 px-6 font-medium">{item.name}</td>
                    <td className="py-5 px-6 font-medium">
                      {item.description}
                    </td>
                    <td className="font-medium">{item.startDate}</td>
                    <td className="font-medium">{item.endDate}</td>
                    <td className="font-medium">{item.eventType}</td>
                    <td className="font-medium">{item.organisation}</td>
                    <td className="font-medium">{item.subEventsCount}</td>
                    <td className="font-medium">{item.handledBy}</td>
                    <td className="flex gap-3 items-center mt-4">
                      <span
                        onClick={() => handleEdit(item)}
                        className="inline-block py-1 px-2 hover:text-black text-slate-500 cursor-pointer"
                      >
                        <FiEdit size={18} />
                      </span>
                      <span
                        onClick={() => handleDelete(item.id)}
                        className="inline-block py-1 px-2 hover:text-black text-slate-500 cursor-pointer"
                      >
                        <RiDeleteBinLine size={18} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CommonModal isOpen={showModal} onClose={closeModal}>
            {eventDetails.id ? (
              <>
                <h2 className="text-xl font-bold mb-4 pl-4">Edit Event</h2>
                <form className="space-y-4 p-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                      <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                        Event Name
                      </span>
                      <input
                        className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                        type="text"
                        name="name"
                        value={eventDetails.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                      <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                        Start Date
                      </span>
                      <input
                        className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                        type="date"
                        name="startDate"
                        value={eventDetails.startDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                      <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                        End Date
                      </span>
                      <input
                        className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                        type="date"
                        name="endDate"
                        value={eventDetails.endDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                      <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                        Organisation
                      </span>
                      <input
                        className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                        type="text"
                        name="organisation"
                        value={eventDetails.organisation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                      <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                        Sub Events Count
                      </span>
                      <input
                        className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                        type="number"
                        name="subEventsCount"
                        value={eventDetails.subEventsCount}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                      <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                        Handled By
                      </span>
                      <input
                        className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                        type="text"
                        name="handledBy"
                        value={eventDetails.handledBy}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <div className="relative block px-3 w-full font-medium border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                          Event Type
                        </span>
                        <span className="absolute top-1/2 right-0 mr-5 transform -translate-y-1/2">
                          <IoIosArrowDown />
                        </span>
                        <select
                          className="w-full py-4 text-gray-50 font-semibold appearance-none bg-transparent outline-none"
                          name="eventType"
                          value={eventDetails.eventType}
                          onChange={handleChange}
                        >
                          <option className="bg-gray-500" hidden></option>
                          <option className="bg-gray-500" value="sports">
                            Sports
                          </option>
                          <option className="bg-gray-500" value="music">
                            Music
                          </option>
                          <option className="bg-gray-500" value="general">
                            General
                          </option>
                          <option className="bg-gray-500" value="school">
                            School
                          </option>
                          <option className="bg-gray-500" value="children">
                            Children
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                      <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                        Description
                      </span>
                      <input
                        className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                        type="text"
                        name="description"
                        value={eventDetails.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-block py-2 mt-5 px-4 text-xs text-center font-semibold leading-normal text-white bg-black hover:bg-slate-300 hover:text-black rounded-lg transition duration-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            ) : (
              "Loading..."
            )}
          </CommonModal>
        </div>
      </div>
    </section>
  );
};

export default Events;

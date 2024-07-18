import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../redux/eventSlice/index";
import { useForm, FormProvider } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { eventSchema } from "../../utils/validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const methods = useForm({ resolver: yupResolver(eventSchema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  console.log("errors34343", errors);
  const dispatch = useDispatch();
  const select = useSelector((state) => state);
  console.log("Redux State:", select);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(addEvent(data));
    methods.reset();
  };
  return (
    <>
      <section className="py-3 ">
        <div className="container px-4 mx-auto">
          <div className="p-8 bg-zinc-800 rounded-xl">
            <div className="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
              <h4 className="text-2xl font-bold tracking-wide text-white mb-1">
                Event Form
              </h4>
              <button
                onClick={() => navigate("/events")}
                className="inline-block py-2 px-4 text-md text-center font-semibold leading-normal hover:text-white hover:bg-black bg-slate-300  text-black rounded-lg transition duration-500 "
              >
                View Event
              </button>
            </div>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap items-start -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
                  <div className="w-full sm:w-1/3 px-4 mb-8 sm:mb-0">
                    <span className="block mt-5 text-sm font-medium text-gray-100">
                      Event Details
                    </span>
                  </div>
                  <div className="w-full sm:w-2/3 px-4">
                    <div className="max-w-xl">
                      <div className="flex flex-wrap -mx-4 -mb-10">
                        <div className="w-full md:w-1/3 px-4 mb-10">
                          <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-zinc-800">
                              Event Name
                            </span>

                            <input
                              className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                              type="text"
                              {...register("name", { required: true })}
                            />
                          </div>
                          {errors.name && (
                            <small className="text-red-500">
                            {errors.name.message}
                            </small>
                          )}
                        </div>
                        <div className="w-full md:w-1/3 px-4 mb-10">
                          <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-zinc-800">
                              Organisation
                            </span>

                            <input
                              className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                              type="text"
                              {...register("organisation", { required: true })}
                            />
                          </div>
                          {errors.organisation && (
                            <small className="text-red-500">
                            {errors.organisation.message}
                            </small>
                          )}
                        </div>
                        <div className="w-full md:w-1/3 px-4 mb-10">
                          <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-zinc-800">
                              Sub-Events
                            </span>

                            <input
                              className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                              type="number"
                              {...register("subEventsCount", {
                                required: true,
                              })}
                            />
                          </div>
                          {errors.subEventsCount && (
                            <small className="text-red-500">
                            {errors.subEventsCount.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-start -mx-4">
                  <div className="w-full sm:w-1/3 px-4 mb-8 sm:mb-0">
                    <span className="block mt-5 text-sm font-medium text-gray-100">
                      Other Info
                    </span>
                  </div>
                  <div className="w-full sm:w-2/3 px-4">
                    <div className="max-w-xl">
                      <div className="flex flex-wrap -mx-4 -mb-10">
                        <div className="w-full md:w-1/2 px-4 mb-10">
                          <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-zinc-800">
                              Start Date
                            </span>

                            <input
                              className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                              type="date"
                              {...register("startDate", { required: true })}
                            />
                          </div>
                          {errors.startDate && (
                            <small className="text-red-500">
                            {errors.startDate.message}
                            </small>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-10">
                          <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-zinc-800">
                              End Date
                            </span>

                            <input
                              className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                              type="date"
                              {...register("endDate", { required: true })}
                            />
                          </div>
                          {errors.endDate && (
                            <small className="text-red-500">
                            {errors.endDate.message}
                            </small>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-10">
                          <div className="relative block px-3 w-full font-medium border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-zinc-800">
                              Event Type
                            </span>
                            <span className="absolute top-1/2 right-0 mr-5 transform -translate-y-1/2">
                              <IoIosArrowDown />
                            </span>

                            <select
                              className="w-full py-4 text-gray-50 font-semibold appearance-none bg-transparent outline-none"
                              {...register("eventType", { required: true })}
                            >
                              <option className="bg-zinc-800" hidden></option>
                              <option className="bg-zinc-800" value="sports">
                                Sports
                              </option>
                              <option className="bg-zinc-800" value="music">
                                Music
                              </option>
                              <option className="bg-zinc-800" value="general">
                                General
                              </option>
                              <option className="bg-zinc-800" value="school">
                                School
                              </option>
                              <option className="bg-zinc-800" value="children">
                                Children
                              </option>
                            </select>
                          </div>
                          {errors.eventType && (
                            <small className="text-red-500">
                            {errors.eventType.message}
                            </small>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-10">
                          <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-zinc-800">
                              Handled By
                            </span>

                            <input
                              className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                              type="text"
                              {...register("handledBy", { required: true })}
                            />
                          </div>
                          {errors.handledBy && (
                            <small className="text-red-500">
                            {errors.handledBy.message}
                            </small>
                          )}
                        </div>
                        <div className="w-full px-4 mb-10">
                          <div className="relative w-full h-14 py-4 px-3 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-zinc-800">
                              Description
                            </span>

                            <input
                              className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
                              type="text"
                              {...register("description", { required: true })}
                            />
                          </div>
                          {errors.description && (
                            <small className="text-red-500">
                            {errors.description.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-end mt-20">
                  <button className="inline-block py-2 px-4 text-lg text-center font-bold leading-normal bg-white text-black hover:text-slate-300  hover:bg-black rounded-lg transition duration-500">
                    Reset
                  </button>
                  <button
                    className="inline-block py-2 px-4 text-lg text-center font-bold leading-normal text-white bg-black hover:bg-slate-300  hover:text-black rounded-lg transition duration-500"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventForm;

import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  startDate: Yup.string().required().label("Start Date"),
  eventType: Yup.string().required().label("Event Type"),
  endDate: Yup.string().required().label("End Date"),
  description: Yup.string()
    .required()
    .label("Description"),
  organisation: Yup.string()
    .required()
    .label("Organisation"),
  subEventsCount: Yup.string()
    .required()
    .label("Sub-Events"),
  handledBy: Yup.string()
    .required()
    .label("Handled By"),
});

import { EventStatus } from 'src/@types/enum'
import {
  Event,
  EventList,
  EventListOperator,
  EventListPendingAdmin,
  ListQuestion,
  FormEventRegister
} from 'src/@types/event.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

const eventApi = {
  getListEvent: () =>
    http.get<SuccessResponse<{ events: EventList[] }>>('/events'),
  getEventById: (id: string) =>
    http.get<SuccessResponse<{ event: Event }>>(`/events/${id}`),
  getPendingEventListAdmin: () =>
    http.get<SuccessResponse<{ events: EventListPendingAdmin[] }>>(
      '/admins/get-all/pending-list'
    ),
  getAllEventListAdmin: () =>
    http.get<SuccessResponse<{ events: EventList[] }>>(
      '/admins/get-all/event-list'
    ),
  handleStatusEventAdmin: (id: string, status: EventStatus) =>
    http.patch(`/admins/confirm-event/${id}`, { status }),
  getEventListOperator: () =>
    http.get<SuccessResponse<{ events: EventListOperator[] }>>(
      '/events/list-event/event-operator'
    ),
  registerEvent: (id: string, body: FormEventRegister) =>
    http.post(`/events/register-event/${id}`, body),
  getListQuestion: (id: string) =>
    http.get<SuccessResponse<{ formRegister: ListQuestion[] }>>(
      `/forms/question-register/${id}`
    )
}

export default eventApi

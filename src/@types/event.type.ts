import { User } from './users.type'

export interface Event {
  _id: string
  name: string
  capacity: number
  ticket_price: string
  description: string
  type_event: string
  date_event: string
  time_start: string
  time_end: string
  address: string
  image: string
  event_operator: Pick<User, '_id' | 'user_name' | 'phone_number' | 'email'>
  status: string
  calendarId: string
  location: string
  speaker_name: string
  sponsor_name: string
}
export type ListQuestion = {
  _id: string
  description: string
}
export type FormEventRegister = {
  answers: Array<{
    _id: string
    question: string
    description: string
  }>
}
export type EventList = Pick<
  Event,
  | '_id'
  | 'event_operator'
  | 'capacity'
  | 'name'
  | 'image'
  | 'date_event'
  | 'ticket_price'
  | 'time_end'
  | 'time_start'
  | 'address'
  | 'location'
>

export type EventListPendingAdmin = Pick<
  Event,
  '_id' | 'capacity' | 'name' | 'ticket_price' | 'event_operator' | 'location'
>

export type EventListOperator = Pick<
  Event,
  '_id' | 'capacity' | 'name' | 'ticket_price' | 'location' | 'status'
>

export type EventListUser = {
  events: Array<{
    _id: string
    status_check_in: boolean
    qr_code: string
    event: Array<Event>
    event_operator: Array<User>
  }>
}

export type CreateEvent = Pick<
  Event,
  | 'capacity'
  | 'date_event'
  | 'image'
  | 'name'
  | 'ticket_price'
  | 'time_end'
  | 'time_start'
  | 'location'
  | 'description'
  | 'speaker_name'
  | 'sponsor_name'
  | 'type_event'
>

export enum EventTypeEnum {
  PRIVATE = 'Private',
  PUBLIC = 'Public'
}

export enum LocationType {
  HALL_A = 'Hall A',
  HALL_B = 'Hall B',
  HALL_C = 'Hall C',
  HALL_D = 'Hall D',
  HALL_E = 'Hall E'
}

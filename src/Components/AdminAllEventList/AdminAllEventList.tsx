import { keepPreviousData, useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { Skeleton } from 'antd'
import TableListAllEvent from '../TableListAllEvent/TableListAllEvent'
import useQueryParams from 'src/hooks/useQueryParams'
import { Event } from 'src/@types/event.type'
import { useEffect, useState } from 'react'
import socket from 'src/socket/socket'
import { EventStatus } from 'src/@types/enum'
import http from 'src/utils/http'
import { SuccessResponse } from 'src/@types/utils.type'

const AdminTableEventList = () => {
  const [events, setEvents] = useState<Event[]>([])
  const { status = '' } = useQueryParams()
  const { data, isFetching } = useQuery({
    queryKey: ['event-list-all', status],
    queryFn: () => eventApi.getAllEventListAdmin(status),
    placeholderData: keepPreviousData
  })
  useEffect(() => {
    socket.on('new_event', (data) => {
      console.log(data)
      setEvents((pre) => [...pre, data.event])
    })
  }, [socket])
  useEffect(() => {
    try {
      const fetchData = async (status: EventStatus) => {
        const result = await http.get<SuccessResponse<{ events: Event[] }>>(`/admins/get-all/event-list?status=${status}`)
        setEvents(result.data.data.events)
      }

      fetchData(status as EventStatus)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event operator name</th>
            <th>Capacity</th>
            <th>Ticket price</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!isFetching && events.length != 0 && events.map((event) => <TableListAllEvent key={event._id} event={event} status={status} />)}
          {isFetching && (
            <tr>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isFetching && data?.data.data.events.length == 0 && (
        <div className='flex justify-center items-center mt-2'>
          <h1>There are not have event {status.toLowerCase()} </h1>
        </div>
      )}
    </div>
  )
}

export default AdminTableEventList

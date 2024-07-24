import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import EventDetail from 'src/Components/EventDetail/EventDetail'
import HandleRegisterEvent from 'src/Components/HandleRegisterEvent/HandleRegisterEvent'
import { isValidToRegister } from 'src/utils/checkEventDate'
import { Button, Heading } from 'src/Components'

export default function EventDetailPage() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventApi.getEventById(id as string)
  })
  console.log(
    data &&
      isValidToRegister(
        data?.data.data.event.date_event as string,
        data?.data.data.event.time_start as string
      )
  )
  return (
    <div className='flex w-full flex-col items-center '>
      <Header className='' />
      {data && (
        <EventDetail
          event={data.data.data.event}
          renderProps={<HandleRegisterEvent event={data.data.data.event} />}
        />
      )}
      <Footer className='' />
    </div>
  )
}

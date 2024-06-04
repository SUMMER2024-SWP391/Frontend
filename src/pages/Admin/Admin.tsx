import { Route, Routes } from 'react-router-dom'
import Chart from 'src/Components/Chart/Chart'
import HeaderAdmin from 'src/Components/HeaderAdmin/HeaderAdmin'
import SideBarAdmin from 'src/Components/SideBarAdmin/SideBarAdmin'
import TableEventList from 'src/Components/TableEventList/TableEventList'
import TableUser from 'src/Components/TableUser/TableUser'

const Admin = () => {
  return (
    <div className='container'>
      <HeaderAdmin />
      <div className='grid grid-cols-10'>
        <div className='col-span-2'>
          <SideBarAdmin />
        </div>
        <div className='col-span-8'>
          <Routes>
            <Route index element={<Chart />} />
            <Route path='list-all-user' element={<TableUser />} />
            <Route path='list-event-operator' element={<TableUser />} />
            <Route path='list-visitor' element={<TableUser />} />
            <Route path='list-event-pending' element={<TableEventList />} />
            <Route path='list-all-event' element={<TableEventList />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin
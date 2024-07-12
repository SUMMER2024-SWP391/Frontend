import { Link, NavLink, useNavigate } from 'react-router-dom'

import { Heading } from '../Heading/Heading'
import { BellOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { AppContext } from 'src/context/app.context'
import { useContext, useState } from 'react'
import path from 'src/constants/path'
import { getRefreshTokenFromLS } from 'src/utils/auth'
import { UserRole } from 'src/@types/enum'
import AvatarProfile from '../AvatarProfile/AvatarProfile'
import HeaderEO from '../HeaderEventOperator'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import HeaderVistor from '../HeaderVistor'
import Modal from '../Modal/Modal'

interface Props {
  className?: string
  name?: string
  _id?: string
}
export default function Header({ ...props }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } =
    useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: (refresh_token: string) => authAPI.logout({ refresh_token }),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleLogout = () => {
    const refresh_token = getRefreshTokenFromLS()
    logoutMutation.mutate(refresh_token)
    navigate('/')
  }

  return (
    <div className='w-full'>
      <header
        {...props}
        className={`${props.className} w-full h-[100px] flex flex-row justify-around items-center md:w-full `}
      >
        <Heading as='h1' size='2xl' className=''>
          eventbok.
        </Heading>

        <div className='w-[500px] flex justify-center'>
          <ul className='w-full flex justify-around'>
            {isAuthenticated && profile?.role == UserRole.Admin ? (
              <HeaderAdmin />
            ) : isAuthenticated && profile?.role == UserRole.EventOperator ? (
              <HeaderEO />
            ) : (
              <HeaderVistor />
            )}
          </ul>
        </div>
        <div className='flex justify-around items-center'>
          <button onClick={() => setOpen(true)}>
            <SearchOutlined className='!text-pink-light h-[30px] w-[30px]' />
          </button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            children={
              <form className='flex'>
                <input
                  type='text'
                  className='mr-2 bg-white-A700 text-black-900 h-[30px] w-[200px]'
                />
                <SearchOutlined className='!text-pink-light h-[30px] w-[30px]' />
              </form>
            }
          ></Modal>
          {!isAuthenticated ? (
            <Link
              to={path.login}
              className='w-20 h-8 rounded-[10px] font-bold bg-pink-normail text 
             text-pink-light flex justify-center items-center hover:text-white-A700_bf
             hover:border-[#e5e7eb]'
            >
              Log In
            </Link>
          ) : (
            <AvatarProfile onClick={handleLogout} />
          )}
        </div>
      </header>
    </div>
  )
}

import { User } from 'src/@types/users.type'
import InputVerTwo from '../InputVerTwo/InputVerTwo'

export type UserProfile = {
  user: Pick<
    User,
    '_id' | 'email' | 'user_name' | 'phone_number' | 'date_of_birth' | 'point'
  >
}

export type ProfileUpdate = {
  user: Pick<User, 'user_name' | 'email' | 'date_of_birth' | 'phone_number'>
}

const ProfileComponent = ({ user }: UserProfile) => {
  const birthdate = user.date_of_birth?.split('T')[0]
  console.log(birthdate)
  return (
    <div className='grid grid-cols-2 gap-8'>
      <InputVerTwo
        disabled={true}
        defaultValue={user.user_name}
        classNameInput='text-black-900 bg-white-A700 h-[45px] pl-2 rounded-lg w-[270px]'
        renderProps={<div className='mb-2 text-white-A700'>Name</div>}
      />
      <InputVerTwo
        disabled={true}
        defaultValue={user.email}
        classNameInput='text-black-900 bg-white-A700 h-[45px] pl-2 rounded-lg w-[270px]'
        renderProps={<div className='mb-2 text-white-A700'>Email</div>}
      />
      <InputVerTwo
        disabled={true}
        defaultValue={birthdate as string}
        classNameInput='text-black-900 bg-white-A700 h-[45px] pl-2 rounded-lg w-[270px]'
        renderProps={<div className='mb-2 text-white-A700'>Birthdate</div>}
      />
    </div>
  )
}

export default ProfileComponent

import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useAuth from '../../../../hooks/useAuth'
import toast from 'react-hot-toast'
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure =useAxiosSecure()
  const {user}=useAuth()
  const closeModal = () => {
    setIsOpen(false)
  }
const requiesthandler =async()=>{
  try{

 const {data}=await axiosSecure.patch(`/user/${user?.email}`)
 console.log(data)
toast.success('SucessFully Applied  Request')
  }
  catch(err){
// 
toast.error(err.response.data)
  }
  finally{
//
closeModal()
  }
}
  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />

      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Seller</span>
      </div>

      <BecomeSellerModal 
      requiesthandler ={requiesthandler } 
      closeModal={closeModal}
       isOpen={isOpen} />
    </>
  )
}

export default CustomerMenu

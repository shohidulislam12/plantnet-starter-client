import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure, { axiosSecure } from '../../../hooks/useAxiosSecure'
const SellerOrderDataRow = ({order,refetch}) => {
  const axiosSecure=useAxiosSecure()
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
const {customer,_id,totalquantity,status,Address,plantId}=order

const handleDelete=async()=>{
  try{
  
   const {data}=await axiosSecure.delete(`/order/${_id}`)
   //increase quantity 
   await axiosSecure.patch(`/plants/quantity/${plantId}`, {
    quantityUpdate: totalquantity,
    status:'increase'
  });
   console.log(data)

  refetch()
  }
  catch(err){
    console.log(err)
  }
finally{
  closeModal()
}
  }
  // handle stustus change 
  const handleStatus=async(newStatus)=>{
    if(newStatus===status)return
    try{
  
      const {data}=await axiosSecure.patch(`/order/status/${_id}`,{
        status:newStatus,
      })
 

   
     refetch()
     }
     catch(err){
       console.log(err)
     }
  }



  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{customer.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>$120</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{totalquantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{Address}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <select
            required 
            onChange={(e)=>handleStatus(e.target.value)}
            disabled={status==='Delivered'}
            defaultValue={"status"}
            className='p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white'
            name='category'
          >
            <option value='Pending'>Pending</option>
            <option value='In Progress'>Start Processing</option>
            <option value='Delivered'>Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Cancel</span>
          </button>
        </div>
        <DeleteModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

SellerOrderDataRow.propTypes = {
  order: PropTypes.object,
  refetch: PropTypes.func,
}

export default SellerOrderDataRow

import Container from '../../components/Shared/Container'
import { Helmet } from 'react-helmet-async'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import axios from 'axios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'


const PlantDetails = () => {
  const axiosSecure=useAxiosSecure()
  const  {id}=useParams()
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }
   
  console.log(id)
  const {data:plant={},isLoading,refetch}=useQuery({
    queryKey:['plan',id],
    queryFn:async ()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/plants/${id}`)
      return data
    }

  })
console.log(plant)
if(isLoading)return <LoadingSpinner></LoadingSpinner>
const {sellerInf,quantity,price,plantphoto,name,description,category}=plant

  return (
    <Container>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={plantphoto}
                alt={name}
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={name}
            center={true}
            subtitle={`Category: ${category}` }
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
           {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller:{sellerInf.displayName}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={sellerInf.photoURL}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
                font-light
                text-neutral-500
              '
            >
              Quantity: {quantity} Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
            <div >
              <Button onClick={()=>setIsOpen(true)} label={quantity>0?"purchase":"Out Of Stock"}/>
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal refetch={refetch}  plant={plant} closeModal={closeModal} isOpen={isOpen} />

   
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails

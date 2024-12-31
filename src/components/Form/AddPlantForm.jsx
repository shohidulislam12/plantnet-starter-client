import { useState } from "react";
import useAuth from "../../hooks/useAuth";

import { imageUpload } from "../api/utils";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPlantForm = () => {
  const axiosSecure=useAxiosSecure()
  const [upload,seatUploadimg]=useState(null)
  const [loading ,setLoading]=useState(false)
  const {user}=useAuth()
  const handleSubmit=async (e)=>{
    setLoading(true)
    e.preventDefault();
    const form = e.target;
 const name=form.name.value
 const category=form.category.value
 const description=form.description.value
 const price=parseFloat(form.price.value)
 const quantity=parseInt(form.quantity.value)

const plantphoto=await imageUpload(upload)
const sellerInf={ displayName:user?.displayName,
  photoURL:user?.photoURL,
  email:user?.email
}
 const plants={name,category,description,price,quantity,plantphoto,sellerInf}
 console.log(plants)
 try {
  const { data } = await axiosSecure.post('/plants', plants);
  toast.success('Plant added successfully!');
  form.reset(); // Resets the form fields
 seatUploadimg(null); // Resets the upload state if needed
}
catch(err){
console.log(err)
}
finally{
  setLoading(false)
}

  }
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
                Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='name'
                id='name'
                type='text'
                placeholder='Plant Name'
                required
              />
            </div>
            {/* Category */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600 '>
                Category
              </label>
              <select
                required
                className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='category'
              >
                <option value='Indoor'>Indoor</option>
                <option value='Outdoor'>Outdoor</option>
                <option value='Succulent'>Succulent</option>
                <option value='Flowering'>Flowering</option>
              </select>
            </div>
            {/* Description */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>

              <textarea
                id='description'
                placeholder='Write plant description here...'
                className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
                name='description'
              ></textarea>
            </div>
          </div>
          <div className='space-y-6 flex flex-col'>
            {/* Price & Quantity */}
            <div className='flex justify-between gap-2'>
              {/* Price */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600 '>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price per unit'
                  required
                />
              </div>

              {/* Quantity */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Quantity
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  required
                />
              </div>
            </div>
            {/* Image */}
            <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                    onChange={(e) => seatUploadimg(e.target.files[0])}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
                    {upload?.name.slice(0, 20) || "Upload Image"}
                    
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {upload && (
  <div className="mt-4">
    <img
      src={URL.createObjectURL(upload)}
      alt="Preview"
      className="w-20 h-20 object-cover rounded-lg"
    />
    <p className="mt-2 text-sm text-gray-500">
      Image Size: {(upload.size / 1024).toFixed(2)} KB
    </p>
  </div>
)}

            {/* Submit Button */}
    
            <button
              type='submit'
              className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
            >
             {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPlantForm

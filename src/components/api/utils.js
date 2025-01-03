import axios from "axios"

//upload image and return image url
export const imageUpload=async imageData=>{

    const formData= new FormData()
    formData.append('image',imageData)
// return console.log(formData)
// sent imagedata to imgBB
const {data}=await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,formData)
console.log(data.data.display_url)
const imageUrl=data.data.display_url
return imageUrl

}
 export const saveUser=async user=>{
    await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`,{
        name:user.displayName,
    photo:user?.photoURL,
    email:user?.email,
    
           
       }) 
}
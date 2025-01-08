export const shortImagename=(image,length=10)=>{
   
    if(!image||typeof image?.name==='string')return"chose image"
    if(image?.name?.length<=15)return image?.name
    return image?.name.substring(0,length).concat(`...${image?.type.split('/')[1]}`)
}
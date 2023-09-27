
import menu from "../../assets/images/menu.png"
import { sidebarMenu } from './data'

const Sidebar = () => {
  return (
    <>
    <div className="w-[7%] flex flex-col gap-2 h-[220px] justify-between items-center p-5 fixed">
     <img src={menu} alt="menu icon" className='w-7 h-5'/>

     <div className='flex flex-col justify-between h-[80px]'>
     {sidebarMenu.map((item)=>(
        <img src={item.icon} alt={item.alt} className='w-7 h-6 cursor-pointer' key={item.alt}/> 
      ))}
     </div>
     
    </div>
    </>
  )
}

export default Sidebar
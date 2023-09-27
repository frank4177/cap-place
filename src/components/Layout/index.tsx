import { ReactNode } from 'react'
import Sidebar from '../Sidebar'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <>
    <div className='flex flex-row min-h-[100vh]'>
        <div className='w-[7%]  shadow-bs'>
        <Sidebar/>
        </div>
        
        <div className='w-[93%]'>
            {children}
        </div>
    </div>
    </>
  )
}

export default Layout
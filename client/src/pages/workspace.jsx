import React from 'react'
import SideMenu from '@/components/layout/side-menu'
import TopNavigation from '@/components/layout/top-nav'

function Workspace() {
  return (
    <div className='flex h-screen bg-gray-300'>
        <SideMenu/>
        <div className="flex flex-col flex-1 ">
            <TopNavigation/>
            <div className="flex flex-col flex-1 p-4 overflow-y-auto items-center justify-center">
                {/* Main Content */}
                <h1>Workspace component/content here</h1>
            </div>
        </div>
    </div>
  )
}

export default Workspace
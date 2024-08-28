import React from 'react'

const Project = () => {
  return (
    <div className='border-[rgba(114,112,112,0.5)] bg-[rgba(114,112,112,0.3)] border-[1px] p-2 rounded-lg'>
      <div className="border-[rgba(114,112,112,0.5)] relative overflow-hidden border-[1px] h-[600px] rounded">
        <img src="https://images.unsplash.com/photo-1723754165998-305df32c501e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        <div className=" absolute bottom-0 w-full h-24 bg-slate-600">
          <h1>project name</h1>
          <p>project description</p>
          
        </div>
      </div>
    </div>
  )
}

export default Project
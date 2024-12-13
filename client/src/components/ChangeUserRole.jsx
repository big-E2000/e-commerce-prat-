import React from 'react'
import ROLE from '../common/role'

const changeUserRole = () => {
  return (
    <div className="fixed w-full h-full z-10 flex justify-between items-center top-0 bottom-0 left-0">
        <div className='mx-auto bg-white'>
            <h1 className='pb-4 text-lg font-medium'>
              change User Role
            </h1>
            <p>Name:  </p>
            <p>Email: </p>

            <select>
                {
                   Object.values(ROLE).map((el) => {
                    return(
                    <option>
                        {el}
                   </option>
                    )
                   }) 
                }
            </select>
        </div>
    </div>
  )
}

export default changeUserRole

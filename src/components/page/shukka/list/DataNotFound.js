import React from 'react'
import { useSelector } from 'react-redux';
import { messageSelector } from '../../../../redux/selector';

export default function DataNotFound() {

     const message = useSelector(messageSelector)

     return (
          <>
               <div>
                    <h1 className='text-red-500 text-2xl font-bold flex item-center justify-center my-24'>{message}</h1>
               </div>
          </>
     )
}

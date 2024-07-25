import React from 'react'
import ReactLoading from 'react-loading'

export default function Loading() {
     return (
          <div>
               <ReactLoading type={`balls`} color={`black`} height={667} width={375} />
          </div>
     )
}

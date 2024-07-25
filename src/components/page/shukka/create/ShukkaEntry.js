import React from 'react'
import TableCreate from './TableCreate'
import HeaderCreate from './HeaderCreate'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../navbar/Sidebar'
import { showErrMessage } from '../../../../redux/selector'
import { useSelector } from 'react-redux'

export default function ShukkaEntry() {

    const errMessage = useSelector(showErrMessage)

    const toggleButton = (event) => {
        const toggleButton = document.getElementById('toggle-button');
        const labels = toggleButton.querySelectorAll('label');

        labels.forEach(label => {
            label.classList.remove('bg-cyan-600', 'text-white');
            label.classList.add('text-gray-500');
        });

        event.target.classList.add('bg-cyan-600', 'text-white');
        event.target.classList.remove('text-gray-500');
    }

    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />
                <div className=" w-[80rem] flex-1 p-6 bg-zinc-100">
                    <div className="flex pb-5">
                        <h1 className="text-3xl font-black"><span className='text-red-500 text-5xl mr-2'>●</span>出荷登録</h1>
                        <div id="toggle-button" className="flex items-center border border-cyan-600 rounded-full p-0.5 mx-6 my-3">
                            <input
                                type="radio"
                                id="planned"
                                name="toggle"
                                className="hidden"
                                defaultChecked=""
                            />
                            <label
                                htmlFor="planned"
                                className="cursor-pointer bg-cyan-600 text-white rounded-full font-semibold px-4 py-2"
                                onClick={(event) => { toggleButton(event) }}
                            >
                                予定
                            </label>
                            <input type="radio" id="actual" name="toggle" className="hidden" />
                            <label
                                htmlFor="actual"
                                className="cursor-pointer text-gray-500 rounded-full font-semibold px-4 py-2 "
                                onClick={(event) => { toggleButton(event) }}
                            >
                                実績
                            </label>
                        </div>
                    </div>
                    {/* header param create */}
                    <HeaderCreate />
                    {/* Table List */}
                    <div className="mx-10 my-8">

                        {/* Table Create */}
                        <TableCreate />

                    </div>
                </div>
            </div>
        </>

    )
}

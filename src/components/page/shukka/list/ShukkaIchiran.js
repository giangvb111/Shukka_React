import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../navbar/Sidebar'
import Header from './Header'
import TableDataList from './TableDataList'
import { useDispatch, useSelector } from 'react-redux'
import { shukkaListSelector } from '../../../../redux/selector'
import DataNotFound from './DataNotFound'
import { clearShukkaList, searchShukka } from '../../../../redux/actions'

export default function ShukkaIchiran() {

    const shukkaList = useSelector(shukkaListSelector)
    const dispatch = useDispatch()
    const [subHeaderParams, setSubHeaderParams] = useState(false)

    useEffect(() => {
        dispatch(searchShukka(''))
    }, [])

    const handleButtonOption = () => {
        setSubHeaderParams(!subHeaderParams)
    }

    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />
                <div className="flex-1 p-6 bg-zinc-100 w-[calc(100%-320px)]">
                    <h1 className="text-3xl font-black"><span className='text-red-500 text-5xl mr-2'>●</span>出荷一覧</h1>
                    <div className="flex justify-between my-5 ml-10">
                        <div>
                            <span className="text-xl font-semibold">状況 : </span>
                            <span>
                                <button className="text-xl h-8 px-5 bg-cyan-600 transition-colors duration-150 rounded-[5rem]">
                                    予定
                                </button>
                            </span>
                            <span>
                                <button className="text-xl h-8 px-5 mx-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    出荷済
                                </button>
                            </span>
                            <span>
                                <button className="text-xl h-8 px-5 mx-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    出荷済以外
                                </button>
                            </span>
                            <span>
                                <button className="text-xl h-8 px-5 mx-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    下書き
                                </button>
                            </span>
                            <span>
                                <button className="text-xl h-8 px-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    すべて
                                </button>
                            </span>
                        </div>
                        <div>
                            <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 hover:bg-cyan-600/75 rounded focus:shadow-outline m-[auto] mr-4 ml-4"
                                onClick={handleButtonOption}
                            >
                                検索オプション
                            </button>
                        </div>
                    </div>
                    {/* Header */}
                    <Header subHeaderParams={subHeaderParams} />
                    <div className="mx-auto">

                        {/* Table List */}
                        {shukkaList.length > 0 ? <TableDataList /> : <DataNotFound />}

                    </div>
                </div>
            </div>
        </>
    )
}



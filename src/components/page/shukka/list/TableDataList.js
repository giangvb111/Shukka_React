import React from 'react'
import { columnSelector, shukkaListSelector } from '../../../../redux/selector';
import { useSelector } from 'react-redux';

export default function TableDataList() {
    const shukkaList = useSelector(shukkaListSelector);
    const columns = useSelector(columnSelector);

    const formatDateString = (dateString) => {
        if (dateString.length !== 8) {
            return dateString;
        }

        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);

        return `${year}/${month}/${day}`;
    };

    return (
        <>
            <div className="flex justify-between pb-3">
                <div>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                        請求書
                    </button>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] mr-4 ml-4 hover:bg-cyan-600/75">
                        納品書
                    </button>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                        出荷指示書
                    </button>
                </div>
                <div className='flex text-center'>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded-[5rem] focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                        一括で編集
                    </button>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded-[5rem] focus:shadow-outline m-[auto] mr-4 ml-4 hover:bg-cyan-600/75">
                        表示設定
                    </button>
                    <button className="text-center items-center bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded-full focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" /></svg>
                    </button>
                </div>
            </div>
            <div className='overflow-scroll max-h-96 m-w-full'>
                <table className="w-full bg-white border-collapse border border-gray-300 rounded-md shadow-md">
                    <thead className="bg-cyan-600 text-white sticky top-[-2px] z-10 py-8">
                        <tr>
                            <th className="py-4 px-4 border border-gray-300 w-3"></th>
                            {columns.map((column) => (
                                <th key={column.settingDataId} className="py-4 px-4 border border-gray-300"
                                    style={{
                                        minWidth: column.columnWidth,
                                        display: column.columnWidth === 0 ? 'none' : 'table-cell'
                                    }}>
                                    {column.columnDisplayName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className=''>
                        {shukkaList.map((result, rowIndex) => (
                            <tr key={rowIndex} className="bg-gray-50 py-2">
                                <td className="text-center align-middle border border-gray-300">
                                    <input id={`checkbox-data-${rowIndex}`} type="checkbox" className="form-checkbox" />
                                </td>
                                {columns.map((column, columnIndex) => {
                                    const isKanriBango = column.columnDisplayName === '管理番号';
                                    const value = column.columnDisplayName === '出荷予定日'
                                        ? formatDateString(result[column.columnDisplayName])
                                        : result[column.columnDisplayName];
                                    return (
                                        <td
                                            className={`py-2 px-4 border border-gray-300 text-center align-middle ${isKanriBango ? 'text-cyan-600 underline decoration-1' : ''}`}
                                            key={`${rowIndex}-${columnIndex}`}
                                            style={{
                                                display: column.columnWidth === 0 ? 'none' : 'table-cell',
                                                minWidth: column.columnWidth
                                            }}
                                        >
                                            {value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

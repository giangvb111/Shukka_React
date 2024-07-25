import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { API_BASE_URL } from '../../../../constants';
import axios from 'axios';
import { shukkaHeaderEntry } from '../../../../redux/selector';
import { getShukkaSuccess, showMessageToats, updateShukkaHeaderEntry } from '../../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../navbar/Loading';

export default function TableCreate() {

    const [seihinList, setSeihinList] = useState([]);
    const [soukoList, setSoukoList] = useState([]);
    const [juchuKingaku, setJuchuKingaku] = useState('');
    const [shohizeiGaku, setShohizeiGaku] = useState();
    const [gokeiKingaku, setGokeiKingaku] = useState('');
    const [highlightBtn, setHighlightBtn] = useState(true);
    const shukkaHeader = useSelector(shukkaHeaderEntry);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [shukkaMesaiList, setShukkaMesaiList] = useState([
        {
            seihinId: '',
            seihinName: '',
            shukkaYoteiSuryo: '',
            shukkaJisseikiSuryo: '',
            soukoId: '',
            tanabanId: '',
            tanabanName: [],
            lotNo: '',
            tanka: '',
            kingaku: '',
            tekiyoMesai: ''
        }
    ]);

    // 製品リストを取得
    const fetchSeihin = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/seihin/get-list`);
            setSeihinList(response.data);
        } catch (error) {
            console.log('Error fetching seihin:', error);
        }
    };

    // 倉庫リストを取得
    const fetchSouko = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/souko/get-list`);
            setSoukoList(response.data);
        } catch (error) {
            console.log('Error fetching souko:', error);
        }
    };
    useEffect(() => {
        fetchSeihin();
        fetchSouko();
    }, [])

    useEffect(() => {
        const hasNonEmptySeihinId = shukkaMesaiList.some((item) => item.seihinId !== '');
        setHighlightBtn(!hasNonEmptySeihinId);
    }, [shukkaMesaiList])

    // get seihin name autofill when change seihincode
    const handleChangeSeihin = (index, event) => {
        const selectedSeihinId = event.target.value;
        const selectedSeihin = seihinList.find(item => item.seihinId == selectedSeihinId);
        handleShukkaMesaiChange(index, 'seihinName', selectedSeihin ? selectedSeihin.seihinName : '');
    };

    // get list tanaban when change souko
    const handleChangeSouko = async (index, event) => {
        const selectedSoukoId = event.target.value;
        if (selectedSoukoId === '') {
            handleShukkaMesaiChange(index, 'tanabanName', []);
            handleShukkaMesaiChange(index, 'tanabanId', '');
        } else {
            try {
                const response = await axios.get(`${API_BASE_URL}/tanaban/get-tanaban-by-souko-id?soukoId=${selectedSoukoId}`);
                handleShukkaMesaiChange(index, 'tanabanName', response.data);
            } catch (error) {
                console.log('Error fetching tanaban:', error);
            }
        }
    };

    const handleChangeSuryo = (index, event) => {
        const newSuryo = event.target.value;
        if (isNaN(newSuryo)) {
            handleShukkaMesaiChange(index, event.target.name, '')
        } else {
            if (shukkaMesaiList[index].tanka === '') {
                handleShukkaMesaiChange(index, 'kingaku', newSuryo * 1)
            } else {
                handleShukkaMesaiChange(index, 'kingaku', newSuryo * shukkaMesaiList[index].tanka)
            }
        }

    }

    const handleChangeTanka = (index, event) => {
        const tanka = event.target.value;
        if (isNaN(tanka)) {
            handleShukkaMesaiChange(index, event.target.name, '')
        } else {
            handleShukkaMesaiChange(index, 'kingaku', shukkaMesaiList[index].shukkaYoteiSuryo * (tanka === '' ? 1 : tanka))
        }
    }

    const handleShukkaMesaiChange = (index, name, value) => {
        const updatedList = [...shukkaMesaiList];
        updatedList[index][name] = value;

        setShukkaMesaiList(updatedList);
    };

    const handleChangeComment = (event) => {
        dispatch(updateShukkaHeaderEntry(event.target.value))
    }

    useEffect(() => {
        const newTotalKingaku = shukkaMesaiList.reduce((acc, item) => {
            const kingakuNumber = parseFloat(item.kingaku) || 0;
            return acc + kingakuNumber;
        }, 0);
        setJuchuKingaku(newTotalKingaku);
    }, [shukkaMesaiList]);

    useEffect(() => {
        setShohizeiGaku((isNaN(juchuKingaku) ? 0 : parseFloat(juchuKingaku * 0.1).toFixed(3)));
    }, [juchuKingaku])

    useEffect(() => {
        setGokeiKingaku((isNaN(juchuKingaku) ? 0 : juchuKingaku + parseFloat(shohizeiGaku)))
    }, [shohizeiGaku])

    const handleCheckboxChange = (index) => {
        const newShukkaMesaiList = [...shukkaMesaiList];
        newShukkaMesaiList[index].isChecked = !newShukkaMesaiList[index].isChecked;
        setShukkaMesaiList(newShukkaMesaiList);
    };

    const handleOnClickButtonCopy = () => {
        // Lấy các phần tử đã được check từ danh sách
        const checkedItems = shukkaMesaiList.filter((item) => item.isChecked);

        // Sao chép các phần tử đã được check vào danh sách
        const updatedList = [...shukkaMesaiList, ...checkedItems.map((item) => ({ ...item, isChecked: false }))];
        setShukkaMesaiList(updatedList);
    };

    const handleOnClickButtonDelete = () => {
        // Lọc ra các phần tử không được check từ danh sách
        const updatedList = shukkaMesaiList.filter((item) => !item.isChecked);

        setShukkaMesaiList(updatedList);
    }

    const shukkaDto = {
        shukkaHeader,
        shukkaMesaiList
    }

    const attributeToats = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }

    const handleButtonEntry = async () => {
        const errors = [];

        if (!shukkaHeader.jyuchubi) {
            errors.push("受注日は必須入力項目です。");
        }

        if (!shukkaHeader.shukkaYoteibi) {
            errors.push("出荷予定日は必須入力項目です。");
        }

        if (!shukkaHeader.nouhinsakiId) {
            errors.push("納品先は必須入力項目です。");
        }

        if (errors.length > 0) {
            errors.forEach(error => {
                toast.error(error, attributeToats);
            });
            return;
        }

        shukkaMesaiList.forEach((item, index) => {
            if (!item.seihinId) {
                errors.push(`出荷明細[${index + 1}]製品コードは必須入力項目です。`);
            }

            if (!item.shukkaYoteiSuryo) {
                errors.push(`出荷明細[${index + 1}]数量は必須入力項目です。`);
            }

            if (!item.soukoId) {
                errors.push(`出荷明細[${index + 1}]倉庫は必須入力項目です。`);
            }

            if (!item.tanabanId) {
                errors.push(`出荷明細[${index + 1}]棚番は必須入力項目です。`);
            }
        })

        if (errors.length > 0) {
            errors.forEach(error => {
                toast.error(error, attributeToats);
            });
            return;
        }

        setLoading(true);

        try {

            const res = await axios.post(`${API_BASE_URL}/shukka/create`, shukkaDto)
            if (res.data.status === 1) {
                setLoading(false)
                dispatch(getShukkaSuccess(res.data.data.shukkaHeader))
                navigate("/shukka-success")
            } else {
                console.log("error", res.message);
            }
        } catch (error) {
            console.log("error catch =>>", error)
        }
    }

    return (
        <>
            {loading && <Loading />}

            <div className="flex justify-between pb-3">
                <div>
                    <button className={`border border-sky-500 text-sky h-8 px-5 text-lg 
                        transition-colors duration-150 rounded focus:shadow-outline m-[auto] hover:bg-cyan-600/75 bg-rose-500/50
                        ${highlightBtn ? 'bg-rose-500/50' : 'bg-white'}
                        `}>
                        製品を選ぶ
                    </button>
                    <button className={`border border-sky-500 text-sky h-8 px-5 text-lg transition-colors 
                    duration-150 rounded m-[auto] mr-4 ml-4 ${highlightBtn ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-white focus:shadow-outline hover:bg-cyan-600/75'}`}
                        disabled={highlightBtn}
                        // disabled={true}
                        onClick={handleOnClickButtonCopy}
                    >
                        行複写
                    </button>
                    <button className={`border border-sky-500 text-sky h-8 px-5 text-lg 
                    transition-colors duration-150 rounded m-[auto] ${highlightBtn ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-white focus:shadow-outline hover:bg-cyan-600/75'}`}
                        onClick={handleOnClickButtonDelete}
                        disabled={highlightBtn}
                    >
                        行削除
                    </button>
                </div>
            </div>
            <div className="overflow-x-scroll overflow-y-scroll max-h-56 max-w-max">
                <table className="bg-white border-collapse border border-gray-300 rounded-md shadow-md overflow-scroll">
                    <thead className="bg-cyan-600 text-white sticky top-[-2px] z-10 py-8">
                        <tr>
                            <th className="py-2 border border-gray-300 w-10"> </th>
                            <th className="py-2 border border-gray-300 w-36">製品コード</th>
                            <th className="py-2 border border-gray-300 w-48">製品名</th>
                            <th className="py-2 border border-gray-300 w-40">出荷倉庫</th>
                            <th className="py-2 border border-gray-300 w-32">棚番</th>
                            <th className="py-2 border border-gray-300 w-28">数量</th>
                            <th className="py-2 border border-gray-300 w-36">ロットNo</th>
                            <th className="py-2 border border-gray-300 w-28">単価</th>
                            <th className="py-2 border border-gray-300 w-28">金額</th>
                            <th className="py-2 border border-gray-300 w-60">メモ欄</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-auto">
                        {shukkaMesaiList.map((item, index) => (
                            <tr className="bg-gray-50" key={index} data-row-id={index} >
                                <td className="text-center align-middle border border-gray-300 w-10">
                                    <input type="checkbox" className="my-3"
                                        checked={item.isChecked}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <select
                                        className="w-36 border border-slate-500 rounded "
                                        id=""
                                        name="seihinId"
                                        value={item.seihinId}
                                        onChange={(event) => {
                                            handleChangeSeihin(index, event);
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    >
                                        <option value="" />
                                        {seihinList.map(item => (
                                            <option key={item.seihinId} value={item.seihinId}>{item.seihinCode}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2 border border-gray-300 w-48">
                                    <input
                                        type="text"
                                        disabled
                                        className="border-transparent text-center"
                                        name='seihinName'
                                        value={item.seihinName}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <select
                                        className="w-40 border border-slate-500 rounded"
                                        id=""
                                        name='soukoId'
                                        value={item.soukoId}
                                        onChange={(event) => {
                                            handleChangeSouko(index, event);
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    >

                                        <option value="" />
                                        {soukoList.map(item => (
                                            <option key={item.soukoId} value={item.soukoId}>
                                                {item.soukoName}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <select
                                        className="w-32 border border-slate-500 rounded"
                                        id=""
                                        name="tanabanId"
                                        value={item.tanabanId}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    >
                                        <option value="" />
                                        {item.tanabanName.map(tana => (
                                            <option key={tana.tanabanId} value={tana.tanabanId}>{tana.tanabanName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        className="w-28 border border-slate-500 rounded text-center"
                                        name='shukkaYoteiSuryo'
                                        value={item.shukkaYoteiSuryo}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value);
                                            handleChangeSuryo(index, event);
                                        }}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        className="w-36 border border-slate-500 rounded text-center "
                                        name='lotNo'
                                        value={item.lotNo}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}

                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        className="w-28 border border-slate-500 rounded text-center"
                                        name='tanka'
                                        value={item.tanka}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                            handleChangeTanka(index, event)
                                        }}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        disabled
                                        className="border-transparent text-center w-28"
                                        name='kingaku'
                                        value={item.kingaku}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        className="w-60 border border-slate-500 rounded"
                                        name='tekiyoMesai'
                                        value={item.tekiyoMesai}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-full'>
                <div className="flex my-5">
                    <div>
                        <label htmlFor="" className="font-bold text-lg">
                            受注金額
                        </label>
                        <input
                            type="text"
                            className="w-36 border border-slate-500 rounded ml-3 text-center"
                            disabled
                            value={juchuKingaku}
                        />
                    </div>
                    <div className="mx-10">
                        <label htmlFor="" className="font-bold text-lg">
                            消費税額
                        </label>
                        <input
                            type="text"
                            className="w-36 border border-slate-500 rounded ml-3 text-center"
                            disabled
                            value={shohizeiGaku}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="text-red-500 font-bold text-lg">
                            合計金額
                        </label>
                        <input
                            type="text"
                            className="w-36 border border-slate-500 rounded ml-3 text-center"
                            disabled
                            value={gokeiKingaku}
                        />
                    </div>
                </div>

                <div className='w-full'>
                    <div className="flex justify-end w-10/12">
                        <div>
                            <button className="bg-cyan-600 text-white font-semibold h-8 px-8 text-lg transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-cyan-700"
                                onClick={() => { handleButtonEntry() }}
                            >
                                登　録
                            </button>
                        </div>
                        <div>
                            <button className="ml-6 bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                                下書きで登録
                            </button>
                        </div>
                    </div>
                    <div className='w-10/12'>
                        <div>
                            <label htmlFor="" className="font-bold text-lg">
                                コメントを残す
                            </label>
                        </div>
                        <textarea defaultValue={""} className='bg-white border border-slate-500 w-full rounded'
                            value={shukkaHeader.comment}
                            onChange={(event) => handleChangeComment(event)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

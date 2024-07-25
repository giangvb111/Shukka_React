import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getColumns, searchShukka } from '../../../../redux/actions';
import axios from 'axios';
import { API_BASE_URL } from '../../../../constants'

export default function Header({ subHeaderParams }) {

    const [nouhinsakiList, setNouhinsakiList] = useState([])
    const [tantoshaList, setTantoshaList] = useState([])
    const [soukoList, setSoukoList] = useState([])
    const [tanabanList, setTanabanList] = useState([])
    const [column, setColumn] = useState([])
    const dispatch = useDispatch();

    const [shukkaSearchParams, setShukkaSearchParams] = useState(
        {
            shukkaYoteiBiFrom: '',
            shukkaYoteiBiTo: '',
            shukkaJisseikiBiFrom: '',
            shukkaJisseikiBiTo: '',
            jyuchuBiFrom: '',
            jyuchuBiTo: '',
            nouhinsakiList: '',
            seikyuusaki: '',
            tantoshaList: '',
            shukkaSoukoList: '',
            shukkaTanabanList: '',
            seihinCodeList: '',
            seihinMeiList: '',
            keywordList: ''
        }
    );

    // 納品先リスト取得
    const fetchNouhinsakiList = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/nouhinsaki/get-list`);
            setNouhinsakiList(res.data.data);
        } catch (error) {
            console.log('Error fetching nouhinsaki:', error);

        }
    };

    // 担当者リスト取得
    const fetchTantoshaList = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tantosha/get-tantosha-by-taishoku-flg?taishokuFlg=0`);
            setTantoshaList(response.data.data);
        } catch (error) {
            console.log('Error fetching tantosha:', error);
        }
    };

    //倉庫リスト取得
    const fetchSoukoList = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/souko/get-list`);
            setSoukoList(response.data);
        } catch (error) {
            console.log('Error fetching souko:', error);
        }
    };

    //棚番リスト取得
    const fetchTanabanList = async (soukoId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tanaban/get-tanaban-by-souko-id?soukoId=${soukoId}`);
            setTanabanList(response.data);
        } catch (error) {
            console.log('Error fetching tanaban:', error);
        }
    };

    const fetchColumns = async (screenId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/setting-data/get-list-by-screen-id?screenId=${screenId}`)
            dispatch(getColumns(response.data.data))
            setColumn(response.data.data)
        } catch (error) {
            console.log('Error fetching setting column:', error)
        }
    }

    // render when refresh page 
    useEffect(() => {
        fetchSoukoList();
        fetchNouhinsakiList();
        fetchTantoshaList();
        fetchColumns(1);
        handleButtonSearch();
    }, [])

    //Hamdle Change State Shukka Params
    const handleShukkaParamsChange = (event) => {
        const { name, value } = event.target
        setShukkaSearchParams(previous => ({
            ...previous,
            [name]: value
        }))
    };

    const handleOnchangeSouko = (event) => {
        const selectedSoukoId = event.target.value;
        if (selectedSoukoId == '') {
            setTanabanList([])
        } else {
            fetchTanabanList(selectedSoukoId);
        }
    }

    const handleButtonSearch = async () => {
        await axios
            .post(`${API_BASE_URL}/shukka/get-list`, shukkaSearchParams)
            .then(res => {
                if (res.data.data.length > 0) {
                    dispatch(searchShukka(res.data.data))

                } else {
                    dispatch(searchShukka(res.data.message))
                }

            })
    }


    return (
        <>
            <div id="search-param" className="space-y-2 mx-10">
                <div className=" flex justify-between border-b-2 border-white pb-2">
                    <div className="flex-1 flex items-center">
                        <label className="text-base font-normal w-60">出荷予定日</label>
                        <input
                            type="date"
                            className="mx-2 border border-slate-500/50 rounded"
                            name="shukkaYoteiBiFrom"
                            id=""
                            value={shukkaSearchParams.shukkaYoteiBiFrom}
                            onChange={(event) => { handleShukkaParamsChange(event) }}
                        />
                        <span>~</span>
                        <input
                            type="date"
                            className="mx-2 border border-slate-500/50 rounded"
                            name="shukkaYoteiBiTo"
                            id=""
                            value={shukkaSearchParams.shukkaYoteiBiTo}
                            onChange={(event) => { handleShukkaParamsChange(event) }}
                        />
                    </div>
                    <div className="flex-1 flex items-center">
                        <label className="text-base font-normal w-60">受注日</label>
                        <input
                            type="date"
                            className="mx-2 border border-slate-500/50 rounded"
                            name="jyuchuBiFrom"
                            id=""
                            value={shukkaSearchParams.jyuchuBiFrom}
                            onChange={(event) => { handleShukkaParamsChange(event) }}
                        />
                        <span>~</span>
                        <input
                            type="date"
                            className="mx-2 border border-slate-500/50 rounded"
                            name="jyuchuBiTo"
                            id=""
                            value={shukkaSearchParams.jyuchuBiTo}
                            onChange={(event) => { handleShukkaParamsChange(event) }}
                        />
                    </div>
                </div>
                {subHeaderParams &&
                    <>
                        <div className="flex justify-between border-b-2 border-white pb-2">
                            <div className="flex-1 flex items-center">
                                <label className="text-base font-normal w-60">出荷実績日</label>
                                <input
                                    type="date"
                                    className="mx-2 border border-slate-500/50 rounded"
                                    name="shukkaJisseikiBiFrom"
                                    id=""
                                    value={shukkaSearchParams.shukkaJisseikiBiFrom}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                />
                                <span>~</span>
                                <input
                                    type="date"
                                    className="mx-2 border border-slate-500/50 rounded"
                                    name="shukkaJisseikiBiTo"
                                    id=""
                                    value={shukkaSearchParams.shukkaJisseikiBiTo}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                />
                            </div>
                            <div className="flex-1 flex items-center">
                                <label className="text-base font-normal w-60">出荷倉庫・棚番</label>
                                <select
                                    className="mx-2 border border-slate-500/50 rounded w-32"
                                    name="shukkaSoukoList"
                                    id=""
                                    value={shukkaSearchParams.shukkaSoukoList}
                                    onChange={(event) => {
                                        handleShukkaParamsChange(event)
                                        handleOnchangeSouko(event)
                                    }}
                                >
                                    <option value="" />
                                    {soukoList.map(item => {
                                        return (
                                            <option key={item.soukoId} value={item.soukoId}>
                                                {item.soukoName}
                                            </option>
                                        )
                                    })}
                                </select>

                                <select
                                    className="mx-2 border border-slate-500/50 rounded w-28"
                                    name="shukkaTanabanList"
                                    id=""
                                    value={shukkaSearchParams.shukkaTanabanList}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                >
                                    <option value="" />
                                    {tanabanList.length > 0 && tanabanList.map(item => (
                                        <option key={item.tanabanId} value={item.tanabanId}>{item.tanabanName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-between border-b-2 border-white pb-2">
                            <div className="flex-1 flex items-center">
                                <label className="text-base font-normal w-60">納品先</label>
                                <select
                                    className="mx-2 border border-slate-500/50 rounded w-32"
                                    name="nouhinsakiList"
                                    id=""
                                    value={shukkaSearchParams.nouhinsakiList}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                >
                                    <option value="" />
                                    {nouhinsakiList.map(item => (
                                        <option key={item.nouhinsakiId} value={item.nouhinsakiId}>{item.nouhinsakiName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 flex items-center">
                                <label className="text-base font-normal w-60">製品コード</label>
                                <input
                                    className="mx-2 border border-slate-500/50 rounded w-72"
                                    name="seihinCodeList"
                                    id=""
                                    value={shukkaSearchParams.seihinCodeList}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between border-b-2 border-white pb-2">
                            <div className="flex-1 flex items-center">
                                <label className="text-base font-normal w-60">請求先</label>
                                <select
                                    className="mx-2 border border-slate-500/50 rounded w-32"
                                    name="seikyuusaki"
                                    id=""
                                    value={shukkaSearchParams.seikyuusaki}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                >
                                    <option value="" />
                                </select>
                            </div>
                            <div className="flex-1 flex items-center">
                                <label className="text-base font-normal w-60">製品名</label>
                                <input
                                    type="text"
                                    className="mx-2 border border-slate-500/50 rounded w-72"
                                    name="seihinMeiList"
                                    id=""
                                    value={shukkaSearchParams.seihinMeiList}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between border-b-2 border-white pb-2">
                            <div className="flex-1 flex items-center">
                                <label className="text-base font-normal w-60">担当者</label>
                                <select
                                    className="mx-2 border border-slate-500/50 rounded w-32"
                                    name="tantoshaList"
                                    id=""
                                    value={shukkaSearchParams.tantoshaList}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                >
                                    <option value="" />
                                    {tantoshaList.map(item => (
                                        <option key={item.tantoshaId} value={item.tantoshaId}>{item.tantoshaName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 flex items-center">
                                <label className="text-base font-normal w-60">キーワード</label>
                                <input
                                    type="text"
                                    className="mx-2 border border-slate-500/50 rounded w-72"
                                    name="keywordList"
                                    id=""
                                    value={shukkaSearchParams.keywordList}
                                    onChange={(event) => { handleShukkaParamsChange(event) }}
                                />
                            </div>
                        </div>
                    </>
                }
                <div className="flex justify-center py-4">
                    <button className="bg-cyan-600 text-white font-semibold h-8 px-5 text-base transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-cyan-700"
                        onClick={handleButtonSearch}
                    >
                        この条件で検索
                    </button>
                </div>
            </div>

        </>
    )
}


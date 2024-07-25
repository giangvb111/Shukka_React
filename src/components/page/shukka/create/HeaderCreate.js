import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../../constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getSoukoList, shukkaHeaderEntry } from '../../../../redux/actions'
import { shukkaComment } from '../../../../redux/selector'

export default function HeaderCreate() {

    const [nouhinsakiList, setNouhinsakiList] = useState([])
    const [tantoshaList, setTantoshaList] = useState([])
    const dispatch = useDispatch();
    const comment = useSelector(shukkaComment);
    const [subHeader, setSubHeader] = useState(false)
    const [jyuchubiBgColor, setJyuchubiBgColor] = useState('bg-rose-300/75');
    const [shukkaYoteibiBgColor, setShukkaYoteibiBgColor] = useState('bg-rose-300/75');
    const [nouhinsakiIdBgColor, setNouhinsakiIdBgColor] = useState('bg-rose-300/75');
    const [shukkaHeader, setShukkaHeader] = useState(
        {
            jyuchubi: '',
            shukkaYoteibi: '',
            shukkaJisseikiBi: '',
            nouhinsakiId: '',
            tekiyoHeader: '',
            tantoshaId: '',
            kenmei: '',
            zeitansu: '',
            comment: '',
            shukkaKubun: '',
        }
    );

    const handleForcusJyuchubi = () => {
        setJyuchubiBgColor('')
    }
    const handleBlurJyuchubi = (event) => {
        if (event.target.value === '') {
            setJyuchubiBgColor('bg-rose-300/75')
        } else {
            setJyuchubiBgColor('')
        }
    }

    const handleForcusShukkaYoteibi = () => {
        setShukkaYoteibiBgColor('')
    }
    const handleBlurShukkaYoteibi = (event) => {
        if (event.target.value === '') {
            setShukkaYoteibiBgColor('bg-rose-300/75')
        } else {
            setShukkaYoteibiBgColor('')
        }
    }

    const handleForcusNouhinsakiId = () => {
        setNouhinsakiIdBgColor('')
    }
    const handleBlurNouhinsakiId = (event) => {
        if (event.target.value === '') {
            setNouhinsakiIdBgColor('bg-rose-300/75')
        } else {
            setNouhinsakiIdBgColor('')
        }
    }

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

    useEffect(() => {
        fetchNouhinsakiList();
        fetchTantoshaList();
        dispatch(shukkaHeaderEntry(shukkaHeader))
    }, [])

    useEffect(() => {
        setShukkaHeader({ ...shukkaHeader, comment: comment })
    }, [comment])

    const handleClickButton = () => {
        setSubHeader(!subHeader)
    }

    const handleOnchangeShukkaHeader = (event) => {
        const { name, value } = event.target;
        setShukkaHeader((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        dispatch(shukkaHeaderEntry(shukkaHeader))
    }, [shukkaHeader])

    return (
        <>
            <div id="header-param" className="space-y-1 mx-10">
                <div className="flex items-center w-full">
                    <div className="flex w-3/12">
                        <label className="text-base font-normal pr-16">1</label>
                        <label className="text-base font-semibold ">
                            受注日<span className="text-red-500 font-bold">*</span>
                        </label>
                    </div>
                    <div className="w-9/12">
                        <input
                            type="date"
                            onFocus={handleForcusJyuchubi}
                            onBlur={(e) => handleBlurJyuchubi(e)}
                            className={`mx-2 border border-slate-500/50 rounded ${jyuchubiBgColor}`}
                            name="jyuchubi"
                            value={shukkaHeader.jyuchubi}
                            onChange={(event) =>
                                handleOnchangeShukkaHeader(event)
                            }
                        />
                    </div>
                </div>
                <div className="flex items-center border-t-2 border-white pt-1 w-full">
                    <div className="flex w-3/12">
                        <label className="text-base font-normal pr-16">2</label>
                        <label className="text-base font-semibold ">
                            出荷予定日<span className="text-red-500 font-bold">*</span>
                        </label>
                    </div>
                    <div className="w-9/12">
                        <input
                            type="date"
                            onFocus={handleForcusShukkaYoteibi}
                            onBlur={(e) => handleBlurShukkaYoteibi(e)}
                            className={`mx-2 border border-slate-500/50 rounded ${shukkaYoteibiBgColor}`}
                            name="shukkaYoteibi"
                            value={shukkaHeader.shukkaYoteibi}
                            onChange={(event) =>
                                handleOnchangeShukkaHeader(event)
                            }
                        />
                    </div>
                </div>
                <div className="flex items-center border-t-2 border-white pt-1 w-full">
                    <div className="flex w-full items-center">
                        <div className="flex w-6/12">
                            <label className="text-base font-normal pr-16">3</label>
                            <label className="text-base font-semibold">
                                納品先<span className="text-red-500 font-bold">*</span>
                            </label>
                        </div>
                        <div className="w-6/12">
                            <select
                                className={`mx-2 border border-slate-500/50 rounded w-32 ${nouhinsakiIdBgColor}`}
                                name="nouhinsakiId"
                                id=""
                                onFocus={handleForcusNouhinsakiId}
                                onBlur={(e) => handleBlurNouhinsakiId(e)}
                                value={shukkaHeader.nouhinsakiId}
                                onChange={(event) => handleOnchangeShukkaHeader(event)}
                            >
                                <option value="" />
                                {nouhinsakiList.map(item => (
                                    <option key={item.nouhinsakiId} value={item.nouhinsakiId}>{item.nouhinsakiName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <label htmlFor="" className="text-base">
                            (
                        </label>
                        <label className="text-base font-normal mx-4">請求先</label>
                        <input
                            type="text"
                            disabled
                            className="mx-4 border border-slate-500/50 rounded"
                            name=""
                            id=""
                        />
                        <label htmlFor="" className="text-base">
                            )
                        </label>
                    </div>
                </div>
                <div className="flex items-center border-t-2 border-white pt-1 w-full">
                    <div className="flex w-3/12">
                        <label className="text-base font-normal pr-16">4</label>
                        <label className="text-base font-semibold">担当者</label>
                    </div>
                    <div className="w-9/12">
                        <select
                            className="mx-2 border border-slate-500/50 rounded w-32"
                            name="tantoshaId"
                            id=""
                            value={shukkaHeader.tantoshaId}
                            onChange={(event) => handleOnchangeShukkaHeader(event)}
                        >
                            <option value="" />
                            {tantoshaList.map(item => (
                                <option key={item.tantoshaId} value={item.tantoshaId}>{item.tantoshaName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex items-center border-t-2 border-white pt-1 w-full">
                    <div className="flex w-3/12">
                        <label className="text-base font-normal pr-16">5</label>
                        <label className="text-base font-semibold">件名</label>
                    </div>
                    <div className="w-9/12">
                        <input
                            type="text"
                            className="mx-2 border border-slate-500/50 rounded w-full"
                            name='kenmei'
                            value={shukkaHeader.kenmei}
                            onChange={(event) => handleOnchangeShukkaHeader(event)}
                        />
                    </div>
                </div>
                {subHeader &&
                    <>
                        <div className="flex items-center border-t-2 border-white pt-1 w-full">
                            <div className="flex w-3/12">
                                <label className="text-base font-normal pr-16">6</label>
                                <label className="text-base font-semibold">出荷区分</label>
                            </div>
                            <div className="w-9/12">
                                <select
                                    className="mx-2 border border-slate-500/50 rounded w-32"
                                    name='shukkaKubun'
                                    value={shukkaHeader.shukkaKubun}
                                    onChange={(event) => handleOnchangeShukkaHeader(event)}
                                >
                                    <option value="" />
                                    <option value="0">出荷</option>
                                    <option value="1">返品</option>
                                    <option value="2">販促</option>

                                </select>
                            </div>
                        </div>
                        <div className="flex items-center border-t-2 border-white pt-1 w-full">
                            <div className="flex w-3/12">
                                <label className="text-base font-normal pr-16">7</label>
                                <label className="text-base font-semibold">税端数処理</label>
                            </div>
                            <div className="w-9/12">
                                <select
                                    className="mx-2 border border-slate-500/50 rounded w-32"
                                    name='zeitansu'
                                    value={shukkaHeader.zeitansu}
                                    onChange={(event) => handleOnchangeShukkaHeader(event)}
                                >
                                    <option value="" />
                                    <option value="0">切り捨て</option>
                                    <option value="1">切り上げ</option>
                                    <option value="2">四捨五入</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center border-t-2 border-white pt-1 w-full">
                            <div className="flex w-3/12">
                                <label className="text-base font-normal pr-16">8</label>
                                <label className="text-base font-semibold">メモ</label>
                            </div>
                            <div className="w-9/12">
                                <input
                                    type="text"
                                    className="mx-2 border border-slate-500/50 rounded w-full"
                                    name='tekiyoHeader'
                                    value={shukkaHeader.tekiyoHeader}
                                    onChange={(event) => handleOnchangeShukkaHeader(event)}
                                />
                            </div>
                        </div>
                    </>
                }

                <div className="flex justify-end py-4">
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-base transition-colors hover:bg-cyan-600/75 duration-150 rounded focus:shadow-outline m-[auto] mr-4 ml-4"
                        onClick={handleClickButton}
                    >
                        設定オプション
                    </button>
                </div>
            </div>

        </>
    )
}

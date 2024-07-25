import React from 'react'

export default function Navbar() {
    return (
        <>
            <div className="flex justify-between p-2 bg-white sticky top-0 z-10">
                <div className="flex justify-center item-center pl-10">
                    <div className="text-3xl font-extrabold text-cyan-600 mr-4">eeeCLOUD</div>
                    <div>
                        <button className="bg-cyan-600 text-white h-10 px-5 text-lg transition-colors duration-150 rounded-lg focus:shadow-outline">
                            Standard
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="flex flex-col items-center justify-center w-8 h-6 space-y-1 m-[auto]">
                        <span className="block w-6 h-0.5 bg-cyan-600" />
                        <span className="block w-6 h-0.5 bg-cyan-600" />
                        <span className="block w-6 h-0.5 bg-cyan-600" />
                    </button>
                    <button className="bg-slate-300 text-white h-8 px-5 text-lg transition-colors duration-150 rounded-[5rem] focus:shadow-outline m-[auto] mr-4 ml-4">
                        テービーテック
                    </button>
                    <span className="content-center">ログインユーザー：kashiwazaki</span>
                    <a href="#" className="ml-4 text-gray">
                        <button className="bg-inherit border border-black h-9 px-3 text-lg transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-slate-500/25">
                            ログアウト
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}

import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Sidebar() {
     const [activeTitle, setActiveTitle] = useState(false);
     const [activeItem, setActiveItem] = useState(false);
     const location = useLocation();

     useEffect(() => {
          if (location.pathname.startsWith('/')) {
               setActiveTitle(location.pathname)
               setActiveItem(location.pathname);
          } else {
               setActiveTitle('');
               setActiveItem('');
          }
     }, []);
     const handleSidebarItemClick = (item, event) => {
          event.preventDefault()
          setActiveItem(item);
     };

     const handleSidebarTitleClick = (item, event) => {
          event.preventDefault()
          setActiveTitle((prevActiveTitle) => (prevActiveTitle === item ? '' : item));
     };

     return (
          <div className="text-white w-80 h-screen p-6 pt-10 mt0 text-2xl flex flex-col items-center bg-cyan-600 leading-[4rem] font-black">
               <nav className="text-white py-4 relative">
                    <ul className='text-left w-80'>
                         <li className="pl-20 hover:bg-white hover:text-cyan-600">
                              <NavLink >ホーム</NavLink>
                         </li>
                         <li className="pl-20 hover:bg-white hover:text-cyan-600">
                              <NavLink >在庫確認</NavLink>
                         </li>
                         <li className={`relative pl-20 hover:bg-white hover:text-cyan-600 ${activeTitle === '/shukka-entry' ? 'bg-white text-cyan-600' : ''}`}>
                              <button
                                   id="btn-shukka-toroku"
                                   className="w-full text-left"
                                   name='btn-shukka-entry'
                                   onClick={(event) => handleSidebarTitleClick('/shukka-entry', event)}
                              >
                                   データ登録
                              </button>
                              <ul
                                   id="submenu-shukka-toroku"
                                   className={`font-gray text-left -translate-x-1/4 item-center w-80 bg-white text-blue-500 overflow-hidden transition-all duration-300 z-10 ${activeTitle === '/shukka-entry' ? 'max-h-96' : 'max-h-0'}`}
                              >
                                   <li className={`pl-[7rem] bg-white hover:bg-gray-100 ${activeItem === '/shukka-entry' ? 'text-black' : 'text-gray-300'}`} onClick={(event) => handleSidebarItemClick('/shukka-entry', event)}>
                                        <NavLink to="/shukka-entry">出荷</NavLink>
                                   </li>
                                   <li className={`pl-[7rem] bg-white hover:bg-gray-100 ${activeItem === '/shukka-toroku-entry' ? 'text-black' : 'text-gray-300'}`} >
                                        <NavLink >仕入</NavLink>
                                   </li>
                                   <li className={`pl-[7rem] bg-white hover:bg-gray-100 ${activeItem === '/shukka-toroku-success' ? 'text-black' : 'text-gray-300'}`}>
                                        <NavLink >その他調整</NavLink>
                                   </li>
                              </ul>
                         </li>
                         <li className={`relative pl-20 hover:bg-white hover:text-cyan-600 ${activeTitle === '/' ? 'bg-white text-cyan-600' : ''}`}>
                              <button
                                   id="btn-shukka-ichiran"
                                   className="w-full text-left"
                                   name='btn-shukka-ichiran'
                                   onClick={(event) => handleSidebarTitleClick('/', event)}
                              >
                                   データ
                              </button>
                              <ul
                                   id="submenu-shukka-ichiran"
                                   className={`font-gray text-left -translate-x-1/4 item-center w-80 bg-white text-blue-500 overflow-hidden transition-all duration-300 z-10 ${activeTitle === '/' ? 'max-h-96' : 'max-h-0'}`}
                              >
                                   <li className={`pl-[7rem] bg-white hover:bg-gray-100 ${activeItem === '/' ? 'text-black' : 'text-gray-300'}`} onClick={(event) => handleSidebarItemClick('/', event)}>
                                        <NavLink to="/">出荷</NavLink>
                                   </li>
                                   <li className={`pl-[7rem] bg-white hover:bg-gray-100 text-gray-300`}>
                                        <NavLink>仕入</NavLink>
                                   </li>
                                   <li className={`pl-[7rem] bg-white hover:bg-gray-100 ${activeItem === '/shukka-success' ? 'text-black' : 'text-gray-300'}`} >
                                        <NavLink >その他調整</NavLink>
                                   </li>
                              </ul>
                         </li>
                         <li className="pl-20 hover:bg-white hover:text-cyan-600">
                              <NavLink >スケジュール表</NavLink>
                         </li>
                         <li className="pl-20 hover:bg-white hover:text-cyan-600">
                              <NavLink >解析</NavLink>
                         </li>
                         <li className="pl-20 hover:bg-white hover:text-cyan-600">
                              <NavLink >設定</NavLink>
                         </li>
                    </ul>
                    <div className='w-80 flex justify-end'>
                         <button className='pr-10 pt-10 hover:text-cyan-100 text-base font-thin'>詳細設定</button>
                    </div>
               </nav>
          </div>
     );
}
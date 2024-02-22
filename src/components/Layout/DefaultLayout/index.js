import Header from '~/components/Layout/components/Header';
import Footer from '../components/Footer';
import '../../GlobalStyles/GlobalStyles.css';
import { useState } from 'react';
import ChatBoxCustom from '~/components/ChatBox';

function DefaultLayout({ children }) {
    // State
    const [isOpenChatBox, setisOpenChatBox] = useState(false);

    // xử lý mở chat box
    const handleChangeStateOpenChatBox = () => {
        setisOpenChatBox(!isOpenChatBox);
        console.log(isOpenChatBox);
    };
    return (
        <div className=" bg-gray-400 min-h-[100vh] h-full flex-col pt-[5.75rem] ">
            <Header />
            <div>
                <div>{children}</div>
            </div>
            <Footer />
            <button
                onClick={() => handleChangeStateOpenChatBox()}
                className={
                    isOpenChatBox === true
                        ? 'hidden'
                        : 'z-[999] fixed right-4 bottom-12 rounded-full w-10 h-10 bg-sky-400 items-center  flex justify-center'
                }
            >
                <span className="absolute z-10 inline-flex w-8 h-8 rounded-full opacity-75 animate-ping bg-sky-400"></span>
                <i className="z-20 text-white fa-brands fa-facebook-messenger"></i>
            </button>
            {isOpenChatBox === false ? null : (
                <div className="z-[999] fixed right-4 bottom-2 shadow-2xl rounded-2xl">
                    <ChatBoxCustom closeChatBox={() => handleChangeStateOpenChatBox()} />
                </div>
            )}
        </div>
    );
}

export default DefaultLayout;

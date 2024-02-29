/* eslint-disable react-hooks/exhaustive-deps */
import Header from '~/components/Layout/components/Header';
import Footer from '../components/Footer';
import '../../GlobalStyles/GlobalStyles.css';
import { useContext, useEffect, useState } from 'react';
import ChatBoxCustom from '~/components/ChatBox';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';
import { onSnapshot, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '~/firebase';

const adminId = 'WI08Q27dOfTDfxGCZM3j42dtDQR2';

function DefaultLayout({ children }) {
    // State
    const [isOpenChatBox, setisOpenChatBox] = useState(false);
    const [chats, setChats] = useState({});

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser?.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser?.uid && getChats();
    }, [currentUser]);

    useEffect(() => {
        if (Object.keys(chats)?.length) {
            Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => dispatch({ type: 'CHANGE_USER', payload: chat[1]?.userInfo }));
        }
    }, [chats]);

    // xử lý mở chat box
    const handleChangeStateOpenChatBox = async () => {
        setisOpenChatBox(!isOpenChatBox);

        const combinedId = currentUser?.uid > adminId ? currentUser?.uid + adminId : adminId + currentUser?.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser?.uid), {
                    [combinedId + '.userInfo']: {
                        uid: adminId,
                        //   displayName: user.displayName,
                        //   photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', adminId), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser?.uid,
                        displayName: currentUser?.displayName,
                        photoURL: currentUser?.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {
            return err;
        }
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

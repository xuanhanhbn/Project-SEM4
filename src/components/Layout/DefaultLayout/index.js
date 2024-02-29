/* eslint-disable react-hooks/exhaustive-deps */
import Header from '~/components/Layout/components/Header';
import Footer from '../components/Footer';
import '../../GlobalStyles/GlobalStyles.css';
import { useEffect, useState } from 'react';
import ChatBoxCustom from '~/components/ChatBox';
import { auth, db, storage } from '~/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
function DefaultLayout({ children }) {
    const fakeDataChat = {
        displayName: 'User1',
        email: 'user1@gmail.com',
        password: 'Admin123@',
        image: 'https://didongviet.vn/dchannel/wp-content/uploads/2023/08/hinh-nen-3d-hinh-nen-iphone-dep-3d-didongviet@2x-576x1024.jpg',
    };

    // State
    const [isOpenChatBox, setisOpenChatBox] = useState(false);

    // khi vừa vào thì call đăng ký tài khoản chat
    useEffect(() => {
        handleRegisterAccountChatBox();
    }, []);

    const handleRegisterAccountChatBox = async () => {
        const displayName = fakeDataChat?.displayName;
        const email = fakeDataChat?.email;
        const password = fakeDataChat?.password;
        const file = fakeDataChat?.image;
        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                    } catch (err) {
                        return err;
                    }
                });
            });
        } catch (err) {
            return err;
        }
    };

    const handleLoginAccountChatBox = async () => {};

    // xử lý mở chat box
    const handleChangeStateOpenChatBox = () => {
        setisOpenChatBox(!isOpenChatBox);
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

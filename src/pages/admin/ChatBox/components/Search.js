import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AuthContext } from '~/context/AuthContext';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '~/firebase';
import { Link } from 'react-router-dom';

const validationSearchSchema = Yup.object().shape({
    search: Yup.string().required(''),
});

function Search() {
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validationSearchSchema),
    });

    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearchUser = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', username));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc && doc?.data()) {
                    return setUser(doc.data());
                }
            });
        } catch (err) {
            setErr(true);
            return err;
        }
    };

    const handleKeyDown = (e) => handleSearchUser();

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {}

        setUser(null);
        setUsername('');
    };
    return (
        <div>
            <form onSubmit={handleSubmit(handleSearchUser)}>
                <div className="text-3xl font-semibold">Chats</div>
                <div className="flex mt-4 bg-gray-800 rounded-md">
                    <Input
                        className="p-2 bg-gray-800 border-none focus-within:shadow-none focus:shadow-none"
                        placeholder="Basic usage"
                        onPressEnter={handleKeyDown}
                        value={username}
                        onChange={(e) => setUsername(e?.target?.value)}
                    />

                    <button className="w-10 h-auto rounded-tr-lg rounded-br-lg hover:bg-gray-900">
                        <i className="fa-regular fa-magnifying-glass"></i>
                    </button>
                </div>
            </form>
            {err && <span>User not found!</span>}
            {user && (
                <div className="my-5">
                    <Link to="#" onClick={() => handleSelect()} className="flex items-center">
                        <img src={user.photoURL} className="mr-3 rounded-full w-9 h-9" alt="" />
                        <p className="">{user.displayName}</p>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Search;

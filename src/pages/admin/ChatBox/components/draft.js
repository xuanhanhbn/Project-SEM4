// {/* <div className="flex h-full shadow-2xl bg-chat-100 rounded-2xl">
//     <div className="w-full h-full py-5 pl-5 pr-8 bg-white shadow-inner md:max-w-xs rounded-2xl"></div>

//     <div className="flex-col flex-1 hidden h-full md:flex">
//         <div className={isShowChatBox ? '' : 'hidden'}>
//             <div className="flex w-full h-24 p-6 border-b border-white">
//                 <div className="flex items-center w-full ">
//                     <img src={user?.photoURL} className="w-10 h-10 mr-3 rounded-full " alt="" />
//                     <p className="font-bold">{user?.displayName}</p>
//                 </div>
//                 <button className="h-auto bg-blue-900 rounded-lg md:hidden hover:bg-blue-101 w-14">
//                     <i className="text-3xl text-white fa-solid fa-caret-left"></i>
//                 </button>
//             </div>

//             <div className="flex flex-col flex-1 ">
//                 <div className="p-8 overflow-auto min-h-[24rem]">
//                     <div>
//                         <div className="flex items-end mt-6">
//                             <div className="w-10">
//                                 <img src={user?.photoURL} alt="" className="rounded-full w-7 h-w-7" />
//                             </div>
//                             {/* FOR USER */}
//                             <div>
//                                 {messages &&
//                                     messages?.length > 0 &&
//                                     messages
//                                         ?.filter((obj) => obj?.senderId !== currentUser?.uid)
//                                         .map((mess) => <MessageAdmin mess={mess} key={mess?.id} />)}
//                             </div>
//                         </div>

//                         {/* FOR ME */}

//                         {messages &&
//                             messages?.length > 0 &&
//                             messages
//                                 ?.filter((obj) => obj?.senderId === currentUser?.uid)
//                                 .map((mess) => <MessageAdmin mess={mess} key={mess?.id} />)}
//                     </div>
//                 </div>

//                 <form
//                     onSubmit={handleSubmitSendMessage(handleSendMessage)}
//                     className="flex pt-3 pb-6 mx-4 mt-4 shrink-0"
//                 >
//                     <Controller
//                         control={controlMessage}
//                         render={({ field: { onChange, value } }) => {
//                             return (
//                                 <Input
//                                     className="p-2 mx-10 bg-white border-none focus-within:shadow-none focus:shadow-none"
//                                     placeholder="Basic usage"
//                                     value={value}
//                                     onChange={onChange}
//                                 />
//                             );
//                         }}
//                         name="message"
//                     />
//                     <button className="h-auto bg-blue-900 rounded-lg hover:bg-blue-101 w-14">
//                         <i className="text-white fa-solid fa-paper-plane-top"></i>
//                     </button>
//                 </form>
//             </div>
//         </div>
//     </div>
// </div>; */}

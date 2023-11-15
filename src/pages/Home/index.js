import React from 'react';

function Home() {
    return (
        <div className="pt-[6.0625rem]    ">
            <div className="bg-[#fff] overflow-hidden">
                <div className="min-h-[40rem]  flex flex-col max-w-[1140px] w-full px-[1rem] mx-auto">
                    <div className="flex grow flex-wrap mx-[-1rem] ">
                        <div className="pr-[6rem] pl-[1rem] w-full relative flex flex-col justify-center z-[2] max-w-[50%] basis-1/2 "></div>
                        <div className=" relative px-[1rem] w-full max-w-[50%] basis-1/2">
                            <div className="absolute bg-cover bg-no-repeat banner h-full left-[-36%] bg-[url('https://images.ctfassets.net/z0x29akdg5eb/RlgTVY6m0ZTNw5Tixw9Co/5a67585afdeb42dbf89a42fb796b3dd5/Group_1265__1_.png?w=1280&fm=webp&q=80')]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

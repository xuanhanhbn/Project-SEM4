import React from 'react';
import CollapseCustom from './components/CollapseCustom';
import { dataFaqs } from './data';

const renderCollapse = () => {
    return dataFaqs.map((data) => {
        return (
            <div key={data.heading} className="mb-14 md:mb-24">
                <h2 className="mb-4 text-base font-bold leading-6 md:mb-6 md:text-2xl md:leading-8">{data.heading}</h2>
                {data.collapses.map((collapse) => {
                    return <CollapseCustom key={collapse.title} title={collapse.title} content={collapse.content} />;
                })}
            </div>
        );
    });
};

function Faqs() {
    return (
        <div className="px-6 mx-auto w-full md:max-w-[720px] md:px-4 lg:max-w-[960px]">
            <div className="mt-8 mb-12 md:mt-24 ">
                <div>
                    <h1 className="mb-2 text-center text-4xl font-bold leading-10 md:leading-[3.75rem] md:text-5xl">
                        FAQs
                    </h1>
                    <h4 className="text-base font-semibold leading-6 text-center text-gray-100 md:mb-14 md:leading-7 md:text-xl mb-9">
                        Have questions? We’ve got answers
                    </h4>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    <div className="relative w-full px-4 ">{dataFaqs.map((item) => renderCollapse(item))}</div>
                </div>
            </div>
            <div className="mb-12 text-center md:mb-24">
                <div>
                    <h1 className="mb-2 text-center text-4xl font-bold leading-10 md:leading-[3.75rem] md:text-5xl">
                        Still have questions?
                    </h1>
                    <h4 className="text-base font-semibold leading-6 text-center text-gray-100 md:mb-14 md:leading-7 md:text-xl mb-9">
                        Write to us at any time
                    </h4>
                    <button className="bg-orange-200 hover:bg-orange-100 hover:border-orange-100 border-orange-200 rounded-lg font-semibold text-sm p-[.75rem_1rem_.8125rem]">
                        Contact support
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Faqs;

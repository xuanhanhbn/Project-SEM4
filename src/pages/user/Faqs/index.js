import React from 'react';
import CollapseCustom from './components/CollapseCustom';
import { dataFaqs } from './constants';
import './faq.css';

// render blobk faqs
const RENDER_COLLAPE = () => {
    return dataFaqs.map((data) => {
        return (
            <div key={data.heading} className="mb-14 ">
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
        <div id="faq_container">
            <div className="mt-8 mb-12 ">
                <div>
                    <h1 className="faq_title">FAQs</h1>
                    <h4 className="faq_content">Have questions? We’ve got answers</h4>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    <div className="relative w-full px-4 ">{dataFaqs.map((item) => RENDER_COLLAPE(item))}</div>
                </div>
            </div>
            <div className="mb-12 text-center md:mb-24">
                <div>
                    <h1 className="faq_title">Still have questions?</h1>
                    <h4 className="content">Write to us at any time</h4>
                    <button className="btn_submit">Contact support</button>
                </div>
            </div>
        </div>
    );
}

export default Faqs;

import React from 'react';
import './HomeSlide.css';
import HomeListCampaigns from '../HomeListCampaigns';
import { Link } from 'react-router-dom';

export default function HomeSlide() {
    return (
        <div id="homeSlide" className="px-6 ">
            <div className="flex flex-row justify-between mb-2 md:hidden">
                <div className="flex ">
                    <h5 className="font-medium ">Featured goals</h5>
                    <span className="flex justify-center w-6 ml-3 bg-white rounded-full">3</span>
                </div>
                <div>
                    <button className="text-blue-100">See all</button>
                </div>
            </div>

            <div>
                <HomeListCampaigns />
            </div>
            <Link to="/campaigns" className="seeall_btn">
                See all
            </Link>
        </div>
    );
}

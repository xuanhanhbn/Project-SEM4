import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

function ThanksPage() {
    return (
        <div id="thank_page">
            <div className="h-screen content">
                <div className="wrapper-1">
                    <div className=" wrapper-2">
                        <h1>Thank you !</h1>
                        <p>Thanks for your participation in our program. </p>
                        <p>you should receive a confirmation email soon </p>
                        <Link to="/" className="mt-10 go-home">
                            go home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThanksPage;

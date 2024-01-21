import React from 'react';
import '../../css/ContactUsPage.css';

const ContactUsPage: React.FC = () => {
    return (
        <div className="container">
            <h1 className="page-title">Contact Us</h1>
            <div className="contact-info">
                <div className="contact-info-item">
                    <span className="contact-info-icon">📧</span>
                    <span className="contact-info-text">contact@GamingParadise.com</span>
                </div>
            </div>
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Gaming Paradise</label>
                    <input className="form-control" type="text" id="name" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Your Email</label>
                    <input className="form-control" type="email" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" rows={4} placeholder="Your message"></textarea>
                </div>
                <button className="submit-button" type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUsPage;
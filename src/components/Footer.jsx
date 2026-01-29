/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from 'react-icons/bi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/style/style.css'; // Ensure we use the global style or specific one

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const ballRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ball rolling animation
            gsap.to('.cricket-ball-footer', {
                x: '100vw',
                rotation: 720,
                duration: 4,
                ease: 'none',
                repeat: -1,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    toggleActions: 'play pause play pause'
                }
            });

            // Stumps growing animation
            gsap.from('.stump', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 80%',
                }
            });

            // Text fading in
            gsap.from('.footer-content > *', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 75%',
                }
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="cricket-footer">
            <div className="grass-turf"></div>

            <div className="animation-track">
                <div ref={ballRef} className="cricket-ball-footer"></div>
                <div className="stumps-container">
                    <div className="stump"></div>
                    <div className="stump"></div>
                    <div className="stump"></div>
                </div>
            </div>

            <div className="footer-content">
                <div className="footer-logo-section">
                    <h2 className="footer-logo">IPL 2024</h2>
                    <p>Where Talent Meets Opportunity</p>
                </div>

                <div className="footer-links">
                    <div className="link-column">
                        <h3>Tournament</h3>
                        <a href="#">Schedule</a>
                        <a href="#">Results</a>
                        <a href="#">Points Table</a>
                    </div>
                    <div className="link-column">
                        <h3>Teams</h3>
                        <a href="#">CSK</a>
                        <a href="#">MI</a>
                        <a href="#">RCB</a>
                        <a href="#">All Teams</a>
                    </div>
                    <div className="link-column">
                        <h3>Fan Zone</h3>
                        <a href="#">Fantasy</a>
                        <a href="#">Polls</a>
                        <a href="#">Merchandise</a>
                    </div>
                </div>

                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <span><BiLogoFacebook size={24} /></span>
                        <span><BiLogoTwitter size={24} /></span>
                        <span><BiLogoInstagram size={24} /></span>
                        <span><BiLogoYoutube size={24} /></span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Indian Premier League. All rights reserved.</p>
                <p>Designed with Passion</p>
            </div>
        </footer>
    );
};

export default Footer;

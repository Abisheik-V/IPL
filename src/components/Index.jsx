import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import PillNav from './PillNav';
import Slider from './Slider';
import iplLogo from '../assets/ipl-logo.png';
import '../assets/style/style.css';
import InfiniteMenu from './InfiniteMenu';
import ModelViewer from './ModelViewer';
import Footer from './Footer';

const Index = () => {
    const componentRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.to('.hero-title', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power4.out',
                stagger: 0.2
            })
                .to('.hero-subtitle', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.5')
                .to('.hero-btn', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }, '-=0.8');

        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={componentRef}>
            <PillNav
                logo={iplLogo}
                logoAlt="IPL Logo"
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Captains', href: '#captains' },
                    { label: 'Teams', href: '#teams' },
                    { label: 'Trophy', href: '#trophy' }
                ]}
                activeHref="/"
                className="custom-nav"
                ease="power2.easeOut"
                baseColor="#19398a"
                pillColor="#ef4022"
                pillTextColor="#ffffff"
                hoveredPillTextColor="#ffffff"
            />

            <section className="hero-section">
                <div className="hero-bg-overlay"></div>

                {/* Abstract Floating Elements */}
                <div className="floating-element float-1"></div>
                <div className="floating-element float-2"></div>

                <div className="hero-content">
                    <h1 className="hero-title">
                        CRICKET FEVER<br />
                        <span>IS BACK</span>
                    </h1>
                    <p className="hero-subtitle">
                        Witness the titans clash in the ultimate T20 showdown.
                    </p>
                    <a href="#teams" className="hero-btn">Explore Teams</a>
                </div>
            </section>
            <section id="captains">
                <Slider />
            </section>
            <section id="teams">
                <InfiniteMenu />
            </section>

            <section id="trophy" className="model-section">
                <div className="model-content">
                    <h2 className="section-title model-title">
                        The Ultimate Prize
                    </h2>
                    <p className="model-description">
                        Witness the glory of the IPL Trophy. A symbol of excellence, passion, and cricketing mastery.
                        Battle for pride and etching history in gold.
                    </p>
                </div>

                <ModelViewer
                    url={`${import.meta.env.BASE_URL}trophy.glb`}
                    width="100%"
                    height="600px"
                    autoRotate={true}
                    autoRotateSpeed={1.5}
                    enableManualRotation={true}
                    enableMouseParallax={false}
                    enableHoverRotation={false}
                    autoFrame={false}
                    defaultZoom={4}
                    modelYOffset={0}
                    environmentPreset="city"
                />
            </section>

            <Footer />
        </div>
    );
};

export default Index;

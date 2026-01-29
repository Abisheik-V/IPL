import React, { useState } from "react";
import "./Slider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Slider = () => {
    const captains = [
        {
            name: "Mahendra Singh Dhoni",
            img: `${import.meta.env.BASE_URL}images/msd.png`,
            description:
                "Captain of Chennai Super Kings (CSK). Known for his elegant Wicketkeeping and finishing skills. \n\n" +
                "He has been a consistent performer for the franchise, anchoring the innings with grace.",
            background: "linear-gradient(135deg, #f9cd05, #005a9c)",
        },
        {
            name: "Hardik Pandya",
            img: `${import.meta.env.BASE_URL}images/Hardik Pandiya.webp`,
            description:
                "Captain of Mumbai Indians (MI). An explosive all-rounder and a dynamic leader. \n\n" +
                "He brings energy and experience to the side, aiming for another title with his aggressive gameplay.",
            background: "linear-gradient(135deg, #004ba0, #d1ab3e)",
        },
        {
            name: "Virat Kohli",
            img: `${import.meta.env.BASE_URL}images/virat.png`,
            description:
                "Captain of Royal Challengers Bengaluru (RCB). A solid top-order batter with the ability to anchor the innings. \n\n" +
                "Known for his clutch performances in pressure situations, he leads the team with determination.",
            background: "linear-gradient(135deg, #ec1c24, #1a1a1a)",
        },
        {
            name: "Ajinkya Rahane",
            img: `${import.meta.env.BASE_URL}images/Ajinkya Rahane.webp`,
            description:
                "Captain of Kolkata Knight Riders (KKR). An experienced campaigner with a shrewd cricketing brain. \n\n" +
                "He leads by example with his batting and tactical acumen, guiding the team with composure.",
            background: "linear-gradient(135deg, #3a225d, #b3a123)",
        },
    ];

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState("next");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePrev = () => {
        setDirection("prev");
        setIndex((prev) => (prev - 1 + captains.length) % captains.length);
    };

    const handleNext = () => {
        setDirection("next");
        setIndex((prev) => (prev + 1) % captains.length);
    };

    return (
        <div
            className="slider"
            style={{ background: captains[index].background }}
        >
            <button className="arrow left-arrow" onClick={handlePrev}>
                <FaChevronLeft size={28} />
            </button>

            <div className="slider-images">
                {captains.map((captain, i) => {
                    const offset = (i - index + captains.length) % captains.length;
                    let x = 0,
                        y = 0,
                        scale = 1,
                        opacity = 1,
                        blur = "none",
                        zIndex = 1;

                    if (isMobile) {
                        // Mobile specific positioning
                        if (offset === 0) {
                            x = 0;
                            y = 0;
                            scale = 1.1; // Reduced scale for mobile
                            opacity = 1;
                            blur = "none";
                            zIndex = 3;
                        } else {
                            // Hide other images on mobile or position them unobtrusively
                            x = 0;
                            y = 0;
                            scale = 0.5;
                            opacity = 0; // Hide neighbors to prevent overlap
                            blur = "blur(10px)";
                            zIndex = 0;
                        }
                    } else {
                        // Desktop positioning (Original)
                        if (offset === 0) {
                            x = 0;
                            y = 0;
                            scale = 1.4;
                            opacity = 1;
                            blur = "none";
                            zIndex = 3;
                        } else if (offset === 1) {
                            x = 220;
                            y = -90;
                            scale = 0.95;
                            opacity = 0.4;
                            blur = "blur(3px)";
                            zIndex = 2;
                        } else if (offset === captains.length - 1) {
                            x = -290;
                            y = 200;
                            scale = 0.65;
                            opacity = 0.4;
                            blur = "blur(6px)";
                            zIndex = 2;
                        } else {
                            x = 0;
                            y = 0;
                            scale = 0.9;
                            opacity = 0;
                            blur = "blur(10px)";
                            zIndex = 0;
                        }
                    }

                    return (
                        <img
                            key={i}
                            src={captain.img}
                            alt={captain.name}
                            className="captain-img"
                            style={{
                                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                                opacity,
                                filter: blur,
                                zIndex,
                            }}
                        />
                    );
                })}
            </div>

            <button className="arrow right-arrow" onClick={handleNext}>
                <FaChevronRight size={28} />
            </button>

            <div className="slider-info-wrapper">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={index}
                        className="slider-info"
                        custom={direction}
                        initial={{ y: direction === "next" ? -80 : 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: direction === "next" ? 80 : -80, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        <h1>{captains[index].name}</h1>
                        {captains[index].description.split("\n\n").map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Slider;

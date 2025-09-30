"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextType from "../layout/typeText";
import ScrollReveal from "../layout/scrollReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MainSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textWrapperRef = useRef<HTMLDivElement | null>(null);
    const revealRef = useRef<HTMLDivElement | null>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const highlightRefs = useRef<HTMLSpanElement[]>([]);

    useGSAP(() => {
        if (!sectionRef.current || !containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=14000",
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        });

        // Step 1: Box scale in
        tl.fromTo(
            containerRef.current,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, ease: "power2.out", duration: 0.5 }
        );

        // Step 2: Typing text fade in
        tl.fromTo(
            textWrapperRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.6 }
        );

        // Step 3: Fade out typing text & fade in ScrollReveal
        tl.to(textWrapperRef.current, {
            opacity: 0,
            y: -40,
            ease: "power2.inOut",
            duration: 0.6,
        }).fromTo(
            revealRef.current,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 },
            "<+0.2"
        );

        // Step 4: Fade out ScrollReveal & fade in About Us
        tl.to(revealRef.current, {
            opacity: 0,
            y: -40,
            ease: "power2.inOut",
            duration: 0.8,
        }).fromTo(
            aboutRef.current,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 1 },
            "<+0.2"
        );

        // Step 5: Highlight effect on spans
        tl.to(highlightRefs.current, {
            backgroundColor: "#facc15", // Tailwind yellow-400
            color: "#000",
            duration: 0.6,
            stagger: 0.5,
            ease: "power1.inOut",
        });

        // Step 6: Expand box fullscreen (stay visible)
        tl.to(containerRef.current, {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: 1.2,
            ease: "power2.inOut",
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="h-screen flex items-start justify-center border"
        >
            <div className="h-screen flex items-center justify-center">
                <div
                    ref={containerRef}
                    className="w-screen h-8/12 bg-black flex flex-col items-center justify-center p-8 text-7xl"
                >
                    {/* Typing text */}
                    <div ref={textWrapperRef} className="opacity-0">
                        <TextType
                            text={["PAK AI LABS!", "PAKISTAN AI LABS!", "PAK AI LABORATORY!"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="_"
                        />
                    </div>

                    {/* ScrollReveal Content */}
                    <div
                        ref={revealRef}
                        className="opacity-0 mt-8 text-2xl leading-relaxed max-w-4xl text-center text-white"
                    >
                        <ScrollReveal
                            baseOpacity={0.5}
                            enableBlur={true}
                            baseRotation={10}
                            blurStrength={5}
                            textClassName="!text-white"
                        >
                            Welcome to <span className="font-bold">Pakistan AI Lab</span> — a space built
                            for dreamers, creators, and innovators.{" "}
                            <span className="text-gray-300">
                                Our lab provides powerful resources, modern facilities, expert guidance, and
                                a supportive community. We believe every idea matters — this is the place
                                where curiosity turns into skill, and visions become reality.
                            </span>
                        </ScrollReveal>
                    </div>

                    {/* About Us Section */}
                    <div
                        ref={aboutRef}
                        className="opacity-0 mt-8 text-3xl leading-relaxed max-w-4xl text-center text-white"
                    >
                        <p>
                            Our lab is designed to provide{" "}
                            <span ref={(el) => {if(el)highlightRefs.current.push(el)}} className="px-1 rounded">

                                everything you need
                            </span>{" "}
                            — from{" "}
                            <span ref={(el) => {if(el)highlightRefs.current.push(el)}} className="px-1 rounded">
                                powerful resources
                            </span>{" "}
                            and{" "}
                            <span ref={(el) => {if(el)highlightRefs.current.push(el)}} className="px-1 rounded">
                                modern facilities
                            </span>{" "}
                            to{" "}
                            <span ref={(el) => {if(el)highlightRefs.current.push(el)}} className="px-1 rounded">
                                expert guidance
                            </span>{" "}
                            and a{" "}
                            <span ref={(el) => {if(el)highlightRefs.current.push(el)}} className="px-1 rounded">
                                supportive community
                            </span>
                            . At{" "}
                            <span ref={(el) => {if(el)highlightRefs.current.push(el)}} className="px-1 rounded font-bold">
                                Pakistan AI Lab
                            </span>
                            , we believe every idea matters. This is the place where{" "}
                            <span ref={(el) => {if(el)highlightRefs.current.push(el)}} className="px-1 rounded">
                                curiosity turns into skill
                            </span>{" "}
                            and{" "}
                            <span ref={(el) => {if(el)highlightRefs.current.push(el)}} className="px-1 rounded">
                                visions become reality
                            </span>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSection;

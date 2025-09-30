"use client";

import Image from "next/image";
import BackgroundElement from "../bacground";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ShowCaseSection = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const container = useRef<HTMLDivElement | null>(null);
    const footer = useRef<HTMLDivElement | null>(null);
    const articleRef = useRef<HTMLDivElement | null>(null);

    // Load animation
    useGSAP(() => {
        const tl = gsap.timeline();

        // Image + footer together
        tl.fromTo(
            "#image-pakistan",
            { y: 920, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.8, ease: "expo.out" }
        )
            .fromTo(
                footer.current,
                { y: 120, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "expo.out" },
                "<" // start at the same time as image
            )
            .fromTo(
                "#ai",
                { x: -120, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                "-=0.5" // slightly overlap
            )
            .fromTo(
                "#lb",
                { x: 120, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                "-=0.8"
            );
    }, { scope: container });

    // Scroll animation
    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: footer.current,
                start: "top bottom",
                end: "top top",
                scrub: true,
            },
        })
            .fromTo("#scroll", { height: "30%" }, { height: "100%", ease: "none" })
            // Footer items go up & fade out
            .to(
                ["#copyright", "#rights"],
                { y: -50, duration: 0.5, opacity: 0, ease: "power1.out" },
                0
            )
            // Article fades in while footer fades out
            .fromTo(
                articleRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, ease: "power2.out" },
                0
            );
    }, { scope: footer });

    return (
        <section
            ref={container}
            id="showcase"
            className="relative h-screen flex flex-col justify-around"
        >
            <BackgroundElement
                isLoading={isLoading}
                onLoadingChange={setIsLoading}
            />

            {/* Logo + Hero */}
            <div className="space-y-2 mb-4 text-center">
                <Image
                    src={"/pakistan.svg"}
                    alt="Pakistan"
                    id="image-pakistan"
                    width={1517}
                    height={199}
                    priority
                />
                <div
                    id="hero-text"
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl flex justify-between items-center"
                >
                    <p id="ai">Artificial Intelligence</p>
                    <p id="lb">Laboratory</p>
                </div>
            </div>

            {/* Footer */}
            <footer
                ref={footer}
                className="flex justify-between items-center uppercase mt-40"
            >
                <p id="copyright">
                    &copy; {new Date().getFullYear()} Pak AI Labs
                </p>

                <p
                    id="mouse"
                    className="flex justify-center items-start w-8 h-12 rounded-2xl border p-2 -z-10"
                >
                    <span id="scroll" className="w-0.5 bg-white block"></span>
                </p>

                <p id="rights">All Right Reserved</p>
            </footer>

            {/* Article (hidden at first) */}
            <div
                ref={articleRef}
                className="absolute -bottom-20 right-0 w-full"
            >
                <article
                    className="max-w-4xl mx-auto bg-gray-300 text-black px-10 py-10 text-xl font-medium text-center rounded-lg shadow-md"
                >
                    <p>
                        At Pakistan AI Lab, we provide a hub where ideas turn into reality.
                        Our laboratory gives innovators, researchers, and learners a space
                        to experiment, build, and transform their vision into practical solutions.
                    </p>
                </article>
            </div>
        </section>
    );
};

export default ShowCaseSection;

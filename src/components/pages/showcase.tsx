'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ShowCasePage = () => {
    // Refs for targeting animated elements
    const containerRef = useRef<HTMLElement>(null);
    const articleRef = useRef<HTMLElement>(null);
    const leftSpanRef = useRef<HTMLSpanElement>(null);
    const rightSpanRef = useRef<HTMLSpanElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const p1Ref = useRef<HTMLParagraphElement>(null);
    const p2Ref = useRef<HTMLParagraphElement>(null);
    const p3Ref = useRef<HTMLParagraphElement>(null);
    const scrollTextRef = useRef<HTMLSpanElement>(null); // Ref for "Scroll Down" text

    // Refresh ScrollTrigger on mount for layout accuracy
    useEffect(() => {
        ScrollTrigger.refresh();
    }, []);

    // 1. Load Entrance: On-mount animation (no scroll trigger) - handles initial reveal
    useGSAP(() => {
        const article = articleRef.current;
        const footer = footerRef.current;
        const leftSpan = leftSpanRef.current;
        const rightSpan = rightSpanRef.current;

        console.log('Load refs:', { article, footer });

        // Initial positions: Elements start off-screen for entrance effect
        if (article) gsap.set(article, { y: '100vh' });
        if (footer) gsap.set(footer, { y: '100vh' });
        if (leftSpan) gsap.set(leftSpan, { x: -100, opacity: 0 });
        if (rightSpan) gsap.set(rightSpan, { x: 100, opacity: 0 });

        console.log('Load anim starting');

        // Timeline: Plays immediately on mount
        const loadTl = gsap.timeline();

        // Image & footer up (parallel, staggered speeds)
        if (article) loadTl.to(article, { y: 0, duration: 2, ease: 'power3.out', force3D: true }, 0);
        if (footer) loadTl.to(footer, { y: 0, duration: 1, ease: 'power3.out', force3D: true }, 0);

        // Spans after image
        if (leftSpan) loadTl.to(leftSpan, { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 2);
        if (rightSpan) loadTl.to(rightSpan, { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 2);

        // p1/p3 visible by default post-load (no set needed)
        console.log('Load complete: Full footer visible');
    }, { scope: containerRef });

    // 2. Scroll Scrub: Footer morph on scroll - scrub-driven content change
    useGSAP(() => {
        const p1 = p1Ref.current;
        const p2 = p2Ref.current;
        const p3 = p3Ref.current;
        const scrollText = scrollTextRef.current; // Target for "Scroll Down" text

        console.log('Scrub refs:', { p1, p2, p3, scrollText });

        // Initials for morph: p1/p3 visible/in-place, p2 at start pos, text hidden
        if (p1) gsap.set(p1, { y: 0, opacity: 1 });
        if (p3) gsap.set(p3, { y: 0, opacity: 1 });
        if (p2) gsap.set(p2, { x: 0, opacity: 1 }); // Already visible post-load
        if (scrollText) gsap.set(scrollText, { opacity: 0 }); // Ensure text starts hidden

        console.log('Scrub setup: Starting from full footer');

        // Scrub timeline: Progress = scroll
        const scrubTl = gsap.timeline({
            duration: 1, // Fixed total: Full progress over end distance
            defaults: { ease: 'none' },
        });

        // p1/p3: Upward scrub vanish (first 0.01 progress = "instant" over ~3vh)
        if (p1 && p3) scrubTl.to([p1, p3], {
            y: -100, // Upward
            opacity: 0,
            duration: 0.04, // Slice of total—quick snap
            ease: 'power2.in',
            force3D: true
        }, 0); // At progress 0

        // p2: Fast right slide (0.05 progress slice = brisk over ~15vh)
        if (p2) scrubTl.to(p2, {
            x: '45vw', // Your value
            duration: 0.05, // Short slice for speed
            force3D: true
        }, 0.01); // Starts just after vanish (progress 0.01)

        // "Scroll Down" text: Auto-fade in during p2 slide (reveals right-to-left on down-scroll; reverses to 0 on up-scroll)
        if (scrollText) scrubTl.to(scrollText, {
            opacity: 1,
            duration: 0.05, // Matches p2 slice for sync
            ease: 'power2.out',
            force3D: true
        }, 0.03); // Aligns with p2 star

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top', // Starts as section enters top (post-load)
            end: '+=104%', // Scroll space for scrub
            animation: scrubTl,
            scrub: true, // Scroll-driven
            immediateRender: false,
            invalidateOnRefresh: true,
            markers: true, // Debug
            onUpdate: self => console.log('Scrub progress:', self.progress.toFixed(2)), // Track
        });

        console.log('Scrub trigger active');
    }, { scope: containerRef, dependencies: [] }); // Re-run if needed

    return (
        <section ref={containerRef} className="flex flex-col justify-around h-screen p-5 space-y-3 relative overflow-visible">
            {/* Article: Hero image with overlaid title spans */}
            <article ref={articleRef} className="relative -bottom-32">
                <Image
                    src="/pakistan.svg"
                    alt="ShowCase"
                    width={1920}
                    height={1080}
                    className="z-10"
                />
                <h5 className="uppercase flex justify-between items-center text-md md:text-2xl lg:text-3xl">
                    <span ref={leftSpanRef}>artificial intelligence</span>
                    <span ref={rightSpanRef}>laboratory</span>
                </h5>
            </article>
            {/* Spacer div: Maintains layout spacing */}
            <div className="w-full h-7/12"></div>
            {/* Footer: Morphing content on scroll */}
            <footer ref={footerRef} className="flex items-center justify-between text-xs sm:text-base min-w-[300px] overflow-hidden py-1" style={{ willChange: 'transform' }}>
                <p ref={p1Ref}>&copy; {new Date().getFullYear()} Pakistan AI Labs</p>
                <p ref={p2Ref} className="relative w-4 h-6 sm:w-7 sm:h-10 md:w-8 md:h-12 border rounded-full flex justify-center items-start">
                    <span className="h-1.5 m-1 border sm:h-2 sm:m-3"></span>
                    <span ref={scrollTextRef} className="absolute right-10 top-2.5 flex flex-col justify-center items-center [&>*]:not-italic leading-4"> {/* Removed opacity-0; GSAP handles */}
                        <i>Scroll</i>
                        <i>Down</i>
                    </span>
                </p>
                <p ref={p3Ref}>All rights reserved</p>
            </footer>
        </section>
    );
};

export default ShowCasePage;
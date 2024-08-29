"use client";
import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

const LocomotiveScrollProvider = ({ children }) => {
    useEffect(() => {
       
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smoothMobile: true,
            resetNativeScroll: true,
        });

    
        return () => {
            if (scroll) {
                scroll.destroy();
            }
        };
    }, []);

    return <main data-scroll-container>{children}</main>;
};

export default LocomotiveScrollProvider;
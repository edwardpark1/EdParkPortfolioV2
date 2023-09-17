/*
    File: RouteScrollTop.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteScrollTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

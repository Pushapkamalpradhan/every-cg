import React, { useEffect, useRef, useState } from 'react';
import SearchApi from '../Component/Everycg/SearchApiHeader'

function AdropDownpp() {
    const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', checkIfClickedOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [isMenuOpen]);
    return (
        <div className="search_div" ref={ref}>
            <button className="tab_btn search_name dextop_hide" onClick={() => setIsMenuOpen((oldState) => !oldState)}><i className="fa fa-search"></i></button>
            {isMenuOpen && (
                <SearchApi />
            )}
        </div>
    );
}

export default AdropDownpp;

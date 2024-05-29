import React, { useState, useEffect, useRef } from 'react';

const ComboBox = ({ items, onSelect, singleSelect = false, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (item) => {
        const alreadySelected = selectedItems.includes(item);
        const newSelectedItems = singleSelect
            ? [item]
            : alreadySelected
                ? selectedItems.filter((val) => val !== item)
                : [...selectedItems, item];

        setSelectedItems(newSelectedItems);
        onSelect(newSelectedItems);
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <label>{label}</label>
            <button
                className="btn btn-secondary dropdown-toggle mx-2"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedItems.length > 0 ? selectedItems.join(', ') : 'Select items'}
            </button>
            <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                {items.map((item) => (
                    <a
                        key={item}
                        href="#!"
                        className={`dropdown-item ${selectedItems.includes(item) ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSelect(item);
                        }}
                    >
                        {item}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ComboBox;
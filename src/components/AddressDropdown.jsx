import React, { useState, useEffect, useRef } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddressDropdown = ({ items, selectCallback }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Function to handle clicks outside of the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter items based on search term, ensuring item is not undefined
        const filtered = items.filter(item =>
            item && item.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);

        // Show dropdown if there are filtered items
        setShowDropdown(filtered.length > 0);
    };

    // Function to handle item selection
    const handleItemSelect = (item) => {
        setSearchTerm(item);
        setShowDropdown(false);
        selectCallback(item);
    };

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <Form.Group controlId="searchDropdown">
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowDropdown(true)}
                />
            </Form.Group>

            {showDropdown && (
                <Dropdown.Menu
                    show
                    style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        position: 'absolute',
                        width: '100%',
                        zIndex: 1000
                    }}
                >
                    {filteredItems.slice(0, 20).map((item, index) => (
                        <Dropdown.Item 
                            key={index} 
                            onMouseDown={() => handleItemSelect(item)}
                        >
                            {item}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            )}
        </div>
    );
};

export default AddressDropdown;

import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { motion } from 'framer-motion';
import { FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import '../styles/pagination.css'; 

/* Predefined roles */
const roles = ['landlord', 'renter', 'agent'];

const PaginatedItems = ({ itemsPerPage }) => {
    const [items, setItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all'); // Default is 'all'

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/all`);
            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Filter items based on search term and selected role
        let filtered = items.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const roleMatch = selectedRole === 'all' || item.role === selectedRole;
            return nameMatch && roleMatch;
        });

        // Update filtered items and page count
        setFilteredItems(filtered);
        setPageCount(Math.ceil(filtered.length / itemsPerPage));
    }, [items, searchTerm, selectedRole, itemsPerPage]);

    useEffect(() => {
        // Update current items based on pagination offset
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    }, [itemOffset, filteredItems, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setItemOffset(0); // Reset offset when searching
    };

    const handleRoleSelect = (event) => {
        setSelectedRole(event.target.value);
        setItemOffset(0); // Reset offset when role changes
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    className="input-search-filter"
                    onChange={handleSearchChange}
                />
                <select className="select-role" value={selectedRole} onChange={handleRoleSelect}>
                <option value="all">All Roles</option>
                {roles.map((role, index) => (
                    <option key={index} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                ))}
                </select>
            </div>
            <motion.table
                initial="hidden"
                animate="visible"
                variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { delay: 0.4 } }
                }}
                className="table"
                style={{ width: '100%' }}
                cellSpacing="0"
                cellPadding="0"
                border="0"
                role="grid"
            >
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item, index) => (
                    <tr key={index}>
                    <td>{itemOffset + index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role.charAt(0).toUpperCase() + item.role.slice(1)}</td>
                    <td style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <FaPen />
                        <FaTrash />
                    </td>
                    </tr>
                ))}
                </tbody>
            </motion.table>
            <ReactPaginate
                breakLabel="..."
                nextLabel={'Next'}
                previousLabel={'Prev'}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
            />
        </>
    );
};

export default PaginatedItems;

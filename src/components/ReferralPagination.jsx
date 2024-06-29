import '../styles/pagination.css'; 

import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { motion } from 'framer-motion';
import { FaPen, FaTrash } from 'react-icons/fa';
import { getReferrals } from '../services/api';

const PaginatedItems = ({ itemsPerPage }) => {
    const [items, setItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchReferrals = async () => {
            try {
                const response = await getReferrals();
                setItems(response.data);
            } catch (error) {
                console.error(error);
            }
    };

    useEffect(() => {
        // Filter items based on search term
        let filtered = items.filter(item => {
            const nameMatch = item.referrer.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch;
        });

        // Update filtered items and page count
        setFilteredItems(filtered);
        setPageCount(Math.ceil(filtered.length / itemsPerPage));
    }, [items, searchTerm, itemsPerPage]);

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

    useEffect(() => {
        fetchReferrals()
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
                <th>Referrer</th>
                <th>Referrer Email</th>
                <th>Referred Email</th>
                <th>Invite Code</th>
                <th>Referral Count</th> 
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {currentItems.map((item, index) => (
                <tr key={index}>
                <td>{itemOffset + index + 1}</td>
                    <td>{item.referrer}</td>
                    <td>{item.referrer_email}</td>
                    <td>
                        {item.referrals.map((referral, idx) => (
                            <div key={idx}>{referral.referred_email}</div>
                        ))}
                    </td>
                    <td>
                        {item.referrals.map((referral, idx) => (
                            <div key={idx}>{referral.referral_code}</div>
                        ))}
                    </td>
                    <td>{item.referral_count}</td> {/* Display referral count */}
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
            forcePage={Math.floor(itemOffset / itemsPerPage)}
        />
        </>
    );
};

export default PaginatedItems;

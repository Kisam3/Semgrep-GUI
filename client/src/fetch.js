import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Button} from '@chakra-ui/react';
import './fetch.css';

function ResultsPage() {
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [severityFilter, setSeverityFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [sortDirection, setSortDirection] = useState('desc');
    const [limit, setcurrentlimit] = useState('');

    useEffect(() => {
        fetchResults();
    }, [currentPage, searchQuery, severityFilter, sortOption, sortDirection, limit]);

    const params = {
        page: currentPage,
    };

    // Add searchQuery parameter if it's not empty
    if (searchQuery) {
        params.search = searchQuery;
    }

    if (limit) {
        params.limit = limit;
    }

    // Add severityFilter parameter if it's not empty
    if (severityFilter) {
        params.severity = severityFilter;
    }

    // Add sort parameters if sortOption is set
    if (sortOption) {
        params.sortBy = sortOption;
        params.sort = sortDirection;
    }

    const fetchResults = async () => {
        try {
            const response = await axios.get(`/results`, { params});
            setResults(response.data.results);
            setTotalResults(response.data.totalResults);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLimitChange = (e) => {
        setcurrentlimit(e.target.value);
    };

    const handleSeverityChange = (e) => {
        setSeverityFilter(e.target.value);
    };

    const handleSortOptionChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSortDirectionChange = (e) => {
        setSortDirection(e.target.value);
    };




    return (
        <div>
            <h1 className={'px-2, py-3'}>Results</h1>
            <div className="flex space-x-2 ml-2">
                <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Select value={severityFilter} onChange={handleSeverityChange}>
                    <option value="all">All Severities</option>
                    <option value="INFO">Low</option>
                    <option value="WARNING">Medium</option>
                    <option value="ERROR">High</option>
                </Select>
                <Input
                    type="text"
                    placeholder="Limit"
                    value={limit}
                    onChange={handleLimitChange}
                />
                <Select value={sortDirection} onChange={handleSortDirectionChange}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </Select>
            </div>
            <Table className={'w-11/12 ml-2.5'}>
                <Thead>
                <Tr>
                    <Th className={'text-green-500 border 2px ml-2 bg-amber-200'}>Check ID</Th>
                    <Th className={'border 2px bg-amber-950 text-indigo-50'}>Paths</Th>
                    <Th className={'border 2px'}>Messages</Th>
                    <Th className={'border 2px mx-4 break-all'}>Lines</Th>
                    <Th className={'border 2px'}>Severity</Th>
                    {/* Add more table headers as needed */}
                </Tr>
                </Thead>
                <Tbody>
                {results.map((result, index) => (
                    <Tr key={index}>
                        <Td className={'border 2px'}>{result.check_id}</Td>
                        <Td className={'border 2px'}>{result.path}</Td>
                        <Td className={'border 2px'}>{result.extra.message}</Td>
                        <Td className={'border 2px px-6 break-all'}>{result.extra.lines}</Td>
                        <Td className={'border 2px px-4'}>{result.extra.severity}</Td>
                        {/* Add more table cells for additional fields */}
                    </Tr>
                ))}
                </Tbody>
            </Table>
            <div className={'pr-10'}>
                <button className={'px-3 py-1'}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <button className={'px-4 py-1 ml-2'}
                    disabled={currentPage * 10 >= totalResults}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>

    );
}

export default ResultsPage

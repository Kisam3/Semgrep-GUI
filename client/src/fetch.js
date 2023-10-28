import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResultsPage() {
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchResults();
    }, [currentPage]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`/results?page=${currentPage}`);
            setResults(response.data.results);
            setTotalResults(response.data.totalResults);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Results</h1>
            <table>
                <thead>
                <tr>
                    <th>Check ID</th>
                    <th>Severity</th>
                    <th>Path</th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {results.map((result, index) => (
                    <tr key={index}>
                        <td>{result.check_id}</td>
                        <td>{result.extra.severity}</td>
                        <td>{result.path}</td>
                        {/* Add more table cells for additional fields */}
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <button
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

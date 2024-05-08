import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function App() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
            );
            const result = await response.json();
            const mappedData = result.map((item) => (
                {
                ...item,
                location: item.showInfo[0]?.location,
                price: item.showInfo[0]?.price
                }
            ));
            setData(mappedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data:' + error.toString());
            }
        };
        fetchData();
    }, []);

    const timeoutId = useRef(null);

    const handleSearchTitle = (event) => {
    const value = event.target.value;

    timeoutId.current = setTimeout(() => {
        setSearchTerm(value);
    }, 500);
    };

    const filtered = data.filter((item) => item.title.includes(searchTerm));

    const columns = [
    { field: 'title', headerName: '名稱', width: 400 },
    { field: 'location', headerName: '地點', width: 500 },
    { field: 'price', headerName: '票價', width: 600 },
    ];

    if (error) {
        return <div id="error message" style={{ color: 'red', fontSize: '24px', textAlign: 'center', fontFamily: '標楷體'}}>
            {error}
        </div>;
    }
    return (
        <div style={{ height: 635, width: '100%', fontFamily: '標楷體'}}>
            <input type="text" onChange={handleSearchTitle} placeholder="在名稱中查詢..."
            style={
                { display: 'block', marginRight: 'auto', marginLeft: 'auto', marginBottom: '15px', fontFamily: '標楷體'}
            }/>
            <DataGrid rows={filtered} columns={columns} getRowId={(row) => row.UID}
            initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
            }} 
            style={
                { fontFamily: '標楷體', fontSize: '18px'}
            }
            pageSizeOptions={[10, 25, 50, 100]}
            />
        </div>
    );
}

export default App;
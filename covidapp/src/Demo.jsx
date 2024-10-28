import React, { useEffect, useState } from 'react';
const Demo = () => {
    const [Data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/process_string');
                const data = await response.json();
                setData(data.Data);
                prompt(Data);
            } catch (error) {
                console.log(error);
                prompt(error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
         <h1>Result: {Data}</h1>
        </>
    )
}
export default Demo;
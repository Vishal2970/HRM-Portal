import React, { useState, useEffect } from 'react';

const Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/report'); // Replace with your backend API endpoint
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>SQL Report</h1>
      <table>
        <thead>
          <tr>
            <th>Coshop No</th>
            <th>Coshop Name</th>
            <th>Item Name</th>
            <th>Item No</th>
            <th>Item Group No</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.coshopno}>
              <td>{item.coshopno}</td>
              <td>{item.coshopname}</td>
              <td>{item.coitemname}</td>
              <td>{item.coitemno}</td>
              <td>{item.N_cofkitemgroupno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;

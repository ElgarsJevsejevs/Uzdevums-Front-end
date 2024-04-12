import React, { useState } from 'react'
import './Table.css'
import addButton from '../Assets/add.png'
import nextButton from '../Assets/next.png'
import deleteButton from '../Assets/delete.png'

export const Table = () => {
  const [data, setData] = useState([
    { ID: 1, Name: 'Kevin', Age: 30, Country: 'Germany' },
    { ID: 2, Name: 'John', Age: 25, Country: 'France' },
    { ID: 3, Name: 'Julia', Age: 40, Country: 'Poland' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleAddRecord = () => {
    const newRecord = { ID: data.length + 1, Name: '', Age: '', Country: '' };
    setData([...data, newRecord]);
  };

  const handleDeleteRecord = (ID) => {
    const updatedData = data.filter((record) => record.ID !== ID);
    setData(updatedData);
  };

  const handleEditRecord = (ID, field, value) => {
    const updatedData = data.map((record) => {
      if (record.ID === ID) {
        const isDuplicateID = data.some((r) => r.ID !== ID && r.ID === parseInt(value));
        if (isDuplicateID) {
          alert('ID already exists. Please enter a unique ID.');
          return record;
        } else {
          return { ...record, [field]: field === 'ID' ? parseInt(value) : value };
        }
      } else {
        return record;
      }
    });
    setData(updatedData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = currentRecords.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
      <div className="table_container">
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th className='action_container'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.ID}>
              <td contentEditable onBlur={(e) => handleEditRecord(record.ID, 'ID', e.target.textContent)}>{record.ID}</td>
              <td contentEditable onBlur={(e) => handleEditRecord(record.ID, 'Name', e.target.textContent)}>{record.Name}</td>
              <td contentEditable onBlur={(e) => handleEditRecord(record.ID, 'Age', e.target.textContent)}>{record.Age}</td>
              <td contentEditable onBlur={(e) => handleEditRecord(record.ID, 'Country', e.target.textContent)}>{record.Country}</td>
              <td>
                <button className='delete_button' onClick={() => handleDeleteRecord(record.ID)}><img className='delete_button' src={deleteButton} alt=''/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='page_container'>
          <div className="select_container">
            <p>Rows per page:</p>
            <select
              value={recordsPerPage}
              onChange={(e) => {
                setRecordsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
            <div className='button_navigation_container'>
              <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}><img className='previous_button' src={nextButton} alt=''></img></button>
              <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}><img className='next_button' src={nextButton} alt=''></img></button>
             </div>
            </div>
      <button className='add_button' onClick={handleAddRecord}><img className='add_img' src={addButton} alt="" /></button>
      </div>
    </div>
  );
}
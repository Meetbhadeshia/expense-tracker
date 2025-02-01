import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Navbar from '@/components/Navbar';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface Expense {
    _id: string,
    date: string,
    label: string,
    description: string,
    price: number,
    createdAt: Date
}

const Expenses: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // For adding new expense modal
    const [isDateFilterModalOpen, setIsdateFilterModalOpen] = useState(false); // For adding new expense modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For editing expense modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete confirmation modal

    const [selectedExpense, setSelectedExpense] = useState<any>(null); // The expense to be edited or deleted
    const [labels, setLabels] = useState(["Food", "Rent", "Education", "Essential cost", "Non essential cost"]);
    const [selectedLabel, setSelectedLabel] = useState<String>('')

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expense, setExpense] = useState({
        id: '',
        date: '',
        label: '',
        description: '',
        price: 0,
    });
    const [total, setTotal] = useState(0)

    const [dates, setDates] = useState({
        date1: '',
        date2: ''
    })

    const closeModal = () => {
        setIsModalOpen(false)
        setIsdateFilterModalOpen(false);
        clearVariable();
    }

    const closeEditModal = () => {
        setSelectedExpense(null);
        setIsEditModalOpen(false);
        clearVariable()
    };

    const openDeleteModal = (expense: any) => {
        setSelectedExpense(expense); // Store the selected expense for deletion
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedExpense(null);
        setIsDeleteModalOpen(false);
    };

    const getAllExpenses = async () => {
        try {
            console.log("---dates----", dates)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/expenses?date1=${dates.date1}&date2=${dates.date2}&label=${selectedLabel}`, {
                cache: "no-store",
            })
            // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/expenses?label=Rent`, {
            //     cache: "no-store",
            // })

            if (!res.ok) {
                throw new Error('Failed to catch expenses')
            }
            const data: Expense[] = await res.json();
            let totalOfExpense = 0
            for (let i = 0; i < data.length; i++) {
                totalOfExpense += data[i].price
            }
            console.log('------data------', data)
            setExpenses(data)
            setTotal(totalOfExpense ? totalOfExpense : 0)
        } catch (error) {
            console.log("Error loading expenses", error)
        }
    }

    const clearVariable = () => {
        setExpense({
            id: '',
            date: '',
            label: '',
            description: '',
            price: 0,
        })
        setDates({
            date1: '',
            date2: ''
        })
    }

    const addAnExpense = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/expenses`, {
                method: "POST",  // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",  // Specify that we're sending JSON
                },
                body: JSON.stringify(expense),  // The request body
                cache: "no-store",
            })

            if (!res.ok) {
                throw new Error('Failed to create expense')
            }
            getAllExpenses()
            clearVariable()
            closeModal()
        } catch (error) {
            console.log("Error creating expenses", error)
        }
    }

    const editAnExpense = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/expenses`, {
                method: "PUT",  // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",  // Specify that we're sending JSON
                },
                body: JSON.stringify(expense),  // The request body
                cache: "no-store",
            })

            if (!res.ok) {
                throw new Error('Failed to edit expense')
            }
            getAllExpenses()
            clearVariable()
            closeEditModal()
        } catch (error) {
            console.log("Error editing exppense", error)
        }
    }

    const deleteAnExpense = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/expenses`, {
                method: "DELETE",  // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",  // Specify that we're sending JSON
                },
                body: JSON.stringify(expense),  // The request body
                cache: "no-store",
            })

            if (!res.ok) {
                throw new Error('Failed to delete expense')
            }
            getAllExpenses()
            clearVariable()
            closeDeleteModal()
        } catch (error) {
            console.log("Error deleting exppense", error)
        }
    }

    useEffect(() => {
        getAllExpenses()
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with '0' if necessary
        const month = date.toLocaleString('en-US', { month: 'short' }); // Get the short month name (Jan, Feb, etc.)
        const year = date.getFullYear(); // Get the full year
        return `${day} ${month} ${year}`; // Return in "dd Mon yyyy" formatcd 
    };

    // ---------- for dropdown of labels ---------------
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const handleHeaderClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Handle dropdown item click
    const handleLabelClick = (label: string) => {
        setDropdownOpen(false); // Close the dropdown after selection
    };
    // ---------- for dropdown of labels end ---------------



    return (
        <>
            <Navbar />
            <div className='general tertiary-color'>
                <div style={{ display: "flex", justifyContent: "end", gap: "2%" }}>
                    <input className="tertiary-text" type="date" placeholder="Date" onChange={e => setExpense({ ...expense, date: e.target.value })} />

                    <select className="tertiary-text" onChange={e => setExpense({ ...expense, label: e.target.value })}>
                        <option value="" disabled selected>Select Category</option>
                        {labels.map((label, index) => <option key={index} value={label}>{label}</option>)}
                    </select>

                    <input type="text" placeholder="Description" onChange={e => setExpense({ ...expense, description: e.target.value })} />

                    <input type="number" placeholder="Price" onChange={e => setExpense({ ...expense, price: Number(e.target.value) })} />

                    <button onClick={addAnExpense} className="general-button primary-color">Add</button>
                    <button onClick={() => setIsModalOpen(true)} className="general-button primary-color">Filters</button>
                </div>

                <table style={{ marginTop: '2%', width: '100%', textAlign: "center" }}>
                    <thead>

                        <tr>
                            <th className="secondary-color">No</th>
                            <th className="secondary-color" style={{ cursor: "pointer" }} onClick={() => setIsdateFilterModalOpen(true)}>Date</th>
                            <th className="secondary-color header-cell" style={{ cursor: "pointer", position: "relative" }}>
                                <div onClick={handleHeaderClick}>
                                    Label: <div className="filter-icon" title="Filter">&#x25BC;</div>
                                </div>
                                {isDropdownOpen && (
                                    <div
                                        className="dropdown"
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: "0",
                                            backgroundColor: "white",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                            zIndex: 1000,
                                        }}
                                    >
                                        {labels.map((label) => (
                                            <div
                                                key={label}
                                                onClick={() => handleLabelClick(label)}
                                                className="dropdown-item"
                                            >
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </th>
                            <th className="secondary-color text-3xl">Description</th>
                            <th className="secondary-color">Price</th>
                            <th className="secondary-color">Actions</th>
                        </tr>

                    </thead>
                    <tbody>

                        {expenses.map((expense, index) => (
                            <tr key={expense._id}>
                                <td className='primary-text'>{index + 1}</td>

                                <td className='primary-text'>{formatDate(expense.date)}</td>

                                <td className='primary-text'>{expense.label}</td>

                                <td className='primary-text'>{expense.description}</td>

                                <td className='primary-text'>{expense.price}</td>

                                <td className='primary-text' style={{ display: "flex", justifyContent: "center", gap: "2%" }}>
                                    <MdEdit color={'green'} style={{ cursor: "pointer" }} onClick={() => {
                                        setExpense({
                                            id: expense._id,
                                            date: expense.date,
                                            label: expense.label,
                                            description: expense.description,
                                            price: expense.price
                                        });
                                        setIsEditModalOpen(true);
                                    }} />

                                    <MdDelete color={'red'} style={{ cursor: "pointer" }} onClick={() => {
                                        openDeleteModal(expense);
                                        setExpense({
                                            id: expense._id,
                                            date: '',
                                            label: '',
                                            description: '',
                                            price: 0,
                                        });
                                    }} />

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                <p className="primary-text" style={{ marginTop: "10px", textAlign: "end" }}>Total: <strong>{total}</strong></p>

                {/* Filter Modal */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "2vh" }}>
                        <h2>Filters</h2>

                        <p className="primary-text">Starting date: <input type="date" placeholder="Date" onChange={e => setDates({ ...dates, date1: e.target.value })} /> </p>

                        <p className="primary-text">End date: <input type="date" placeholder="Date" onChange={e => setDates({ ...dates, date2: e.target.value })} /></p>

                        <div>
                            Label: <div className="filter-icon" title="Filter">&#x25BC;</div>
                            <select className="tertiary-text" onChange={e => setSelectedLabel(e.target.value)}>
                                <option value="" disabled selected>Select Category</option>
                                {labels.map((label, index) => <option key={index} value={label}>{label}</option>)}
                            </select>
                        </div>

                        <button onClick={addAnExpense}>Find</button>
                    </div>
                </Modal>

                {/* Date filter Modal */}
                <Modal isOpen={isDateFilterModalOpen} onClose={() => setIsdateFilterModalOpen(false)}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "2vh" }}>
                        <h2>Custom date filter</h2>

                        <p>Starting date: <input type="date" placeholder="Date" onChange={e => setDates({ ...dates, date1: e.target.value })} /> </p>

                        <p>End date: <input type="date" placeholder="Date" onChange={e => setDates({ ...dates, date2: e.target.value })} /></p>

                        <button onClick={() => { getAllExpenses(); setIsdateFilterModalOpen(false) }}>Submit</button>
                    </div>
                </Modal>

                {/* Edit Expense Modal */}
                <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "2vh" }}>
                        <h2 className='primary-text'>Edit Expense</h2>
                        {/* Extract and format the date to YYYY-MM-DD */}
                        <input
                            type="date"
                            defaultValue={expense?.date ? new Date(expense.date).toISOString().substring(0, 10) : ''}
                            onChange={e => setExpense({ ...expense, date: e.target.value })}
                        />

                        <select defaultValue={expense?.label} onChange={e => setExpense({ ...expense, label: e.target.value })}>
                            <option value="" disabled>Select Category</option>
                            {labels.map((label, index) => <option key={index} value={label}>{label}</option>)}
                        </select>

                        <input
                            type="text"
                            defaultValue={expense?.description}
                            placeholder="Description"
                            onChange={e => setExpense({ ...expense, description: e.target.value })}
                        />

                        <input
                            type="number"
                            defaultValue={expense?.price}
                            placeholder="Price"
                            onChange={e => setExpense({ ...expense, price: Number(e.target.value) })}
                        />

                        <button onClick={editAnExpense}>Save Changes</button>
                    </div>
                </Modal>



                {/* Delete Confirmation Modal */}
                <Modal isOpen={isDeleteModalOpen} onClose={(closeDeleteModal)}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "2vh" }}>
                        <h2 className='primary-text'>Delete Expense</h2>
                        <p className='primary-text'>Are you sure you want to delete this expense: <strong>{selectedExpense?.description}</strong>?</p>
                        <button onClick={deleteAnExpense}>Yes, Delete</button>
                        <button onClick={closeDeleteModal}>Cancel</button>
                    </div>
                </Modal>
            </div >
        </>
    );
};

export default Expenses;

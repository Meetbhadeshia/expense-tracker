import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Navbar from '@/components/Navbar';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { getAuthToken, logout } from '../utils/auth';

interface Label {
    _id: string;
    label: string;
    createdAt: Date;
    updatedAt: Date;
}

const Labels: React.FC = () => {
    const router = useRouter();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For editing label modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete confirmation modal

    const [selectedLabel, setSelectedLabel] = useState<Label | null>(null); // The label to be edited or deleted

    const [labels, setLabels] = useState<Label[]>([]);
    const [labelName, setLabelName] = useState('');

    const closeEditModal = () => {
        setSelectedLabel(null);
        setIsEditModalOpen(false);
        setLabelName('');
    };

    const openDeleteModal = (label: Label) => {
        setSelectedLabel(label); // Store the selected label for deletion
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedLabel(null);
        setIsDeleteModalOpen(false);
    };

    const getAllLabels = async () => {
        try {
            const token = getAuthToken();
            if (!token) {
                logout();
                router.push('/login');
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/labels`, {
                cache: "no-store",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.status === 401 || res.status === 403) {
                logout();
                router.push('/login');
                return;
            }
            if (!res.ok) {
                if (res.status === 404) {
                    setLabels([]); // No labels found
                    return;
                }
                throw new Error('Failed to fetch labels');
            }
            const data: Label[] = await res.json();
            setLabels(data);
        } catch (error) {
            console.log("Error loading labels", error);
        }
    };

    const isDuplicateLabel = (name: string) => {
        return labels.some(l => l.label.toLowerCase() === name.toLowerCase());
    };

    const addLabel = async () => {
        if (!labelName.trim()) {
            alert('Label name cannot be empty');
            return;
        }
        
        if (isDuplicateLabel(labelName.trim())) {
            alert(`A label named "${labelName.trim()}" already exists.`);
            return;
        }

        try {
            const token = getAuthToken();
            if (!token) {
                logout();
                router.push('/login');
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/labels`, {
                method: "POST",  // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",  // Specify that we're sending JSON
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ label: labelName.trim() }),  // The request body
                cache: "no-store",
            });

            if (res.status === 401 || res.status === 403) {
                logout();
                router.push('/login');
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to create label');
            }
            getAllLabels();
            setLabelName('');
        } catch (error) {
            console.log("Error creating label", error);
        }
    };

    const editALabel = async () => {
        if (!labelName.trim()) {
            alert('Label name cannot be empty');
            return;
        }

        if (isDuplicateLabel(labelName.trim()) && labelName.trim().toLowerCase() !== selectedLabel?.label.toLowerCase()) {
            alert(`A label named "${labelName.trim()}" already exists.`);
            return;
        }

        if (!selectedLabel) return;

        try {
            const token = getAuthToken();
            if (!token) {
                logout();
                router.push('/login');
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/labels/${selectedLabel._id}`, {
                method: "PUT",  // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",  // Specify that we're sending JSON
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ label: labelName.trim() }),  // The request body
                cache: "no-store",
            });

            if (res.status === 401 || res.status === 403) {
                logout();
                router.push('/login');
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to edit label');
            }
            getAllLabels();
            closeEditModal();
        } catch (error) {
            console.log("Error editing label", error);
        }
    };

    const deleteALabel = async () => {
        if (!selectedLabel) return;
        
        try {
            const token = getAuthToken();
            if (!token) {
                logout();
                router.push('/login');
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/labels/${selectedLabel._id}`, {
                method: "DELETE",  // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",  // Specify that we're sending JSON
                    "Authorization": `Bearer ${token}`
                },
                cache: "no-store",
            });

            if (res.status === 401 || res.status === 403) {
                logout();
                router.push('/login');
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to delete label');
            }
            getAllLabels();
            closeDeleteModal();
        } catch (error) {
            console.log("Error deleting label", error);
        }
    };

    useEffect(() => {
        getAllLabels();
    }, []);

    return (
        <>
            <Navbar />
            <div className='general tertiary-color'>
                <div className="expense-form-container">
                    <input 
                        type="text" 
                        placeholder="Label Name" 
                        value={labelName}
                        onChange={e => setLabelName(e.target.value)} 
                        className="tertiary-color"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addLabel()
                            }
                        }}
                    />
                    <button onClick={addLabel} className="general-button primary-color">Add Label</button>
                </div>

                <div className="table-responsive">
                    <table style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th className="secondary-color">No</th>
                                <th className="secondary-color">Label Name</th>
                                <th className="secondary-color">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {labels.map((label, index) => (
                                <tr key={label._id}>
                                    <td className='primary-text'>{index + 1}</td>
                                    <td className='primary-text'>{label.label}</td>
                                    <td className='primary-text' style={{ display: "flex", justifyContent: "center", gap: "2%", padding: "11px 0" }}>
                                        <MdEdit color={'green'} style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => {
                                            setSelectedLabel(label);
                                            setLabelName(label.label);
                                            setIsEditModalOpen(true);
                                        }} />

                                        <MdDelete color={'red'} style={{ cursor: "pointer" }} onClick={() => {
                                            openDeleteModal(label);
                                        }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Label Modal */}
                <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "2vh" }}>
                        <h2 className='primary-text'>Edit Label</h2>
                        <input
                            type="text"
                            value={labelName}
                            placeholder="Label Name"
                            onChange={e => setLabelName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    editALabel()
                                }
                            }}
                        />
                        <button onClick={editALabel} className="general-button primary-color">Save Changes</button>
                    </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "2vh" }}>
                        <h2 className='primary-text'>Delete Label</h2>
                        <p className='primary-text'>Are you sure you want to delete this label: <strong>{selectedLabel?.label}</strong>?</p>
                        <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                            <button onClick={deleteALabel} className="general-button" style={{backgroundColor: 'red', color: 'white'}}>Yes, Delete</button>
                            <button onClick={closeDeleteModal} className="general-button">Cancel</button>
                        </div>
                    </div>
                </Modal>
            </div >
        </>
    );
};

export default Labels;

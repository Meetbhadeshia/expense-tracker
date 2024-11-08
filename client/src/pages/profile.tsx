import Navbar from '@/components/Navbar';
import React, { useState } from 'react'

const Profile = () => {
    const [labelChanges, setLabelChanges] = useState([
        { name: "Food", edit: false },
        { name: "Education", edit: false },
        { name: "Rent", edit: false },
        { name: "Essential Cost", edit: false }
    ])

    return (
        <>
            <Navbar />
            <div className="general">
                <h2 style={{ marginTop: "2%" }}>Personal Details</h2>

                {/* personal details */}
                <div style={{ display: "flex", gap: "15%", marginTop: "2%" }}>
                    <div>
                        <h4>Name &nbsp;</h4>
                        <input type="text" value='Meet Bhadeshia' />

                        <div style={{ marginTop: "15%" }}>
                            <h4>Email: &nbsp;</h4>
                            <input type="text" value='bhadeshiam@gmail.com' />
                        </div>
                    </div>

                    <div>
                        <h4>Password: &nbsp;</h4>
                        <input type="text" value='MeetBhadeshia' />

                        <div style={{ marginTop: "15%" }}>
                            <h4>Current currency: &nbsp;</h4>
                            <select>
                                <option value="" disabled>Select Category</option>
                                <option value="Euro">Euro</option>
                                <option value="Euro">Euro</option>
                                <option value="Euro">Euro</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Labels */}
                <div style={{ marginTop: "5%" }}>
                    <h2 style={{ marginBottom: "2%" }}>Labels</h2>
                    {labelChanges.map((label, index) => {
                        return (
                            <React.Fragment key={index}>
                                {label.edit === false ? (
                                    <p
                                        onDoubleClick={() => {
                                            setLabelChanges(prevState =>
                                                prevState.map((item, i) =>
                                                    i === index ? { ...item, edit: !item.edit } : item
                                                )
                                            );
                                        }}
                                    >
                                        {label.name}
                                    </p>
                                ) : (
                                    <input
                                        type="text"
                                        value={label.name}
                                        onChange={(e) => {
                                            const updatedName = e.target.value;
                                            setLabelChanges(prevState =>
                                                prevState.map((item, i) =>
                                                    i === index ? { ...item, name: updatedName } : item
                                                )
                                            );
                                        }}
                                        onBlur={() => {
                                            setLabelChanges(prevState =>
                                                prevState.map((item, i) =>
                                                    i === index ? { ...item, edit: !item.edit } : item
                                                )
                                            );
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}


                    {/* <p onDoubleClick={() => alert("Meet")}>Food</p>
                    <p>Food</p>
                    <p>Food</p>
                    <p>Food</p>
                    <p>Food</p> */}
                </div>

                {/* save changes */}
                <p style={{ marginTop: "5%" }}>Save changes? <button className="general-button">Yes</button>&nbsp;<button className="general-button">No</button></p>
                <button className="general-button" style={{ display: "block", marginTop: "2%" }}>Log Out</button>
                <button className="general-button" style={{ marginTop: "2%" }}>Delete user</button>
            </div >
        </>
    )
}

export default Profile
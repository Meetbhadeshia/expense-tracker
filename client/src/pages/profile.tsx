import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import LabelManager from "@/components/LabelManager";

const Profile = () => {
  const [name, setName] = useState<string>("Meet Bhadeshia");
  const [email, setEmail] = useState<string>("bhadeshiam@gmail.com");
  const [password, setPassword] = useState<string>("MeetBhadeshia");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(localStorage.getItem("name") || "Meet Bhadeshia");
      setEmail(localStorage.getItem("email") || "bhadeshiam@gmail.com");
      setPassword(localStorage.getItem("password") || "MeetBhadeshia");
    }
  }, []);


  // const [labelChanges, setLabelChanges] = useState([
  //   { name: "Food", edit: false },
  //   { name: "Education", edit: false },
  //   { name: "Rent", edit: false },
  //   { name: "Essential Cost", edit: false },
  // ]);

  const currencies = ["USD", "Euro", "GBP", "CAD", "JPY"];
  // const [labels, setLabels] = useState(() => {
  //   const storedLabels = localStorage.getItem("labels");
  //   return storedLabels ? JSON.parse(storedLabels) : [];
  // });

  const [labels, setLabels] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLabels = localStorage.getItem("labels");
      if (storedLabels) {
        setLabels(JSON.parse(storedLabels));
      }
    }
  }, []);

  const updateLabels = (newLabels: string[]) => {
    setLabels(newLabels);
    if (typeof window !== "undefined") {
      localStorage.setItem("labels", JSON.stringify(newLabels));
    }
  };


  return (
    <>
      <Navbar />
      <div className="general">
        <h2 style={{ marginTop: "2%" }}>Personal Details</h2>

        {/* personal details */}
        <div style={{ display: "flex", gap: "15%", marginTop: "2%" }}>
          <div>
            <h4>Name: &nbsp;</h4>
            <input
              type="text"
              className="w-full p-2 border rounded-md  text-black"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (typeof window !== "undefined") {
                  localStorage.setItem("name", e.target.value);

                }
              }}
            />

            <div style={{ marginTop: "15%" }}>
              <h4>Email: &nbsp;</h4>
              <input
                type="email"
                className="w-full p-2 border rounded-md  text-black"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("email", e.target.value);

                  }
                }}
              />
            </div>
          </div>

          <div>
            <h4>Password: &nbsp;</h4>
            <input
              type="password"
              className="w-full p-2 border rounded-md  text-black"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (typeof window !== "undefined") {
                  localStorage.setItem("password", e.target.value);

                }

              }}
            />

            <div style={{ marginTop: "15%" }}>
              <h4>Current currency: &nbsp;</h4>
              <select className="w-full p-2 border rounded-md text-black">
                <option value="" disabled>
                  Select Currency
                </option>
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
         <LabelManager labels={labels} updateLabels={updateLabels} />

        {/* <div style={{ marginTop: "5%" }}>
          <h2 style={{ marginBottom: "2%" }}>Labels</h2>
          {labelChanges.map((label, index) => {
            return (
              <React.Fragment key={index}>
                {label.edit === false ? (
                  <p
                    onDoubleClick={() => {
                      setLabelChanges((prevState) =>
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
                      setLabelChanges((prevState) =>
                        prevState.map((item, i) =>
                          i === index ? { ...item, name: updatedName } : item
                        )
                      );
                    }}
                    onBlur={() => {
                      setLabelChanges((prevState) =>
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

          <p onDoubleClick={() => alert("Meet")}>Food</p>
          <p>Food</p>
          <p>Food</p>
          <p>Food</p>
          <p>Food</p>
        </div> */}

        {/* save changes */}
        <p style={{ marginTop: "5%" }}>
          Save changes? <button className="general-button">Yes</button>&nbsp;
          <button className="general-button">No</button>
        </p>
        <button
          className="general-button"
          style={{ display: "block", marginTop: "2%" }}
        >
          Log Out
        </button>
        <button className="general-button" style={{ marginTop: "2%" }}>
          Delete user
        </button>
      </div>
    </>
  );
};

export default Profile;

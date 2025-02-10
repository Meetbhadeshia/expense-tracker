// import React, { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Pencil, Trash2, Check, X } from "lucide-react"

// export default function Labels() {
//     const [labels, setLabels] = useState([])
//     const [newLabel, setNewLabel] = useState("")
//     const [editingIndex, setEditingIndex] = useState(null)
//     const [editedLabel, setEditedLabel] = useState("")

//     const handleAddLabel = () => {
//         if (newLabel.trim() === "") {
//             return
//             setLabels([...labels, newLabel])
//             setNewLabel("")
//         }
//     }

//     return (
//         <div>
//             <h2>Manage Labels</h2>
//             <div>
//                 <input
//                     value={newLabel}
//                     onChange={(e) => setNewLabel(e.target.value)}
//                     placeholder="Enter label name" />
//                 <Button onClick={handleAddLabel}>Add</Button>
//             </div>
//         </div>

//     )
// }

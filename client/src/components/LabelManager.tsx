import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Pencil, Trash2, Check, X } from "lucide-react";

type LabelManagerProps = {
  labels: string[];
  updateLabels: (labels: string[]) => void;
};

export default function LabelManager({
  labels,
  updateLabels,
}: LabelManagerProps) {
  const [newLabel, setNewLabel] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedLabel, setEditedLabel] = useState<string>("");

  const handleAddLabel = (): void => {
    if (newLabel.trim() === "") {
      return;
    }
    updateLabels([...labels, newLabel]);
    setNewLabel("");
  };

  const handleDeleteLabel = (index: number): void => {
    updateLabels(labels.filter((_, i) => i !== index));
  };

  const handleEditLabel = (index: number): void => {
    setEditingIndex(index);
    setEditedLabel(labels[index]);
  };

  const handleSaveLabel = (index: number): void => {
    if (editedLabel.trim() === "") {
      return;
    }
    const updatedLabels = [...labels];
    updatedLabels[index] = editedLabel;
    updateLabels(updatedLabels);
    setEditingIndex(null);
  };

  return (

    <div className="pt-8 w-80 ml-0">
      <h2 className="text-xl font-semibold mb-4">Labels</h2>
      <div className="flex gap-2 mb-4">
        <Input
          value={newLabel}

          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewLabel(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddLabel();
            }
          }}
          placeholder="Enter label name"
        />
        <Button onClick={handleAddLabel}>Add</Button>
      </div>

      {/* Display list of labels */}
      <div className="space-y-2">
        {labels.map((label, index) => (
          <Card key={index} className="flex items-center justify-between p-2">
            {editingIndex === index ? (
              <div className="flex gap-2 w-full">
                <Input
                  value={editedLabel}
                  onChange={(e) => setEditedLabel(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveLabel(index)}
                  placeholder=""
                />
                <Button size="icon" onClick={() => handleSaveLabel(index)}>
                  <Check className="w-4 h-4" />
                </Button>
                {/* <Input
                  value={editedLabel}
                  onChange={(e) => setEditedLabel(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveLabel(index)} // Press Enter to save
                  placeholder="Edit label"
                /> */}

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => setEditingIndex(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span>{label}</span>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEditLabel(index)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDeleteLabel(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

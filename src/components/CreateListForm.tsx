import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, X, Luggage } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CreateListFormProps {
  onSave?: (list: PackingList) => void;
  onCancel?: () => void;
  open?: boolean;
}

interface PackingList {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  categories: string[];
}

const defaultCategories = [
  { id: "essentials", label: "Essentials" },
  { id: "clothing", label: "Clothing" },
  { id: "toiletries", label: "Toiletries" },
  { id: "electronics", label: "Electronics" },
  { id: "documents", label: "Documents" },
  { id: "medications", label: "Medications" },
  { id: "accessories", label: "Accessories" },
  { id: "misc", label: "Miscellaneous" },
];

const CreateListForm: React.FC<CreateListFormProps> = ({
  onSave,
  onCancel,
  open = true,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "essentials",
    "clothing",
    "toiletries",
  ]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newList: PackingList = {
      id: Date.now().toString(),
      title: title || "Untitled Trip",
      description,
      destination,
      startDate,
      endDate,
      categories: selectedCategories,
    };

    if (onSave) {
      onSave(newList);
    } else {
      // If no onSave handler, we could save to localStorage or navigate
      const savedLists = JSON.parse(
        localStorage.getItem("packingLists") || "[]",
      );
      localStorage.setItem(
        "packingLists",
        JSON.stringify([...savedLists, newList]),
      );
      navigate(`/list/${newList.id}`);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Luggage className="h-6 w-6" />
            Create New Packing List
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Trip Name</Label>
              <Input
                id="title"
                placeholder="Summer Vacation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Notes about your trip"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Paris, France"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="block mb-2">Categories</Label>
              <Card>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {defaultCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() =>
                            handleCategoryToggle(category.id)
                          }
                        />
                        <Label htmlFor={`category-${category.id}`}>
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create List
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListForm;

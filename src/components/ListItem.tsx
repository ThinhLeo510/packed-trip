import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ListItemProps {
  id: string;
  name: string;
  quantity?: number;
  isChecked?: boolean;
  category: string;
  onCheck?: (id: string, checked: boolean) => void;
  onEdit?: (id: string, name: string, quantity: number) => void;
  onDelete?: (id: string) => void;
}

const ListItem = ({
  id = "1",
  name = "Passport",
  quantity = 1,
  isChecked = false,
  category = "Essentials",
  onCheck = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: ListItemProps) => {
  const [checked, setChecked] = useState(isChecked);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editQuantity, setEditQuantity] = useState(quantity);

  const handleCheck = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onCheck(id, newCheckedState);
  };

  const handleEdit = () => {
    onEdit(id, editName, editQuantity);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white hover:bg-gray-50 rounded-md">
      <div className="flex items-center space-x-3">
        <Checkbox
          id={`item-${id}`}
          checked={checked}
          onCheckedChange={handleCheck}
        />
        <div className="flex flex-col">
          <label
            htmlFor={`item-${id}`}
            className={`text-sm font-medium ${checked ? "line-through text-gray-400" : "text-gray-700"}`}
          >
            {name}
          </label>
          {quantity > 1 && (
            <span className="text-xs text-gray-500">Quantity: {quantity}</span>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditDialogOpen(true)}
          className="h-8 w-8 p-0"
        >
          <Pencil className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Edit</span>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Item</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{name}"? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-name" className="text-right">
                Name
              </Label>
              <Input
                id="item-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="item-quantity"
                type="number"
                min="1"
                value={editQuantity}
                onChange={(e) => setEditQuantity(parseInt(e.target.value) || 1)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListItem;

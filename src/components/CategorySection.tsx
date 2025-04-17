import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface Item {
  id: string;
  name: string;
  quantity?: number;
  isChecked: boolean;
}

interface CategorySectionProps {
  title: string;
  items: Item[];
  onAddItem?: (categoryName: string) => void;
  onEditItem?: (itemId: string) => void;
  onDeleteItem?: (itemId: string) => void;
  onToggleItem?: (itemId: string) => void;
}

// Create an inline ListItem component since there seems to be an issue with importing it
const ItemRow = ({
  id,
  name,
  quantity,
  isChecked,
  onEdit,
  onDelete,
  onToggle,
}: {
  id: string;
  name: string;
  quantity?: number;
  isChecked: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-background">
      <div className="flex items-center gap-3">
        <Checkbox
          id={`item-${id}`}
          checked={isChecked}
          onCheckedChange={onToggle}
        />
        <div className="flex flex-col">
          <label
            htmlFor={`item-${id}`}
            className={`font-medium ${isChecked ? "line-through text-muted-foreground" : ""}`}
          >
            {name}
          </label>
          {quantity && (
            <span className="text-xs text-muted-foreground">
              Qty: {quantity}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

const CategorySection: React.FC<CategorySectionProps> = ({
  title = "Category",
  items = [
    { id: "1", name: "Sample item 1", quantity: 1, isChecked: false },
    { id: "2", name: "Sample item 2", quantity: 2, isChecked: true },
    { id: "3", name: "Sample item 3", isChecked: false },
  ],
  onAddItem = () => {},
  onEditItem = () => {},
  onDeleteItem = () => {},
  onToggleItem = () => {},
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddItem = () => {
    onAddItem(title);
  };

  return (
    <Card className="w-full mb-4 bg-white">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1"
              onClick={toggleExpand}
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
            <h3 className="text-lg font-medium">{title}</h3>
            <Badge variant="secondary" className="ml-2">
              {items.length} {items.length === 1 ? "item" : "items"}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleAddItem}
          >
            <Plus size={16} />
            <span>Add Item</span>
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 pt-0">
          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item) => (
                <ItemRow
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  isChecked={item.isChecked}
                  onEdit={() => onEditItem(item.id)}
                  onDelete={() => onDeleteItem(item.id)}
                  onToggle={() => onToggleItem(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-muted-foreground">
              No items in this category. Click "Add Item" to add one.
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default CategorySection;

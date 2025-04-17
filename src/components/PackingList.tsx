import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Share, Trash2, Save, Plus } from "lucide-react";
import CategorySection from "./CategorySection";
import ListItem from "./ListItem";

interface PackingListProps {
  id?: string;
  title?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  categories?: Category[];
  onSave?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

interface Category {
  id: string;
  name: string;
  items: Item[];
}

interface Item {
  id: string;
  name: string;
  quantity?: number;
  isChecked: boolean;
  categoryId: string;
}

const PackingList: React.FC<PackingListProps> = ({
  id = "default-list",
  title = "My Packing List",
  destination = "Beach Vacation",
  startDate = "2023-06-15",
  endDate = "2023-06-22",
  categories = [
    {
      id: "essentials",
      name: "Essentials",
      items: [
        {
          id: "e1",
          name: "Passport",
          isChecked: true,
          categoryId: "essentials",
        },
        {
          id: "e2",
          name: "Wallet",
          isChecked: false,
          categoryId: "essentials",
        },
        {
          id: "e3",
          name: "Phone Charger",
          isChecked: false,
          categoryId: "essentials",
        },
      ],
    },
    {
      id: "clothing",
      name: "Clothing",
      items: [
        {
          id: "c1",
          name: "T-shirts",
          quantity: 5,
          isChecked: false,
          categoryId: "clothing",
        },
        {
          id: "c2",
          name: "Shorts",
          quantity: 3,
          isChecked: false,
          categoryId: "clothing",
        },
        {
          id: "c3",
          name: "Swimwear",
          quantity: 2,
          isChecked: true,
          categoryId: "clothing",
        },
      ],
    },
    {
      id: "toiletries",
      name: "Toiletries",
      items: [
        {
          id: "t1",
          name: "Toothbrush",
          isChecked: false,
          categoryId: "toiletries",
        },
        {
          id: "t2",
          name: "Shampoo",
          isChecked: false,
          categoryId: "toiletries",
        },
        {
          id: "t3",
          name: "Sunscreen",
          isChecked: false,
          categoryId: "toiletries",
        },
      ],
    },
    {
      id: "electronics",
      name: "Electronics",
      items: [
        {
          id: "el1",
          name: "Camera",
          isChecked: false,
          categoryId: "electronics",
        },
        {
          id: "el2",
          name: "Laptop",
          isChecked: false,
          categoryId: "electronics",
        },
        {
          id: "el3",
          name: "Headphones",
          isChecked: true,
          categoryId: "electronics",
        },
      ],
    },
  ],
  onSave = () => console.log("Saving list..."),
  onShare = () => console.log("Sharing list..."),
  onDelete = () => console.log("Deleting list..."),
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState(
    categories[0]?.id || "",
  );
  const [newItemQuantity, setNewItemQuantity] = useState<number | undefined>(
    undefined,
  );
  const [localCategories, setLocalCategories] =
    useState<Category[]>(categories);

  // Calculate progress
  const totalItems = localCategories.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );
  const checkedItems = localCategories.reduce(
    (sum, category) =>
      sum + category.items.filter((item) => item.isChecked).length,
    0,
  );
  const progress =
    totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const handleToggleItem = (itemId: string, categoryId: string) => {
    setLocalCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) =>
              item.id === itemId
                ? { ...item, isChecked: !item.isChecked }
                : item,
            ),
          };
        }
        return category;
      }),
    );
  };

  const handleDeleteItem = (itemId: string, categoryId: string) => {
    setLocalCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.filter((item) => item.id !== itemId),
          };
        }
        return category;
      }),
    );
  };

  const handleAddItem = () => {
    if (newItemName.trim() === "") return;

    const newItem: Item = {
      id: `new-${Date.now()}`,
      name: newItemName,
      quantity: newItemQuantity,
      isChecked: false,
      categoryId: newItemCategory,
    };

    setLocalCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === newItemCategory) {
          return {
            ...category,
            items: [...category.items, newItem],
          };
        }
        return category;
      }),
    );

    // Reset form
    setNewItemName("");
    setNewItemQuantity(undefined);
    setIsAddItemDialogOpen(false);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-gray-500">
              {destination} • {startDate} to {endDate}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your packing list and all of its items.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-red-500 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="mt-4 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {checkedItems} of {totalItems} items packed ({progress}%)
        </p>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Items</TabsTrigger>
              {localCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {localCategories.map((category) => (
                <CategorySection key={category.id} category={category}>
                  {category.items.map((item) => (
                    <ListItem
                      key={item.id}
                      item={item}
                      onToggle={() => handleToggleItem(item.id, category.id)}
                      onDelete={() => handleDeleteItem(item.id, category.id)}
                    />
                  ))}
                </CategorySection>
              ))}
            </TabsContent>

            {localCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <CategorySection category={category} expanded={true}>
                  {category.items.map((item) => (
                    <ListItem
                      key={item.id}
                      item={item}
                      onToggle={() => handleToggleItem(item.id, category.id)}
                      onDelete={() => handleDeleteItem(item.id, category.id)}
                    />
                  ))}
                </CategorySection>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <Dialog
          open={isAddItemDialogOpen}
          onOpenChange={setIsAddItemDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
              <DialogDescription>
                Add a new item to your packing list.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="item-name" className="text-right">
                  Name
                </label>
                <input
                  id="item-name"
                  className="col-span-3 p-2 border rounded"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Item name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="item-category" className="text-right">
                  Category
                </label>
                <select
                  id="item-category"
                  className="col-span-3 p-2 border rounded"
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                >
                  {localCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="item-quantity" className="text-right">
                  Quantity
                </label>
                <input
                  id="item-quantity"
                  type="number"
                  className="col-span-3 p-2 border rounded"
                  value={newItemQuantity || ""}
                  onChange={(e) =>
                    setNewItemQuantity(
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="Optional"
                  min="1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddItemDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PackingList;

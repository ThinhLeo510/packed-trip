import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Luggage, Search, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateListForm from "@/components/CreateListForm";

interface PackingListPreview {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  itemCount: number;
}

const ViewLists: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [packingLists, setPackingLists] = useState<PackingListPreview[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Load saved lists from localStorage on component mount
  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("packingLists") || "[]");
    const formattedLists = savedLists.map((list: any) => ({
      id: list.id,
      title: list.title,
      destination: list.destination || "No destination",
      startDate: list.startDate || "",
      endDate: list.endDate || "",
      itemCount:
        list.categories?.reduce(
          (sum: number, cat: any) => sum + (cat.items?.length || 0),
          0,
        ) || 0,
    }));
    setPackingLists(formattedLists);
  }, []);

  const handleCreateList = (newList: any) => {
    // Save to localStorage
    const savedLists = JSON.parse(localStorage.getItem("packingLists") || "[]");
    localStorage.setItem(
      "packingLists",
      JSON.stringify([...savedLists, newList]),
    );

    // Add to state
    setPackingLists([
      ...packingLists,
      {
        id: newList.id,
        title: newList.title,
        destination: newList.destination || "No destination",
        startDate: newList.startDate || "",
        endDate: newList.endDate || "",
        itemCount: 0,
      },
    ]);

    setIsCreateDialogOpen(false);
    navigate(`/list/${newList.id}`);
  };

  const filteredLists = packingLists.filter(
    (list) =>
      list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Luggage className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Your Packing Lists</h1>
          </div>
          <Button
            className="w-full md:w-auto"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New List
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your packing lists..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main>
        {filteredLists.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <Luggage className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No packing lists found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try a different search term"
                : "Create your first packing list to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New List
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLists.map((list) => (
              <Card key={list.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{list.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{list.destination}</span>
                    </div>
                    {(list.startDate || list.endDate) && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {formatDate(list.startDate)} -{" "}
                          {formatDate(list.endDate)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Items:</span>
                      <span className="font-medium">{list.itemCount}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/list/${list.id}`)}
                  >
                    View List
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Packing List</DialogTitle>
          </DialogHeader>
          <CreateListForm
            onSave={handleCreateList}
            onCancel={() => setIsCreateDialogOpen(false)}
            open={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewLists;

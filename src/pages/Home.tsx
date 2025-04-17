import React, { useState } from "react";
import { PlusCircle, Luggage, Search } from "lucide-react";
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

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [packingLists, setPackingLists] = useState<PackingListPreview[]>([
    {
      id: "1",
      title: "Summer Beach Vacation",
      destination: "Maldives",
      startDate: "2023-07-15",
      endDate: "2023-07-25",
      itemCount: 24,
    },
    {
      id: "2",
      title: "Business Trip",
      destination: "New York",
      startDate: "2023-08-10",
      endDate: "2023-08-15",
      itemCount: 18,
    },
    {
      id: "3",
      title: "Camping Weekend",
      destination: "Yosemite",
      startDate: "2023-09-01",
      endDate: "2023-09-03",
      itemCount: 32,
    },
    {
      id: "4",
      title: "Winter Ski Trip",
      destination: "Aspen",
      startDate: "2023-12-20",
      endDate: "2023-12-27",
      itemCount: 29,
    },
  ]);

  const handleCreateList = (
    newList: Omit<PackingListPreview, "id" | "itemCount">,
  ) => {
    const newId = (packingLists.length + 1).toString();
    setPackingLists([
      ...packingLists,
      {
        ...newList,
        id: newId,
        itemCount: 0,
      },
    ]);
  };

  const filteredLists = packingLists.filter(
    (list) =>
      list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Luggage className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Trip Packer</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New List
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Packing List</DialogTitle>
              </DialogHeader>
              <CreateListForm onSubmit={handleCreateList} />
            </DialogContent>
          </Dialog>
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
        <h2 className="text-2xl font-semibold mb-6">Your Packing Lists</h2>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New List
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Packing List</DialogTitle>
                  </DialogHeader>
                  <CreateListForm onSubmit={handleCreateList} />
                </DialogContent>
              </Dialog>
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Destination:
                      </span>
                      <span className="font-medium">{list.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dates:</span>
                      <span className="font-medium">
                        {formatDate(list.startDate)} -{" "}
                        {formatDate(list.endDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items:</span>
                      <span className="font-medium">{list.itemCount}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View List
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Luggage, Plus, List } from "lucide-react";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [savedLists, setSavedLists] = useState<
    { id: string; title: string; date: string }[]
  >([]);

  // Load saved lists from localStorage
  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem("packingLists") || "[]");
    const formattedLists = lists.map((list: any) => ({
      id: list.id,
      title: list.title,
      date: list.startDate || new Date().toISOString().split("T")[0],
    }));
    setSavedLists(formattedLists);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-background min-h-screen">
      <header className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Luggage className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Travel Packing Checklist
        </h1>
        <p className="text-muted-foreground mt-2">
          Keep track of everything you need for your trips
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New List
            </CardTitle>
            <CardDescription>
              Start a new packing list for your upcoming trip
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Create a customized packing list with categories for all your
              travel needs.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate("/create-list")}>
              Create New List
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              View Saved Lists
            </CardTitle>
            <CardDescription>
              Access your previously created packing lists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              You have {savedLists.length} saved packing lists ready to use.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => navigate("/view-lists")}
            >
              View Lists
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;

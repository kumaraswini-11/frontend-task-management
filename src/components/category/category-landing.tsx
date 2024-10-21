import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCreateCategoryMutation } from "./category-hooks";

export const CategoryLanding = () => {
  const [category, setCategory] = useState<string>("");

  const { mutate: createCategory, status } = useCreateCategoryMutation();
  const isLoading = status == "pending";

  const handleCategoryCreation = () => {
    if (category.trim() === "") return;
    createCategory({ name: category });
    setCategory("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>
          Under this category, you can bind as many tasks as needed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label className="">Category Name</Label>
        <Input
          type="text"
          placeholder="Enter category name"
          value={category}
          // @ts-ignore
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoading}
        />
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-24 bg-amber-500"
          onClick={handleCategoryCreation}
          disabled={isLoading || category.trim() === ""}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

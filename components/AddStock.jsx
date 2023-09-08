"use client";
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
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const AddStock = () => {
  const { data: session } = useSession();

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const addProduct = async (e) => {
    // check if the form is empty
    if (!products?.name || !products?.price || !products?.quantity) {
      toast({
        variant: "destructive",
        description: "Please fill all the fields",
      });
      return;
    }
    e.preventDefault();
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      };
      const addData = {
        ...products,
        owner: session?.user?._id,
      };
      const { data } = await axios.post("/api/product", addData, { headers });
      if (data.error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: data.error,
        });
        return;
      }
      toast({
        variant: "success",
        description: "Product added successfully",
      });
      setProducts({
        name: "",
        price: "",
        quantity: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a stock</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Product name</Label>
              <Input
                id="name"
                onChange={handleChange}
                name="name"
                value={products?.name}
                type="text"
                placeholder="Name of the product"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Product price</Label>
              <Input
                id="price"
                onChange={handleChange}
                name="price"
                value={products?.price}
                type="number"
                placeholder="Product Price"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Product quantity</Label>
              <Input
                id="quantity"
                onChange={handleChange}
                name="quantity"
                value={products?.quantity}
                type="number"
                placeholder="Product Quantity"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={addProduct}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add stock
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddStock;

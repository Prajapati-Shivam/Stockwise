"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

const Modal = ({ selectedProduct }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  if (!selectedProduct) return null;
  const [updatedProduct, setUpdatedProduct] = useState({ ...selectedProduct });

  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updatedProduct.quantity || !updatedProduct.price) {
      toast({
        variant: "destructive",
        description: "Please fill all the fields",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.put("/api/update", updatedProduct, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      if (data.error) {
        toast({
          variant: "destructive",
          description: data.error,
        });
        return;
      }
      toast({
        variant: "success",
        description: "Product updated successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete("/api/delete", {
        data: { id: selectedProduct._id },
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      if (data.error) {
        toast({
          variant: "destructive",
          description: data.error,
        });
        return;
      }
      toast({
        variant: "success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="ml-2 h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedProduct.name.toUpperCase()}</DialogTitle>
          {/* <DialogDescription>{message}</DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              onChange={handleChange}
              value={updatedProduct.quantity || selectedProduct.quantity}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              onChange={handleChange}
              value={updatedProduct.price || selectedProduct.price}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            variant="destructive"
            size="sm"
            disabled={loading}
          >
            Delete
          </Button>
          <Button onClick={handleSubmit} size="sm" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { usePagination } from "@mantine/hooks";
import { useSession } from "next-auth/react";

const ITEMS_PER_PAGE = 5;

const DisplayStock = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleResults, setVisibleResults] = useState(
    products.slice(0, ITEMS_PER_PAGE)
  );
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/api/product",
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
        { owner: session?.user?._id }
      );
      if (data.error) {
        toast({
          variant: "destructive",
          description: data.error,
        });
        return;
      }
      setProducts(data.products);
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

  useEffect(() => {
    if (status !== "loading") {
      getProducts();
    }
  }, [status]);

  useEffect(() => {
    setVisibleResults(products.slice(0, ITEMS_PER_PAGE));
  }, [products]);

  const pagination = usePagination({
    total: Math.ceil(products.length / ITEMS_PER_PAGE),
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      setVisibleResults(products.slice(start, end));
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold my-4">All Stocks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[33%]">Name</TableHead>
            <TableHead className="text-center w-[33%]">Quantity</TableHead>
            <TableHead className="text-right w-[33%]">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            visibleResults.map((product, i) => {
              return (
                <TableRow key={i} className="group">
                  <TableCell className="font-medium flex items-center cursor-pointer">
                    {product.name}
                    <span className="hidden group-hover:flex">
                      <Modal selectedProduct={product} />
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="border px-4 py-2 text-center" colSpan="3">
                {loading ? "Loading..." : "No products found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {products.length > 0 && (
        <div className="mt-4 flex justify-between">
          <Button onClick={pagination.previous} size="sm">
            Previous
          </Button>
          <Button onClick={pagination.next} size="sm">
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default DisplayStock;

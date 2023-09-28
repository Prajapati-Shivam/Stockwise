"use client";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import search from "@/public/assets/search.svg";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useDebouncedValue } from "@mantine/hooks";
import axios from "axios";
import { Loader2 } from "lucide-react";

const SearchStock = () => {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [dropdown, setDropdown] = useState([]);
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 1000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      handleDropdown();
    }
  }, [debounced]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDropdown();
  };

  const handleDropdown = async () => {
    const params = {
      search: debounced,
    };
    try {
      if (debounced.length > 0) {
        setLoading(true);
        const { data } = await axios.get("/api/search", { params });
        if (data.error) {
          toast({
            variant: "destructive",
            description: data.error,
          });
          return;
        }
        setDropdown(data.products);
        setLoading(false);
      } else {
        setDropdown([]);
      }
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

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <main>
        <h2 className="text-2xl font-bold mb-2">Search Stock</h2>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <div className="flex-grow relative">
            <Input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Product Name"
            />
            {loading && (
              <div className="absolute right-0 top-0 mt-3 mr-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
            {dropdown.length > 0 && (
              <div className="absolute w-full mt-1 rounded-lg z-20">
                {dropdown.map((product, index) => {
                  return (
                    <div key={index}>
                      <Table>
                        <TableBody>
                          <TableRow className="group">
                            <TableCell className="relative font-medium flex cursor-pointer">
                              {product.name}
                              <span className="hidden group-hover:flex">
                                <Modal selectedProduct={product} />
                              </span>
                            </TableCell>
                            <TableCell className="w-[33%] text-center">
                              {product.quantity}
                            </TableCell>
                            <TableCell className="text-right w-[33%]">
                              ${product.price}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </form>
      </main>
      {dropdown.length < 1 && (
        <Image
          src={search}
          width={300}
          height={400}
          alt="No result"
          className="mx-auto mt-8"
        />
      )}
    </>
  );
};

export default SearchStock;

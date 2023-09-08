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
    try {
      if (debounced.length > 0) {
        setLoading(true);
        const { data } = await axios.get(`/api/search?query=${debounced}`, {
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
                <svg
                  className="animate-spin h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8"
                  ></path>
                </svg>
              </div>
            )}
            {dropdown.length > 0 && (
              <div className="absolute w-full mt-1 rounded-lg">
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

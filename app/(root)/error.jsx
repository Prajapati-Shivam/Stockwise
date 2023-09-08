"use client";
import Link from "next/link";

const error = ({ error, reset }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold text-center">
          {error.message || "Something went wrong"}
        </h1>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Try again
        </button>
        <Link href="/">
          <a className="text-center">Go back to home</a>
        </Link>
      </div>
    </div>
  );
};

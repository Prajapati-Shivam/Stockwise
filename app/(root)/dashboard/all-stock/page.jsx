import DisplayStock from "@/components/DisplayStock";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-8/12 my-12 p-5 rounded-lg shadow-lg">
            <DisplayStock />
          </div>
        </div>
      </div>
    </>
  );
}

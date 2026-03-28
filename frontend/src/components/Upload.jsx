import React, { useState, useRef, useEffect } from "react"; 
import toast from "react-hot-toast";
import axios from "axios";
import gsap from "gsap";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [fileName, setFileName] = useState("");

  const [printType, setPrintType] = useState("bw");
  const [copies, setCopies] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const boxRef = useRef(null);

  // Calculate price and animate card
  useEffect(() => {
    if (pageCount > 0) {
      const pricePerPage = printType === "bw" ? 2 : 5;
      const total = pageCount * copies * pricePerPage;
      setTotalPrice(total);
    }

    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        {
          scale: 0.7,
          opacity: 0,
          y: 80,
          filter: "blur(10px)",
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [pageCount, printType, copies]);

  const handleUpload = async () => {
     if (!file) {
    toast.error("Please select a PDF file");
    return;
  }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      setPageCount(res.data.pageCount);
      setFileName(res.data.fileName);
      toast.success(`File uploaded: ${res.data.fileName}`);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  const handleOrder = async () => {
    try {
      const orderData = {
        fileName,
        pageCount,
        printType,
        copies,
        totalPrice,
      };

      await axios.post("http://127.0.0.1:5000/api/orders", orderData);

      toast.success("Order placed successfully ✅");

      // Reset after order placed
      setFile(null);
      setFileName("");
      setPageCount(0);
      setCopies(1);
      setTotalPrice(0);
    } catch (err) {
      console.error(err);
       toast.error("Failed to place order ❌");
    }
  };

  const handleBack = () => {
    // Reset to initial upload state
    setFile(null);
    setFileName("");
    setPageCount(0);
    setCopies(1);
    setTotalPrice(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-500 to-indigo-700">
      <div
        ref={boxRef}
        className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-md text-center text-white hover:scale-105 transition-transform duration-300 relative"
      >

        {/* Back Button */}
       {fileName && (
  <button
    onClick={handleBack}
    className="absolute cursor-pointer top-4 left-4 text-blue-700 p-2  transition"
  >
    <AiOutlineArrowLeft size={20} />
  </button>
)}

       <h2 className="text-2xl font-bold mb-6">
  {!fileName ? "Upload PDF" : "Print & Price"}
</h2>

        {/* Show file input only if no file uploaded */}
        {!fileName && (
          <>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4 w-full text-sm file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-white file:text-blue-600
                         hover:file:bg-gray-200"
            />

            <button
              onClick={handleUpload}
              className="mt-2 w-full cursor-pointer bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              Upload
            </button>
          </>
        )}

        {/* Print Options + Price + Place Order */}
        {pageCount > 0 && (
          <div className="mt-10 text-white">

            {/* Print Type */}
            <div className="my-5">
              <label className="block mb-2">Print Type</label>
              <select
                value={printType}
                onChange={(e) => setPrintType(e.target.value)}
                className="w-full p-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 appearance-none"
              >
                <option value="bw">Black & White</option>
                <option value="color">Color</option>
              </select>
            </div>

            {/* Copies */}
           {/* Copies */}
{/* Copies */}
<div className="my-5">
  <label className="block mb-2">Copies</label>
  <input
    type="text"   // changed from number
    value={copies === 0 ? "" : copies}  // show empty if 0
    onChange={(e) => {
      const val = e.target.value;
      // allow only digits
      if (/^\d*$/.test(val)) {
        setCopies(val === "" ? 0 : Number(val));
      }
    }}
    placeholder="Enter number of copies"
    className="w-full p-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
</div>

            {/* Price */}
            <div className="mt-4 bg-white/20 p-3 rounded-lg">
               <p >📄 {fileName}</p>
              <p>Pages: {pageCount}</p>
              <p className="font-medium">Total Price: ₹{totalPrice}</p>
            </div>

            <button
              onClick={handleOrder}
              disabled={!fileName || pageCount === 0}
              className="mt-4 w-full cursor-pointer bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Place Order
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Upload;
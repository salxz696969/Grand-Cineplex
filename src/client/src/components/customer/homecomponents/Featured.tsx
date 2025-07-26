import React, { useEffect, useState } from "react";
import { featuredHalls } from "../../../utils/Featured";

const pics = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2luZW1hfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1458053688450-eef5d21d43b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNpbmVtYXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vdmllfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1563381013529-1c922c80ac8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW92aWUlMjB0aGVhdGVyfGVufDB8MHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1620177088260-a9150572baf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1vdmllJTIwdGhlYXRlcnxlbnwwfDB8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1617914309185-9e63b3badfca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fG1vdmllJTIwdGhlYXRlcnxlbnwwfDB8MHx8fDA%3D",
  "https://external-preview.redd.it/2nViidY6n0gg2T5WVYtJR9tVMM69F-ZGNE_0cdeQFzs.jpg?auto=webp&s=01d970bf000fe8e03825dca7d2e415598ae17a06",
  "https://anniehaydesign.weebly.com/uploads/9/5/4/6/95469676/landscape-poster-3_orig.jpg"
]

export default function Featured() {
  const totalSlides = pics.length;
  const [index, setIndex] = useState(0);


  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative w-full h-[250px] lg:h-[400px] mt-10 rounded-2xl bg-gray-950 overflow-hidden flex justify-center items-center">
      {/* Background image for showing and pop up with breath style */}
      {pics.map((pic, i) => (
        <img key={i} src={pic} alt={`Hall ${i + 1}`} loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-[1500ms] ease-in-out
            ${i === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ transitionProperty: "opacity" }}
        />
      ))}
      {/* Dots in the background to navigate */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {featuredHalls.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === index ? "bg-blue-800" : "bg-blue-400 hover:bg-blue-800"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
}

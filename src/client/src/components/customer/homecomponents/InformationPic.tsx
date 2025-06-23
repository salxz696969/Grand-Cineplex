
// This components is used to show user the discount, top rate movie, information about the website...
// But now we do not have much of image, so just use this one to mock it.


import { useEffect, useState } from "react";

export default function InfoInform() {

  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % Info.length);
  //   }, 3000);
  //
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[460px] overflow-hidden mt-10 rounded-2xl relative">
      <div className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {/*{Info.map((item, idx) => (*/}
          <img
              // key={idx}
               src={"../../../assets/Poster/pic15.jpg"} alt={`info`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        {/*))}*/}
      </div>
    </div>
  );
}




"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Blog {
  title: string;
  description: string;
  image: string;
  content: string;
}

const Politics: React.FC = () => {
  const [info, setInfo] = useState<Blog[]>([]); // changed to Blog[] for array
  const [selectedInfo, setSelectedInfo] = useState<Blog | null>(null); // changed to Blog | null
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=59a1033bb71ae9522fc56d40af3ed426"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setInfo(data.articles);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function handleClick(news: Blog) {
    setSelectedInfo(news);
  }
  function handleBack() {
    // corrected function name to handleBack
    setSelectedInfo(null); // set selectedInfo back to null
  }

  if (isLoading) {
    return <p className="text-2xl text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-2xl text-center">Failed to fetch data</p>;
  }

  return (
    // {news details}
    <div className="max-w-[1440px] px-6 py-3">
      {!selectedInfo && (
        <div className="w-full h-full grid md:grid-cols-2  lg:grid-cols-3 gap-4 ">
          {info.map((news, index) => (
            <div key={index} onClick={() => handleClick(news)}>
              <div className="max-w-[500px]">
                <div className="w-full h-[200px] relative">
                  <Image
                    src={news.image} // corrected to urlToImage
                    alt={news.title}
                    layout="fill"
                  />
                </div>
                <h1>{news.title}</h1>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {newsdetails when click} */}
      {selectedInfo && (
        <div className=" ">
          <div>
            <div className="w-full h-[300px] relative mt-2">
              <Image
                src={selectedInfo.image} // corrected to urlToImage
                alt={selectedInfo.title}
                layout="fill"
                objectFit="fit" // corrected to objectFit
              />
            </div>
            <h2 className="font-bold pt-2">{selectedInfo.title}</h2>
            <p className="">{selectedInfo.description}</p>
            <p className="">{selectedInfo.content}</p>
          </div>
          <button
            onClick={handleBack} // corrected function name
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Politics;

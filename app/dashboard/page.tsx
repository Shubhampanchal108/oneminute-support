"use client";

import InitialForm from "@/components/dashboard/InitialForm";
import { useEffect, useState } from "react";

const page = () => {
  const [isMetaDataAvalible, setIsMetadataAvalible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await fetch("/api/metadata/fetch");
      const data = await response.json();
      setIsMetadataAvalible(data.exists);
      setIsLoading(false);
    };

    fetchMetadata();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex w-full items-center justify-center p-4" />
    );
  }

  return (
    <div className="flex-1 flex w-full">
      {!isMetaDataAvalible ? (
        <div className="w-full flex items-center justify-center p-4">
          <InitialForm />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default page;

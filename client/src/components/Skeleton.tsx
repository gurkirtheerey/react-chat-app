import React from "react";

interface SkeletonProps {
  header: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ header }) => {
  return (
    <>
      <h1 className="text-center text-lg font-bold p-4 mt-4">{header}</h1>
      <div className=" shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-white h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-white rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white rounded"></div>
              <div className="h-4 bg-white rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className=" shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-white h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-white rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white rounded"></div>
              <div className="h-4 bg-white rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className=" shadow rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-white h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-white rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white rounded"></div>
              <div className="h-4 bg-white rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

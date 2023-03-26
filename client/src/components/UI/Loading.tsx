import React from "react";

interface Props {
  message?: string;
}

const Loading: React.FC<Props> = ({ message = "Loading..." }) => {
  return (
    <div className="flex-container">
      <div className="text-center">
        <svg
          className="animate-spin h-8 w-8 mx-auto mb-4 text-green-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="#13ce66"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="#13ce66"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-5.291a7.962 7.962 0 01-2 5.291l3 2.647A8.01 8.01 0 0120 12h-4zm-6-3.235a5.965 5.965 0 011.5-2.324l-1.5-2.598-1.5 2.598a5.965 5.965 0 011.5 2.324zM12 20a7.963 7.963 0 01-5.938-2.647l-3 2.647A8.01 8.01 0 0012 24v-4zm5.938-7.353a5.965 5.965 0 01-1.5 2.324l1.5 2.598 1.5-2.598a5.965 5.965 0 01-1.5-2.324z"
          />
        </svg>
        <p style={{ color: "#13ce66" }}>{message}</p>
      </div>
    </div>
  );
};

export default Loading;

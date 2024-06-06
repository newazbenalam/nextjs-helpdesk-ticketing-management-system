import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="spinner-border spinner-border-sm text-primary text-center" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

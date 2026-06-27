"use client";

import React from "react";

export default function BinaryHeading({ text, className, style }) {
  return (
    <h2 className={className} style={style}>
      {text}
    </h2>
  );
}

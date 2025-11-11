import React from "react";

export const Title = (
  <svg viewBox="0 0 1024 1024">
    {/* 左侧垂直线条 - 更细的线条，使用填充 */}
    <path d="M170 64 h12 v1000 h-12 z" fill="#999"></path>

    {/* 右侧垂直线条 - 更细的线条，使用填充 */}
    <path d="M846 64 h12 v1000 h-12 z" fill="#999"></path>

    {/* 横向线条 - 使用不同颜色和更细的高度 */}
    {/* <path
      d="M178 128 h668 v4 h-668 z"
      fill="#4A90E2"
    ></path>
    <path
      d="M178 256 h668 v4 h-668 z"
      fill="#4A90E2"
    ></path>
    <path
      d="M178 384 h668 v4 h-668 z"
      fill="#4A90E2"
    ></path> */}
    <path
      d="M178 512 h668 v8 h-668 z"
      fill="var(--dn-brand-color)"
    ></path>
    {/* <path
      d="M178 640 h668 v4 h-668 z"
      fill="#4A90E2"
    ></path>
    <path
      d="M178 768 h668 v4 h-668 z"
      fill="#4A90E2"
    ></path>
    <path
      d="M178 896 h668 v4 h-668 z"
      fill="#4A90E2"
    ></path> */}
  </svg>
);

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function TextArea({
  value,
  onChange,
  placeholder,
  className = "",
  minHeight = 100,
  maxHeight = 300,
  ...props
}) {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
      const scrollHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "w-full resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)] focus:border-transparent rounded-md border border-gray-300 p-4 transition-all duration-200",
        className
      )}
      style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
      {...props}
    />
  );
}

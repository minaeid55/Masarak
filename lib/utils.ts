import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ToastOptions = {
  duration?: number; // ms
  type?: "success" | "error" | "info";
};

export function showToast(message: string, options: ToastOptions = {}) {
  const duration = options.duration ?? 3000;
  const type = options.type ?? "info";

  const containerId = "__masarak_toast_container";
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.position = "fixed";
    container.style.top = "16px";
    container.style.right = "16px";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  const el = document.createElement("div");
  el.textContent = message;
  el.style.marginTop = "8px";
  el.style.padding = "10px 14px";
  el.style.borderRadius = "12px";
  el.style.color = "white";
  el.style.fontSize = "14px";
  el.style.boxShadow = "0 6px 18px rgba(0,0,0,0.3)";
  el.style.opacity = "0";
  el.style.transition = "opacity 180ms, transform 200ms";

  if (type === "success") {
    el.style.background = "linear-gradient(90deg,#10b981,#06b6d4)";
  } else if (type === "error") {
    el.style.background = "linear-gradient(90deg,#ef4444,#f97316)";
  } else {
    el.style.background = "rgba(31,41,55,0.9)";
  }

  container.appendChild(el);

  // animate in
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  const hide = () => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-8px)";
    setTimeout(() => {
      try {
        container?.removeChild(el);
      } catch {}
      if (container && container.childElementCount === 0) {
        try {
          container.parentElement?.removeChild(container);
        } catch {}
      }
    }, 220);
  };

  const t = setTimeout(hide, duration);

  el.addEventListener("click", () => {
    clearTimeout(t);
    hide();
  });

  return { hide };
}

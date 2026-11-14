import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { logEvent } from "@/lib/repository";

let lastLoggedKey: string | null = null;

/** 画面遷移のたびに page_view を記録し、スクロール位置を先頭に戻す */
export function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (lastLoggedKey === location.key) return;
    lastLoggedKey = location.key;
    void logEvent("page_view");
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.key, location.hash]);

  return null;
}

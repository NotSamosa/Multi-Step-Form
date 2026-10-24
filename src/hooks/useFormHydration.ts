"use client";

import { useEffect, useState } from "react";
import { useFormStore } from "@/store/useFormStore";

export function useFormHydration() {
  const [hydrated, setHydrated] = useState(false);
  const storeHydrated = useFormStore((state) => state._hasHydrated);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated || storeHydrated;
}

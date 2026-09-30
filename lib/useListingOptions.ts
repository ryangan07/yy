import { useCallback, useEffect, useState } from "react";
import { arrayUnion, doc, getDocFromServer, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DEFAULT_OPTIONS, OPTION_FIELDS, type ListingOptions, type OptionField } from "@/lib/listings";

const optionsRef = () => doc(db, "settings", "listingOptions");

export function useListingOptions() {
  const [options, setOptions] = useState<ListingOptions>(DEFAULT_OPTIONS);

  useEffect(() => {
    getDocFromServer(optionsRef())
      .then((snap) => {
        const custom = (snap.data() ?? {}) as Partial<ListingOptions>;
        setOptions(
          Object.fromEntries(
            OPTION_FIELDS.map((f) => [f, Array.from(new Set([...DEFAULT_OPTIONS[f], ...(custom[f] ?? [])]))])
          ) as ListingOptions
        );
      })
      .catch(() => {});
  }, []);

  const addOption = useCallback(async (field: OptionField, value: string) => {
    const v = value.trim();
    if (!v) return;
    setOptions((prev) => (prev[field].includes(v) ? prev : { ...prev, [field]: [...prev[field], v] }));
    await setDoc(optionsRef(), { [field]: arrayUnion(v) }, { merge: true });
  }, []);

  return { options, addOption };
}

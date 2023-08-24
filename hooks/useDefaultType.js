import { useEffect } from "react";
import { useRouter } from "next/router";

export const useDefaultType = () => {
  const router = useRouter();
  const { type } = router.query;

  useEffect(() => {
    if (router.isReady && !type) {
      router.query.type = "structure";
      router.push({ pathname: router.pathname, query: router.query });
    }
  }, [router.isReady]);
};

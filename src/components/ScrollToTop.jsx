// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// ScrollToTop.jsx এ এটা আছে কিনা দেখো
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ window scroll reset করো
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
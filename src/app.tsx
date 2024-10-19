import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import { Loader } from "@/components/loader";
// @ts-expect-error: This error is expected because react-router-dom doesn't support TypeScript.
import { routes } from "@/routes/router";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;

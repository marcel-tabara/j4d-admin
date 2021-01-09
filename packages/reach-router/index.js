import Loading from "@j4d-admin/layouts/screens/Loading"
import { Router } from "@reach/router"
import React, { Suspense } from "react"

const Home = React.lazy(() => import("@j4d-admin/layouts/screens/Home"))

const routes = (
  <div>
    <Suspense fallback={<Loading />}>
      <Router>
        <Home path="/" />
      </Router>
    </Suspense>
  </div>
)

export default routes

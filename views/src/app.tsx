import React from "react";
import "./app.scss";
import { Layout } from "components/layout/layout";
import { Study } from "pages/study/study";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <main>
        <Layout>
          <Study />
        </Layout>
      </main>
    </SnackbarProvider>
  );
}
export default App;

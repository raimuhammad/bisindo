import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Layout } from "components/layout";
import { Study } from "./pages/study/study";
import { ImageQuizContainer } from "./components/quiz/image-quiz";

const ShowQuiz = () => {
  return <ImageQuizContainer />;
};

const App = () => {
  const [shouldRender, setShouldRender] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log(gapi);
    const meta = document
      .getElementsByName("gapikey")[0]
      .getAttribute("content");
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: meta as string,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
          ],
        })
        .then(() => {
          setShouldRender(true);
        })
        .catch((error) => {
          console.log(error);
          alert("Error loading api");
        });
    });
  }, []);

  return shouldRender ? <Study /> : null;
};

const root = document.querySelector("#app");
const showQuiz = false;
if (root) {
  render(
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <BrowserRouter>
        <Layout>{showQuiz ? <ShowQuiz /> : <App />}</Layout>
      </BrowserRouter>
    </SnackbarProvider>,
    root
  );
}

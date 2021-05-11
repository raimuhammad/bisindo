import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { observer } from "mobx-react";

import { AddVideoPage } from "pages/add-video-page";
import { LoginPage } from "pages/login-page";
import { ListVideoPage } from "pages/list-video-page";
import { DashboardPage } from "pages/dashboard";
import { VideoQuizListPage } from "pages/video-quiz-list-page";
import { EditVideoPage } from "pages/edit-video-page";
import { StudentListPage } from "pages/student-list-page";
import { EditAccountPage, ConfirmAccountPage } from "pages/account-pages";
import { RegisterPage } from "pages/register-page";
import { useApp } from "providers/app-provider";
import { PageRoute } from "components/page-route";
import { GradeShow, GradeList } from "pages/grade";
import { Study } from "pages/study/study";

const Dashboard = observer(() => {
  const app = useApp();
  return (
    <>
      {app.user ? (
        <DashboardPage />
      ) : (
        <Redirect to="/login" from="/dashboard" />
      )}
    </>
  );
});

const Root = observer(() => {
  const app = useApp();
  return <Redirect to={app.user ? "/dashboard" : "/sign-in"} />;
});

const AdminRoute = () => {
  return (
    <>
      <PageRoute path="/grade/:id" component={GradeShow} />
      <PageRoute path="/grades" component={GradeList} />
      <PageRoute path="/video/:video_id/quiz" component={VideoQuizListPage} />
      <PageRoute path="/video/:video_id/edit" component={EditVideoPage} />
      <PageRoute path="/video/new" component={AddVideoPage} />
      <PageRoute path="/video" component={ListVideoPage} />
      <PageRoute path="/account/edit" component={EditAccountPage} />
      <PageRoute path="/account/:token" component={ConfirmAccountPage} />
      <PageRoute path="/students" component={StudentListPage} />;
      <PageRoute disableAuth path="/sign-in" component={LoginPage} />
      <PageRoute disableAuth path="/sign-up" component={RegisterPage} />
      <PageRoute path="/dashboard" component={Dashboard} />
    </>
  );
};

const StudentRoute = () => {
  return (
    <>
      <PageRoute path="/dashboard" component={Study} />
    </>
  );
};

export const Routing = observer(() => {
  const app = useApp();
  const isAdmin = app.user?.role === "ADMIN";
  const isStudent = app.user?.role === "STUDENT";
  return (
    <Route
      render={({ location }) => (
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch key={location.pathname} location={location}>
            {isAdmin ? <AdminRoute /> : null}
            {isStudent ? <StudentRoute /> : null}
            <PageRoute disableAuth path="/" component={Root} />
          </Switch>
        </AnimatePresence>
      )}
    />
  );
});

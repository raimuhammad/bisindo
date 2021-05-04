import React from "react";
import { useApp } from "providers/app-provider";
import { formWrapper, WrapperProps } from "components/form-wrapper";
import { Container } from "@material-ui/core";
import { useClasses } from "./styles";
import { WelcomeText } from "./welcome-text";
import { FieldContainer } from "./field-container";
import { loginForm } from "./form-options";
import { useNavigate } from "hooks/use-navigate";

const Component = ({ instance }: WrapperProps<boolean, any>) => {
  const { loading, handler, result } = instance;
  const { recheckAuth, user } = useApp();
  const classes = useClasses();
  const { navigate } = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  React.useEffect(() => {
    if (result) {
      recheckAuth();
    }
  }, [result]);

  return (
    <div>
      <Container className={classes.root}>
        <div>
          <WelcomeText />
          <FieldContainer loading={loading} onSubmit={handler} />
        </div>
      </Container>
    </div>
  );
};

export const Page = formWrapper<boolean>(Component, loginForm);

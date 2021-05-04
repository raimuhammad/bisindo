import React from "react";

export type CustomButtonOpt = {
  onClick(): void;
  label: string;
  icon: React.ReactNode;
};

export type Props = {
  pageTitle: string;
  backPath?: string;
  customButton?: CustomButtonOpt | React.ReactNode;
};

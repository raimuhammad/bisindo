import { AnySchema, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const resolverFactory = (obj: Record<string, AnySchema>) =>
  yupResolver(object().shape(obj));

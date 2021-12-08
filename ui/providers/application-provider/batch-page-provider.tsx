import { useLocation, useParams } from "react-router-dom";
import { useBatchShowProvider, Context } from "@pages/admin/batch.show/context";
import { Routes } from 'react-router-dom'

const Wrap = ( ({ children, ...rest }: any) => {
  const params = useParams();
  console.log(
    rest, params
  )
  const location = useLocation()
  const ctx = useBatchShowProvider(params);
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
});

export const BatchPageProvider = ({ children, ...rest }: any) => {
  const { pathname } = useLocation();
  const first = pathname.trim().split("/").filter(Boolean)[0];
  let isBatchPage = false;
  if (first) {
    isBatchPage = first === "batch";
  }
  return first ? <Wrap/> : <>{children}</>;
};

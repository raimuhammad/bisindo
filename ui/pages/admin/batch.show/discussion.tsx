import { DiscussionContainer } from "@components/discussion/discussion-container";
import { useBatchShow } from "./context";
import { PaginatorProvider } from "@providers/model-provider/paginators";

export const Discussion = () => {
  const { modelId } = useBatchShow();

  return <DiscussionContainer gradeId={modelId} />;
};

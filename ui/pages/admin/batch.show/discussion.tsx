import { DiscussionContainer } from "@components/discussion/discussion-container";
import { useBatchShow } from "./context";
import { WithBatchShow } from "@admin-pages/batch.show/with-batch-show";

export const Discussion = WithBatchShow(() => {
  const { modelId } = useBatchShow();

  return <DiscussionContainer gradeId={modelId} />;
});

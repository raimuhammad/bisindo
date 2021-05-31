import { useFetchQuery } from "@hooks/use-fetch-query";
import { QuizModelSelector, QuizModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";

export function useQuizList(gradeId: string): Array<QuizModelType> {
  const [items, { fetch }] = useFetchQuery<QuizModelType[]>({
    queryKey: RootStoreBaseQueries.queryGradeQuizes,
    builder(instance: QuizModelSelector): QuizModelSelector {
      return instance.id.image_matcher.type.type.additional_image.question.show_at.video_id.choises(
        (i) => i.id.image.text.index
      );
    },
  });

  useEffect(() => {
    if (gradeId) {
      fetch({ gradeId });
    }
  }, [gradeId]);

  return items ? items : [];
}

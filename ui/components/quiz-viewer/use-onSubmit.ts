import { useToggle } from "@hooks/use-toggle";

type Option = {
  isCorrect: boolean;
  onSubmit?(v: boolean): Promise<void>;
  onSuccess(): void;
};

export function useOnSubmit({ isCorrect, onSuccess, onSubmit }: Option) {
  const [loading, { inline }] = useToggle();
  const [submitted, { inline: inlineSubmitted }] = useToggle();
  const onSubmitHandler = () => {
    if (onSubmit) {
      inline(true);
      onSubmit(isCorrect).then(() => {
        onSuccess();
        inlineSubmitted(true);
        inline(false);
      });
    } else {
      onSuccess();
      inlineSubmitted(true);
    }
  };
  return {
    loading,
    onSubmitHandler,
    submitted,
  };
}

import { useBatchShow } from "./context";
import { useIsSm } from "@hooks/use-media";
import { PageControl as ControlComponent } from "@components/admin-page-control";
export const PageControl = () => {
  const [{ page: value }, change] = useBatchShow().pageControll;
  const isSm = useIsSm();
  return (
    <>
      <ControlComponent
        change={change}
        value={value}
        items={[
          {
            label: "Video",
            value: "VIDEOS",
          },
          {
            label: "Tambah video",
            value: "ADD-VIDEO",
          },
          {
            label: "Siswa",
            value: "STUDENTS",
          },
          {
            label: "Periksa kuis",
            value: "QUIZ-CHECK",
          },
          {
            label: "Diskusi",
            value: "DISCUSSION",
          },
        ]}
      />
    </>
  );
};

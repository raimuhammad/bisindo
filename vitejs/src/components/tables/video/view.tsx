import * as React from "react";
import { VideoModelType } from "root/models/stores";
import { Player } from "components/player";
import { useToggle } from "hooks/use-toggle";

type Props = {
  model: VideoModelType;
};
export const View = ({ model }: Props) => {
  const [play, { force }] = useToggle();

  return (
    <div>
      <Player
        url={model.content as string}
        onContainerClick={force(true)}
        play={play}
        enableFullScreen
      />
    </div>
  );
};

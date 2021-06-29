import * as React from "react";
import { useStudent } from "@providers/student-app-provider";
import { VideoSwitcher } from "../study-show/video-switcher";

export const VideoContainer = () => {
  const { videos } = useStudent();
  return (
    <div>
      <VideoSwitcher />
    </div>
  );
};

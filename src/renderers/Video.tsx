import * as React from "react";
import Spinner from "../components/Spinner";
import { Renderer, Tester } from "./../interfaces";
import WithHeader from "./wrappers/withHeader";
import WithSeeMore from "./wrappers/withSeeMore";
import ReactPlayer from "react-player";

export const renderer: Renderer = ({
  story,
  action,
  isPaused,
  config,
  messageHandler,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [pause, setPause] = React.useState(false);
  const [muted, setMuted] = React.useState(true);
  const { width, height, loader, storyStyles } = config;

  let computedStyles = {
    ...styles.storyContent,
    ...(storyStyles || {}),
  };

  React.useEffect(() => {
    if (loaded) {
      if (isPaused) {
        setPause(true);
      } else {
        setPause(false);
      }
      setMuted(false);
    }
  }, [isPaused]);

  const onWaiting = () => {
    action("pause", true);
  };

  const onPlaying = () => {};

  const videoLoaded = () => {
    // vid.current
    //   .play()
    //   .then(() => {
    //     action("play");
    //   })
    //   .catch(() => {
    //     setMuted(true);
    //     vid.current.play().finally(() => {
    //       action("play");
    //     });
    //   });
  };

  const videoDuration = (n: number) => {
    messageHandler("UPDATE_VIDEO_DURATION", { duration: n });
    setLoaded(true);
    action("play");
    action("play", true);
  };

  return (
    <WithHeader {...{ story, globalHeader: config.header }}>
      <WithSeeMore {...{ story, action }}>
        <div style={styles.videoContainer}>
          <ReactPlayer
            style={computedStyles}
            width={"100%"}
            height={"100%"}
            url={story.url}
            playsInline
            webkit-playsinline="true"
            playsinline={true}
            controls={false}
            playing={!pause}
            muted={muted}
            onPlay={onPlaying}
            onPause={onWaiting}
            onDuration={videoDuration}
          />
          {!loaded && (
            <div
              style={{
                width: width,
                height: height,
                position: "absolute",
                left: 0,
                top: 0,
                background: "rgba(0, 0, 0, 0.9)",
                zIndex: 9,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ccc",
              }}
            >
              {loader || <Spinner />}
            </div>
          )}
        </div>
      </WithSeeMore>
    </WithHeader>
  );
};

const styles = {
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
  videoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const tester: Tester = (story) => {
  return {
    condition: story.type === "video",
    priority: 2,
  };
};

export default {
  renderer,
  tester,
};

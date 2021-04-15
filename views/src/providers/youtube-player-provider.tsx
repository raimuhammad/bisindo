import * as React from "react";

type State = {
  loading: boolean;
  video: null | gapi.client.youtube.Video;
};

type YTPlayerProvider = {
  video: State["video"];
  loading: boolean;
  loadVideo(videoId: string): void;
};

const Context = React.createContext<null | YTPlayerProvider>(null);

export function useYoutubePlayer(): YTPlayerProvider {
  return React.useContext(Context) as YTPlayerProvider;
}

export class YoutubePlayerProvider extends React.Component<any, State> {
  client: typeof gapi.client.youtube;

  constructor(props: any) {
    super(props);
    this.client = gapi.client.youtube;
    this.state = {
      loading: false,
      video: null,
    };
  }

  loadVideoInfo = (id: string) => {
    this.setState({ loading: true });
    this.client.videos.list(this.getRequestArguments(id)).then(({ result }) => {
      if (result.items?.length) {
        this.setState({
          video: result.items[0],
        });
      }
    });
  };
  getRequestArguments = (id: string) => ({
    part: ["snippet,contentDetails,statistics"],
    id: [id],
  });

  getValue = (): YTPlayerProvider => ({
    loadVideo: this.loadVideoInfo,
    ...this.state,
  });

  render() {
    return (
      <Context.Provider value={this.getValue()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

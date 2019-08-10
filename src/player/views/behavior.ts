import { StackActions } from "react-navigation";
import * as reactActions from "../actions";
import { findNextEpisode, findEpisode } from "../../show-utils";

const NEXT_EPISODE_POPUP_STOPWATCH = 30
const BUFFER_MS = 5000;

// TODO: Add logic to switch to alternative source if buffering excessively

const setEpisodeWatched = function(watched) {
    const { showId, seasonId, episodeId } = this.props;
    (async () => {
        await global
            .__provider()
            .getSettings()
            .setEpisodeWatched({
                showId,
                seasonId,
                episodeId,
                finishedWatching: watched
            });
    })();
};

const playNextEpisode = function() {
    const {
        showId,
        seasonId,
        episodeId,
        fetchNextEpisode,
        shows: { showData },
        navigation
    } = this.props;

    const { episode: nextEpisode, season: nextSeason } = findNextEpisode({
        seasonId,
        episodeId,
        show: showData
    });

    if (nextEpisode && nextSeason) {
        fetchNextEpisode({ showId, seasonId, episodeId });
    } else {
        navigation.dispatch(
            StackActions.pop({
                n: 1
            })
        );
    }
};

export const onLoadStart = function() {
    const [_, dispatch] = this.context;
    dispatch(reactActions.setBufferedCount(0));
    dispatch(reactActions.setVideoLoading());
}

export const onLoad = function({ duration, naturalSize }) {
    const {
        seasonId,
        episodeId,
        shows: { showData },
        source = { name: 'RapidShare' },
        popoverRef
    } = this.props;
    const [_, dispatch] = this.context;

    dispatch(reactActions.setVideoLoaded());
    const episode = findEpisode({
        seasonId,
        episodeId,
        show: showData
      });
      
    dispatch(reactActions.setVideoFinished(false));
    dispatch(reactActions.setVideoInfo({ duration, naturalSize }));
    setEpisodeWatched.call(this, false);
    popoverRef.current.displayPopup(
        {
            lowerPopup: {
                videoInfo: `${source.name} - ${naturalSize.height}p`
            },
            episodePopup: {
                episode
            }
        },
        true,
        5000
    );
};

export const onProgress = function(progress: any) {
    const [state, dispatch] = this.context;
    const {
        video: { duration, bufferedCount }
    } = state;
    const { updatedWatchingStatus, nextEpisodePoppedUp } = this.state;
    const {
        seasonId,
        episodeId,
        shows: { showData },
        popoverRef
    } = this.props;

    if (!progress.playableDuration) {
        dispatch(reactActions.setBufferedCount(bufferedCount + 1));
        console.log(bufferedCount + 1);
    }
    dispatch(reactActions.setTimeProgress(progress.currentTime));
    if (
        progress.currentTime / duration >= 0.8 &&
        !updatedWatchingStatus
    ) {
        setEpisodeWatched.call(this, true);
        this.setState({ updatedWatchingStatus: true });
    }
    if (duration - progress.currentTime <= NEXT_EPISODE_POPUP_STOPWATCH && !nextEpisodePoppedUp) {
        const { episode: nextEpisode } = findNextEpisode({
            seasonId,
            episodeId,
            show: showData
        }) || { episode: undefined };
        if (nextEpisode) {
            popoverRef.current.displayPopup(
                {
                    episodePopup: {
                        episode: nextEpisode,
                        topText: "Next up...",
                        showTimeLeft: true
                    }
                },
                false
            );
        }
        this.setState({ nextEpisodePoppedUp: true });
    } else if (
        duration - progress.currentTime > NEXT_EPISODE_POPUP_STOPWATCH &&
        nextEpisodePoppedUp
    ) {
        popoverRef.current.dismissPopup();
        this.setState({ nextEpisodePoppedUp: false });
    }
};

export const onEnd = function() {
    const [_, dispatch] = this.context;
    const {
        popoverRef
    } = this.props;

    dispatch(reactActions.setVideoFinished(true));
    popoverRef.current.dismissPopup();
    playNextEpisode.call(this);
};

export const bufferConfig = {
    bufferForPlaybackMs: BUFFER_MS
};
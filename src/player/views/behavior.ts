import { StackActions } from "react-navigation";
import { throttle } from 'lodash';
import * as reactActions from "../actions";
import { findNextEpisode, findEpisode } from "../../show-utils";

const NEXT_EPISODE_POPUP_STOPWATCH = 30;
const BUFFER_MS = 5000;
const COMPLETION_THRESHOLD = 0.8;
const STORE_POSITION_THRESHOLD = 10;
/*
 * If the buffer takes longer than we've got for video to watch,
 * then the video is stalled (bad source or bad internet)
 * 250ms is added in the odd event that the video buffer is just barely keeping
 * up and it is watchable without being stalled.
 */
const STALLED_MS = BUFFER_MS + 250;

// TODO: Add logic to check that an alternative source exists before requesting a new one

const updateEpisodeCurrentPosition = throttle(function (currentPosition) {
    const { showId, seasonId, episodeId } = this.props;
    (async () => {
        await global
            .__provider()
            .getSettings()
            .setEpisodeCurrentPosition({
                showId,
                seasonId,
                episodeId,
                currentPosition
            });
    })();
}, 1000);

const setEpisodeWatched = function (watched) {
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

const playNextEpisode = function () {
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

export const onLoadStart = function () {
    const [_, dispatch] = this.context;
    dispatch(reactActions.setVideoLoading());
};

export const onLoad = function ({ duration, naturalSize }) {
    const {
        seasonId,
        episodeId,
        shows: { showData },
        source = { name: "RapidShare" },
        popoverRef,
        navigation,
        innerRef
    } = this.props;
    const [_, dispatch] = this.context;
    const currentPosition = navigation.getParam("currentPosition", 0);
    innerRef.current.seek(currentPosition * duration);
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

export const onProgress = function (progress: any) {
    const [state, dispatch] = this.context;
    const {
        video: { duration }
    } = state;
    const { updatedWatchingStatus, nextEpisodePoppedUp } = this.state;
    const {
        seasonId,
        episodeId,
        shows: { showData },
        popoverRef
    } = this.props;

    dispatch(reactActions.setTimeProgress(progress.currentTime));
    if (progress.currentTime / duration >= COMPLETION_THRESHOLD && !updatedWatchingStatus) {
        setEpisodeWatched.call(this, true);
        updateEpisodeCurrentPosition.call(this, 0);
        this.setState({ updatedWatchingStatus: true });
    } else if (progress.currentTime > STORE_POSITION_THRESHOLD) {
        updateEpisodeCurrentPosition.call(this, progress.currentTime / duration);
    }
    if (
        duration - progress.currentTime <= NEXT_EPISODE_POPUP_STOPWATCH &&
        !nextEpisodePoppedUp
    ) {
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

export const onEnd = function () {
    const [_, dispatch] = this.context;
    const { popoverRef } = this.props;

    dispatch(reactActions.setVideoFinished(true));
    popoverRef.current.dismissPopup();
    playNextEpisode.call(this);
};

const stalledAction = function () {
    const [state] = this.context;
    const {
        video: { progress, duration }
    } = state;
    const { fetchSourceData, showId, seasonId, episodeId, source } = this.props;
    fetchSourceData({ showId, seasonId, episodeId, currentPosition: progress / duration, stalledSourceId: source.id });
    console.log("fuckin stalled bro");
};

export const onBuffer = function ({ isBuffering }) {
    if (isBuffering && !this.stalledTimer) {
        this.stalledTimer = setTimeout(stalledAction.bind(this), STALLED_MS);
    } else {
        this.stalledTimer = clearTimeout(this.stalledTimer);
    }
};

export const bufferConfig = {
    bufferForPlaybackMs: BUFFER_MS
};

import React, { Component } from "react";
import * as actions from "../../redux-store/actions";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { FirestickKeys } from "../../components";
import { StateContext } from "../context";
import { Episode, Source, Show } from "../../types";
import { PlayerPopover } from "../views";
import * as behavior from './behavior';
import {mapValues} from 'lodash';

interface Props {
  popoverRef: React.RefObject<PlayerPopover>;
  episodeId: any;
  seasonId: any;
  episode: Episode;
  source: Source;
  playerRef: any;
  shows?: {
    isFetching: boolean;
    showData: Show;
    data: Show [];
  };
}

class RemoteInput extends Component<Props> {
  static contextType = StateContext;

  render() {
    return (
      <FirestickKeys
        keyPressTimeOut={250}
        {...mapValues(behavior, fn => fn.bind(this))}
      />
    );
  }
}

const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = state => ({
  shows: state.shows,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteInput);
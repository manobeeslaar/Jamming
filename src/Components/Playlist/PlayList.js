import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends Component {
  constructor(props) {
    super(props);

    //this functionality
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  //name of playlist handle event
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className = "Playlist">
        <input defaultValue = {'New Playlist'}
                onChange = {this.handleNameChange}/>
          <TrackList tracks = {this.props.playlistTracks}
                      isRemoval = {true}
                      onRemove = {this.props.onRemove}
                      />
          <a className = "Playlist-save" onClick = {this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default PlayList;

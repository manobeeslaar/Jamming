import React, { Component } from 'react';
import './Track.css';


class Track extends Component {
  constructor(props) {
    super(props);

    //This functionality
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

    }

    //addTrack event
    addTrack(event) {
    this.props.onAdd(this.props.track);
    }

    //remove track event
    removeTrack(event) {
    this.props.onRemove(this.props.track);
    }

    //Rendering action for + track and - track with click
    renderAction() {
      if (this.props.isRemoval) {
        return <a className= "Track-action" onClick={this.removeTrack}>-</a>
      }
      return <a className= "Track-action" onClick={this.addTrack}>+</a>;
    }

  //render method
  render() {
    return (
      <div className = "Track">
        <div className = "Track-information">
        <img src = {this.props.track.art} alt = {this.props.track.album}/>
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
          {this.renderAction()}
      </div>
    )
  }
}

export default Track;

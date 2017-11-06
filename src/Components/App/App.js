import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/PlayList';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    searchResults: [],
    playlistName: 'New Playlist',
    playlistTracks: [],
    trackDetails:{
      trackArtist: '',
      trackName: '',
      albumName: '',
      albumArt: '',
      preview: ''
    }
  };

    //This functionality
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

  }

    //Add a track to PLAYLIST
    addTrack(track) {
      let tracks = this.state.playlistTracks;
      tracks.push(track);

      this.setState({playListTracks: tracks});
    }

    //Remove track from PLAYLIST
    removeTrack(track) {
      let tracks = this.state.playlistTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

      this.setState({playlistTracks: tracks});
    }

    //Updating the name of a playlist
    updatePlaylistName(name) {
      this.setState({playlistName: name});
    }

    //saves playlist to Spotify account
    savePlaylist() {
      const trackUris = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
    }

    //Spotify search functionality
    search(term) {
      Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
    }

    render() {
    console.log(this.state);
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch = {this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}
                              onAdd={this.addTrack}
                              />
              <Playlist playlistTracks = {this.state.playlistTracks}
                      onRemove = {this.removeTrack}
                      onNameChange = {this.updatePlaylistName}
                      onSave = {this.savePlaylist}
                      />
            </div>
          </div>
        </div>
      );
    }
  }

  export default App;

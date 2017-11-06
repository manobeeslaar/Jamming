const clientId = 'f2f761ad999c4285b8ea71771ea1868c'; //client id API
const redirectUri = 'http://localhost:3000/'; //adding for redirect function URI Spotify API

let accessToken;

//Spotify object - calling to API - access token
const Spotify = {
  getAccessToken() {
  if (accessToken) {
      return accessToken;
    }
    //implicit grant flow, values for the access token and expiration time are in the URL parameter after authentication
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    //if the accesstoken exists and the expiration exists.
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expires = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expires * 1000);
      window.history.pushState('Access Token', null, '/'); //Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
      return accessToken;
    } else {
      const accessUrl = "https://accounts.spotify.com/authorize?client_id=" + clientId + "&response_type=token&scope=playlist-modify-public&redirect_uri=" + redirectUri;
      window.location = accessUrl;
    }
  },

  //returns a promise that will eventually resolve to the list of tracks from the search
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch("https://api.spotify.com/v1/search?type=track&q=" + term, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      preview:track.preview_url,
      art: track.album.images[0].url
    }));
  });
  },

  //method accepts a playlist name and an array of track URIs. It makes the following three requests to the Spotify API
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    //variables
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    //JSON response
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch("https://api.spotify.com/v1/users/" + userId + "/playlists", {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
          }).then(response => response.json()
          ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch("https://api.spotify.com/v1/users/"+ userId + "/playlists/"+ playlistId + "/tracks", {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackUris})
            });
          });
        });
      }
    };


export default Spotify;

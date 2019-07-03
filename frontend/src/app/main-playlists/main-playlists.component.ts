import { Component, OnInit } from '@angular/core';
import { BeatOnApiService } from '../services/beat-on-api.service';
import { QuestomConfig } from '../models/QuestomConfig';
import { BeatOnConfig } from '../models/BeatOnConfig';
import { BeatSaberPlaylist } from '../models/BeatSaberPlaylist';
import { ConfigService } from '../services/config.service';
import {BeatSaberSong} from "../models/BeatSaberSong";

@Component({
  selector: 'app-main-playlists',
  templateUrl: './main-playlists.component.html',
  styleUrls: ['./main-playlists.component.scss'],
  host: {
    class:'fullheight'
  }
})
export class MainPlaylistsComponent implements OnInit {
  config : QuestomConfig;
  selectedPlaylist: BeatSaberPlaylist =<BeatSaberPlaylist>{};
  customPlaylist: BeatSaberPlaylist;
  constructor(private beatOnApi : BeatOnApiService, private configSvc : ConfigService) { }

  ngOnInit() {
   this.configSvc.getConfig().subscribe(this.handleConfig.bind(this));
   this.configSvc.configUpdated.subscribe(this.handleConfig.bind(this));
  }

  selectedPlaylistChanged(ev) {
    this.selectedPlaylist = ev;
  }

  handleConfig(cfg : BeatOnConfig){
    this.config = cfg.Config;
    this.setupPlaylists();
  }

  setupPlaylists(){
    const customIndex = this.config.Playlists.map(p => p.PlaylistID).indexOf('CustomSongs');
    if(customIndex > -1){
      this.customPlaylist = this.config.Playlists[customIndex];
      this.config.Playlists.splice(customIndex,1);
    }else{
      this.customPlaylist = {
        CoverArtFilename : null,
        PlaylistID: "",
        PlaylistName: "",
        SongList: [],
        CoverImageBytes : null
      }
    }
    if(this.config.Playlists.length)
      this.config.Playlists[0].IsOpen = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { PusherProvider } from '../../providers/pusher/pusher';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private pusher: PusherProvider
  ) {}
  options = {
    france: { name: 'France', votes: 0 },
    belgium: { name: 'Belgium', votes: 0 },
    england: { name: 'England', votes: 0 },
    croatia: { name: 'Croatia', votes: 0 },
  };
  optionsArray = Object.keys(this.options);
  chartData = this.optionsArray.map((val) => this.options[val].votes);
  selectedOption = '';
  chartType = 'doughnut';
  voted = false;
  selectOption(option) {
    this.selectedOption = this.selectedOption !== option ? option : '';
  }
  computeData(option) {
    this.options = {
      ...this.options,
      [option]: {
        ...this.options[option],
        votes: ++this.options[option].votes,
      },
    };
    this.chartData = this.optionsArray.map((val) => this.options[val].votes);
  }
  vote() {
    if (this.selectedOption) {
      this.http
        .post('https://e6e3d0e7.ngrok.io/vote', { option: this.selectedOption })
        .subscribe((res) => {
          this.voted = true;
        });
    }
  }
  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('new-entry', (data) => {
      this.computeData(data.option);
    });
  }
}

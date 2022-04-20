import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { IMoment } from 'src/app/IMoment';

import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: IMoment[] = []
  moments: IMoment[] = []
  baseApiUrl: string = environment.baseApiUrl

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getAllMoments().subscribe((response) => {

      const data = response.data

      data.map((moment) => {
        moment.created_at = new Date(moment.created_at!).toLocaleDateString('pt-BR')
      })

      this.allMoments = data
      this.moments = data
    })
  }

}

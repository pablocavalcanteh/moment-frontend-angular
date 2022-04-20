import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MomentService } from 'src/app/services/moment.service';
import { IMoment } from 'src/app/IMoment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  moment?: IMoment

  constructor(private momentService: MomentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMomentById(id).subscribe((response) => ( this.moment = response.data ))
  }

}

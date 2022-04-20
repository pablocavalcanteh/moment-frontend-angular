import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMoment } from 'src/app/IMoment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: IMoment
  btnText: string = "Editar"

  constructor(private momentService: MomentService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMomentById(id).subscribe(response => (this.moment = response.data))
  }

}

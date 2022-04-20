import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { IMoment } from 'src/app/IMoment';

import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  moment?: IMoment
  baseApiUrl: string = environment.baseApiUrl
  faTimes = faTimes
  faEdit = faEdit

  constructor(
              private momentService: MomentService,
              private route: ActivatedRoute,
              private messagesService: MessagesService,
              private router: Router
              ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMomentById(id).subscribe((response) => ( this.moment = response.data ))
  }

  async removeHandler(id: number) {
    await this.momentService.removeMomentById(id).subscribe()
    this.messagesService.add("Momento excluído com sucesso!")
    this.router.navigate(["/"])
  }

}

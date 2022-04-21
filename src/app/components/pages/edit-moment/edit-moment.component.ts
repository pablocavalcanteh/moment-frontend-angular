import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMoment } from 'src/app/IMoment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: IMoment
  btnText: string = "Editar"

  constructor(private momentService: MomentService,
              private route: ActivatedRoute,
              private messagesService: MessagesService,
              private router: Router
              ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMomentById(id).subscribe(response => (this.moment = response.data))
  }

  async editHandler(moment: IMoment) {
    const id = this.moment.id
    const formData = new FormData()
    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if (moment.image) {
      formData.append('image', moment.image)
    }

    await this.momentService.updateMoment(id!, formData).subscribe()

    this.messagesService.add('Momento atualizado com sucesso!')
    this.router.navigate(['/'])
  }

}

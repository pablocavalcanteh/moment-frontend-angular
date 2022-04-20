import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { IMoment } from 'src/app/IMoment';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnText = "Compartilhar"

  constructor(private momentService: MomentService,
              private messageService: MessagesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async createHandler(moment: IMoment) {

    const formData = new FormData()
    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if (moment.image) {
      formData.append("image", moment.image)
    }

    // TODO:
    // 1. Enviar para o service
    console.log("chegou aqui")
    await this.momentService.createMoment(formData).subscribe()
    // 2. Exibir msg
    this.messageService.add("Momento adicionado com sucesso!")
    // 3. Redirect  
    this.router.navigate(['/'])
  }


}

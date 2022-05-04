import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { IMoment } from 'src/app/IMoment';

import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { IComment } from 'src/app/IComment';

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

  commentForm!: FormGroup

  constructor(
              private momentService: MomentService,
              private route: ActivatedRoute,
              private messagesService: MessagesService,
              private router: Router,
              private commentService: CommentService
              ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMomentById(id).subscribe((response) => ( this.moment = response.data ))
    
    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required])
    })
  }

  async removeHandler(id: number) {
    await this.momentService.removeMomentById(id).subscribe()
    this.messagesService.add("Momento excluído com sucesso!")
    this.router.navigate(["/"])
  }

  async onSubmit(formDirective: FormGroupDirective) {

    if (this.commentForm.invalid) {
      return
    }

    const commentData: IComment = this.commentForm.value

    commentData.momentId = Number(this.moment!.id)

    await this.commentService.createComment(commentData).subscribe((comment) => this.moment!.comments!.push(comment.data))

    this.messagesService.add("Comentário adicionado!")
    this.commentForm.reset()
    
    formDirective.resetForm()

  }

  get text() {
    return this.commentForm.get('text')!
  }

  get username() {
    return this.commentForm.get('username')!
  }


}

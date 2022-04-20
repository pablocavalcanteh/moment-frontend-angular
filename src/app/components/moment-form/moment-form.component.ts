import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMoment } from 'src/app/IMoment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Input() btnText!: string
  @Input() momentData: IMoment | null = null
  @Output() onSubmit = new EventEmitter<IMoment>()

  momentForm!: FormGroup
  
  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('')
    })
  }

  get title() {
    return this.momentForm.get('title')!
  }

  get description() {
    return this.momentForm.get('description')!
  }

  submit() {

    if (this.momentForm.invalid) {
      return;
    }

    this.onSubmit.emit(this.momentForm.value)
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0]
    this.momentForm.patchValue({image: file})

  }

}

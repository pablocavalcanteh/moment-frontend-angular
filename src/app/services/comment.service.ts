import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from '../IComment';

import { IResponse } from '../IResponse'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http: HttpClient) { }

  createComment(comment: IComment): Observable<IResponse<IComment>> {
    const url = `${this.apiUrl}/${comment.momentId}/comments`
    return this.http.post<IResponse<IComment>>(url, comment)
  }
}

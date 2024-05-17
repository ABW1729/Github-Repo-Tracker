import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError ,Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<Object> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`, {
      headers: new HttpHeaders({
        'Authorization': `token ${environment.githubToken}`
      })
    });
  }

  getUserRepos(githubUsername: string, page: number=1, per_page: number=10): Observable<Object> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${per_page}`, {
      headers: new HttpHeaders({
        'Authorization': `token ${environment.githubToken}`
      })
    });
  }

  getLanguages(repoName: string, githubUsername: string): Observable<Object> {
    return this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repoName}/languages`, {
      headers: new HttpHeaders({
        'Authorization': `token ${environment.githubToken}`
      })
    });
  }
}

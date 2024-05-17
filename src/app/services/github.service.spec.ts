

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { mockUserData,mockRepoFirstPage,mockRepoDatanextPage,username, mockRepoDataFinal } from 'src/testData';
import { HttpClientModule } from '@angular/common/http';

describe('GitHubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user information', () => {
  
    service.getUser(username).subscribe(user => {
      expect(user).toEqual(mockUserData);
    });

    const req = httpTestingController.expectOne('https://api.github.com/users/visionmedia');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUserData);
  });

  it('should fetch user repositories with default page and perPage', () => {
   
    service.getUserRepos(username).subscribe(repos => {
      expect(repos).toEqual(mockRepoFirstPage);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}/repos?page=1&per_page=10`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRepoFirstPage);
  });

  it('should fetch user repositories with specified page and perPage', () => {

   
    const page = 2;
    const perPage = 10;

    service.getUserRepos(username, page, perPage).subscribe((repos: any) => {
      expect(repos.length).toBeLessThanOrEqual(perPage);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    expect(req.request.method).toEqual('GET');
  
  });

 
});


// github.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, flush,tick } from '@angular/core/testing';
import { GithubComponent } from './github.component';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from '../services/github.service'
import { of } from 'rxjs';
import {mockRepoFirstPage,mockRepoDatanextPage,username, mockRepoDataFinal,mockUserData } from 'src/testData';
describe('GithubComponent', () => {
  let component: GithubComponent;
  let fixture: ComponentFixture<GithubComponent>;
  let mockGitHubService: jasmine.SpyObj<GithubService>;
  let httpMock: HttpTestingController;
  
  beforeEach(async () => {
    mockGitHubService = jasmine.createSpyObj('GitHubService', ['getUser', 'getUserRepos']);
    await TestBed.configureTestingModule({
      declarations: [GithubComponent],
      imports:[FormsModule,HttpClientTestingModule],
      providers: [{ provide: GithubService, useValue: mockGitHubService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubComponent);
    component = fixture.componentInstance;
    mockGitHubService = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>; // Getting the injected instance
    httpMock = TestBed.inject(HttpTestingController); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load user information on search', fakeAsync(()  => {
    
   
    const component=new GithubComponent(mockGitHubService);
  mockGitHubService.getUser.and.returnValue(of(mockUserData));
  fixture.detectChanges();
    component.searchUser(username);
    expect(mockGitHubService.getUser).toHaveBeenCalledWith(username); // Ensure getUser is called with the correct usernam
     expect(component.user).toEqual(mockUserData); 
   flush();
}));


  it('should navigate to next page', () => {
    const currentPage = component.currentPage;
    const perPage = component.perPage;
    component.nextPage();
    const expectedData = mockRepoDatanextPage.slice((currentPage) * perPage, (currentPage + 1) * perPage);
    expect(component.currentPage).toEqual(currentPage + 1);
    expect(component.repos).toEqual(mockRepoDatanextPage);
    expect(component.pagedRepos).toEqual(expectedData);
  });
  

  it('should navigate to previous page', () => {
    const currentPage = component.currentPage;
    const perPage = component.perPage;
    const data=mockRepoDatanextPage.slice(0,(currentPage-1)*perPage)
    component.prevPage();
    expect(component.currentPage).toBe(currentPage + 1);
    expect(component.repos).toBe(mockRepoDatanextPage);
    expect(component.pagedRepos).toEqual(data);
  });

  it('should navigate to specific page', () => {
    const currentPage = component.currentPage;
    const perPage = component.perPage;
    const data=mockRepoDataFinal.slice(0,(currentPage-1)*perPage);
    component.goToPage(3);
    expect(component.currentPage).toBe(3);
    expect(component.pagedRepos).toEqual(data)
  });

  it('should handle per page entry switch', () => {
    const mockSwitchOption=30;
    component.onPerPageChange(mockSwitchOption);
    const totalPages=Math.ceil(component.totalRepos/component.perPage);
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(totalPages);
    expect(component.pagedRepos).toEqual(mockRepoDataFinal);
  });

 
});


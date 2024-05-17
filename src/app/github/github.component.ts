import { Component, OnDestroy } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-github-repos',
  styleUrls: ['./github.component.css'],
  template: `
   
    

    <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto max-w-md" role="alert">
  <strong class="font-bold">Error!</strong>
  <span class="block sm:inline">{{ error }}</span>
</div>

<label
    class="mx-auto mt-20 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
    for="search-bar">
    <input id="search-bar"  [(ngModel)]="username" name="username" placeholder="Enter GitHub username here"
        class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white">
    <button
    (click)="searchUser(username)" class="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
        
        <div class="relative"> 
            <div
                class="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg class="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>

            <div class="flex items-center transition-all opacity-1 valid:"><span
                    class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                </span>
            </div>

        </div>
        
    </button>
</label>

  
    <div class=" flex items-center justify-center mt-2">

     <div class="flex items-center justify-center mt-2 mr-4 ml-4" *ngIf="!loading">
  <div class="dropdown inline-block relative">
    <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
      <span class="mr-1">Repos per page</span>
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
    </button>
    <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 w-24">
      <li *ngFor="let option of perPageOptions">
        <a (click)="onPerPageChange(option)" class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-wrap" href="javascript:void(0)">{{ option }}</a>
      </li>
    </ul>
  </div>
</div>

<div class=" flex items-center justify-center mt-2 mr-4 ml-4" *ngIf="!loading">
 <div class="dropdown inline-block relative">
    <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
      <span class="mr-1">Sort</span>
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
    </button>
    <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 w-28">
        <li *ngFor="let option of sortOptions">
          <a (click)="sort(option)" class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-wrap" href="javascript:void(0)">{{ option }}</a>
        </li>
      </ul>
  </div>

</div>

<div class=" flex items-center justify-center mt-2 mr-4 ml-4" *ngIf="!loading">
 <div class="dropdown inline-block relative">
    <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
      <span class="mr-1">Filter</span>
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
    </button>
    <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 w-28">
        <li *ngFor="let option of filterOptions">
          <a (click)="filter(option)" class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="javascript:void(0)">{{ option }}</a>
        </li>
      </ul>
  </div>

</div>
    </div>

    <div *ngIf="loading"><div class="w-60 h-24 border-2 rounded-md mx-auto mt-20">
      <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div class="w-12 bg-gray-300 h-12 rounded-full "></div>
        <div class="flex flex-col space-y-3">
          <div class="w-36 bg-gray-300 h-6 rounded-md "></div>
          <div class="w-24 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </div>
    </div></div>


    <div class="flex flex-col md:flex-row items-center" *ngIf="user">
  <div class="w-full md:w-1/3 p-4 md:ml-8 flex justify-center items-center">
    <img [src]="user.avatar_url" alt="Avatar Photo" class="h-48 w-auto rounded-full avatar-img object-cover" style="max-height: 100px;">
  </div>
  <div class="w-full md:w-2/3 p-4 mx-auto">
    <h2 class="text-xl font-bold">{{ user.name }}</h2>
    <p class="text-gray-600"><strong>Bio</strong>:{{ user.bio }}</p>
    <p class="text-gray-600"><strong>Location</strong>:{{ user.location }}</p>
    <p class="text-gray-600"><strong>Twitter:</strong> <a href="{{ user.twitter_username }}" class="text-blue-500">{{ user.twitter_username }}</a></p>
    <p class="text-gray-600"><strong>GitHub:</strong> <a href="{{ user.html_url }}" class="text-blue-500">{{ user.html_url }}</a></p>
  </div>
</div>


    <div class="flex flex-wrap justify-center m-10" *ngIf="!loading">
      <div class="flex-grow flex-shrink-0 w-72 border border-black rounded-lg m-5 p-5" *ngFor="let repo of pagedRepos">
        <div class="mb-5">
          <h3 class="font-bold text-xl mb-0"><a href="{{ repo.html_url }}" target="_blank" class="font-bold">{{ repo.name }}</a></h3>
          <p>{{ repo.description }}</p>
        </div>
        <div class="mt-5" *ngIf="repo.languages">
          <ul class="list-none p-0">
            <li *ngFor="let language of repo.languages" class="border-box bg-blue-500 text-white font-bold py-1 px-2 rounded-md mb-2 inline-block mr-5">{{ language }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pagination-container flex flex-col md:flex-row items-center justify-center mt-4 mb-4" *ngIf="user">
  <button (click)="prevPage()" [disabled]="currentPage === 1" class="pagination-button px-4 py-2 mr-2 mb-2 md:mr-2 md:mb-0 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Previous</button>
  <div class="flex flex-wrap justify-center">
    <ng-container *ngFor="let page of totalPagesArray">
      <button (click)="goToPage(page)" [class.bg-gray-300]="page === currentPage" class="pagination-button px-4 py-2 mr-2 mb-2 text-black rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300 border border-black">{{ page }}</button>
    </ng-container>
  </div>
  <button (click)="nextPage()" [disabled]="currentPage === totalPages" class="pagination-button px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Next</button>
</div>
  `
})
export class GithubComponent implements OnDestroy {
  username!: string;
  repos:Array<Object>=[];
  user: any = {};
  loading = false;
  error!: string;
  perPageOptions = [10, 30, 50, 100];
  sortOptions=["created_at","updated_at","pushed_at","size","forks","open_issues","watchers"];
  filterOptions=["archived","disabled","has_issues"];
  perPage = 10;
  switchPage = 10;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  totalRepos!: number;
  pagedRepos: any[]= [];
  fillCount = (this.currentPage-1) * this.perPage - this.repos.length;
  filledArray:Array<Object>= [];
  private subscription!: Subscription;

  constructor(private githubService: GithubService) { }


  //invoked when user presses search button
  searchUser(username:string) {
    this.loading = true;
    this.currentPage = 1; 
    //if user data already exists
    if (this.user && this.user.login == username) {
      this.totalRepos = this.user.public_repos;
      this.totalPages = Math.ceil(this.user.public_repos / this.perPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      this.fillCount=this.totalPages*this.perPage;
      this.repos = new Array(this.fillCount > 0 ? this.fillCount : 0).fill({});
      this.getRepos(this.currentPage, this.perPage);
      this.error = '';
    } 
    //Else call API
    else {
     this.getUser(username);;
    }
  }

  //get user data from API
  getUser(username: string) {
    this.subscription = this.githubService.getUser(username)
      .subscribe((user: any) => {
        this.user = user;
        this.totalRepos = user.public_repos;
        this.totalPages = Math.ceil(user.public_repos / this.perPage);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
        this.fillCount=this.totalPages*this.perPage;
        //fill repo array with empty objects
        this.filledArray = new Array(this.fillCount > 0 ? this.fillCount : 0).fill({});
        this.repos=this.filledArray;
        this.getRepos(this.currentPage, this.perPage);
        this.error = '';
      }, (error) => {
        if (error.status === 404) {
          this.error = "User not found";
        } else {
          this.error = "Error fetching repositories";
        }
        this.loading = false;
      });
  }


  //this function fetches repos from api if they are not available,else it uses cached repo results
  getRepos(currentPage: number, perPage: number) {
    if (!this.repos.slice((currentPage - 1) * perPage, currentPage * perPage).some(repo => Object.keys(repo).length === 0)) {
      // Data for the requested page already exists in repos array
      // slice repo array for entries per page
      this.pagedRepos = this.repos.slice((currentPage - 1) * perPage, currentPage * perPage).filter(repo => Object.keys(repo).length !== 0) ;
      this.loading = false;
    } else {
      // Data doesn't exist in repos array, fetch from API
      this.subscription = this.githubService.getUserRepos(this.username, currentPage, perPage)
        .subscribe((repos: any) => {
          if (repos.length === 0) {
            this.error = "No public repositories";
          } else {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = Math.min(startIndex + repos.length, this.currentPage * this.perPage);
            this.repos.splice(startIndex, endIndex - startIndex, ...repos);
           this.pagedRepos = this.repos.slice((currentPage - 1) * perPage, currentPage * perPage).filter(repo => Object.keys(repo).length !== 0) ;
            this.getRepoLanguages();
          }
          this.loading = false;
        }, (error) => {
          this.error = "Error fetching repositories";
          this.loading = false;
        });
    }
  }
  

//update languages of each repo
  getRepoLanguages() {
    this.pagedRepos.forEach(repo => {
      if (!repo.languages) {
        this.githubService.getLanguages(repo.name, this.username).subscribe((languages: any) => {
          repo.languages = Object.keys(languages);
        });
      }
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getRepos(this.currentPage, this.perPage);
  }

//invoked when user changes Repos per page
  onPerPageChange(option:number) {
    this.perPage=option
    if(this.totalRepos<this.perPage){
      this.switchPage=this.totalRepos;
    };
    this.switchPage=option;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalRepos / this.perPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
    this.getRepos(this.currentPage, this.perPage);
  }

   //invoked when next page is clicked
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRepos(this.currentPage, this.perPage); //server side pagination calls API on every page
    }
  }

  //invoked when previous page is clicked
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRepos(this.currentPage, this.perPage);
    }
  }


 //function to sort repos array 
  sort(option:string){
    this.pagedRepos.sort((a, b) => {
      return a[option] - b[option]; 
    });
  }

  //function to filter repos array 
  filter(option:string){
    this.pagedRepos = this.pagedRepos.filter(repo => {
      return repo[option]; 
    });
  }

  //Unsubscribe
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


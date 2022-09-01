import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovieService } from '../common/services/movie.service';

declare var bootstrap: any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  isLoaded = false;
  allMovieData: any = [];
  movieData: any = [];
  year: any = null;
  error: string = null;
  movieDetailModal: any;
  selectedMovie: any = {};

  constructor(
    private title: Title,
    private movieService: MovieService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Home | Movie media');
    this.getAllMovies();
    this.movieDetailModal = new bootstrap.Modal(document.getElementById('movieModal'), {
      keyboard: false,
      backdrop: 'static'
    });
  }

  getAllMovies() {
    this.isLoaded = false;
    this.movieService.getMovies().subscribe({
      next: res => {
        // console.log('Response', res);
        if (res && res.results) {
          this.allMovieData = res.results;
          this.movieData = res.results;
          this.isLoaded = true;
        }
      }, error: err => {
        console.log('Error', err);
        this.isLoaded = true;
      }
    });
  };

  filterByRating(event) {
    if (event && event.target.value) {
      if (event.target.value === 'all') {
        this.getAllMovies();
      } else if (event.target.value === 'below') {
        this.movieData = this.allMovieData.filter(e => e.vote_average < 5);
      } else {
        this.movieData = this.allMovieData.filter(e => e.vote_average > event.target.value);
      }
    }
  }

  sortBy(event) {
    if (event && event.target.value) {
      if (event.target.value === 'all') {
        this.getAllMovies();
      } else if (event.target.value === 'asc') {
        this.movieData = this.allMovieData.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        this.movieData = this.allMovieData.sort((a, b) => b.title.localeCompare(a.title));
      }
    }
  }

  filterByYear() {
    if (this.year) {
      if (/^\d{4}$/.test(this.year)) {
        this.movieData = this.allMovieData.filter(e => (new Date(e.release_date).getFullYear() == this.year));
      } else {
        this.error = 'Not a valid year';
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    } else {
      this.getAllMovies();
    }
  }

  movieDetails(data) {
    console.log(data);
    this.selectedMovie = data;
    this.movieDetailModal.show();
  }

  closeMovieModal() {
    this.selectedMovie = null;
    this.movieDetailModal.hide();
  }

  ngOnDestroy(){
    if (this.movieDetailModal) {
      this.movieDetailModal.hide();
    }
  }
}

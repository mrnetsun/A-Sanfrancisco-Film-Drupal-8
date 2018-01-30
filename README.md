# SF Films MAP Project

The SF Film locations map with data sourced from SF Data (API Service), Google Maps API, the Open Movie Database
* SF Data is a denomalized set of films, locations where they were shot in San Francisco.
* Google Maps API helped to geocode the locations. The results could be improved by cleaning more of the data.
* The Open Movie Database provided additional metadata about the films: a poster, the plot, and any awards they might have received. 
[SF Film] (https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)


## Architecture

* Drupal 8 Module
    * We using Drupal 8 to display Film data on the GoogleMap. 
	* Using jQuery Autocomplete to filter feature
	* Using Scollenless to load more item on paging
	
* Data Example
    * Using SoSQL Queries for search or Paging($select,$where,$group,$limit,$offset,$q... to [filter data] (https://dev.socrata.com/docs/queries/)

You can see the [Demo](http://sfilm.iypuat.com:5656/film/search).

## Future Improvements

* UI design
* Support for a responsive mobile UI.



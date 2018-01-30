(function ($) {
    var API_KEY = 'Vd6iPHlodPNX2Ggc10flF3k8T';
    var map;
    var aryMarker = [];
    var infowindow = null;
    var start_offset = 0;
    var limit_page = 50;
    var query = '';


    var myLatLng = {lat: 37.774929, lng: -122.419416};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
    });

    listItem(start_offset);

    //load more film
    $("#film_list").scroll(function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            start_offset += limit_page;
            listItem(start_offset);
        }
    });


    //setup loading image when call ajax
    var loadingImg = $("#loadingImg");
    $(document).ajaxStart(function () {
        loadingImg.show();
    });

    $(document).ajaxStop(function () {
        loadingImg.hide();
    });


    //register scroll to element function
    $.fn.scrollTo = function (elem, speed) {
        $(this).animate({
            scrollTop: $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
        }, speed == undefined ? 1000 : speed);
        return this;
    };

    //search autocomplete
    $("#edit-keyword").autocomplete({
        source: function (request, response) {
            query = request.term;
            $.ajax({
                url: "https://data.sfgov.org/resource/wwmu-gmzc.json",
                dataType: "json",
                data: {
                    "$limit": 5,
                    "$q": request.term,
                    "$select": "title",
                    "$group": "title",
                    "$$app_token": API_KEY
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.title,
                            value: item.title
                        };
                    }));
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $.ajax({
                url: "https://data.sfgov.org/resource/wwmu-gmzc.json",
                type: "GET",
                data: {
                    "$limit": limit_page,
                    "$offset": 0,
                    "$q": ui.item.value,
                    "$$app_token": API_KEY
                }
            }).done(function (data) {
                //empty list
                $('#film_list').html('');
                clearMapMarker();

                for (var i = 0; i < data.length; i++) {
                    var id = start_offset + i;
                    addFilmToList(data[i], id);
                    createMaker(id, data[i].title, data[i].locations);
                }
            });
        }
    });

    $('#frm-search-film').submit(function (e) {
        // avoid to execute the actual submit of the form.
        e.preventDefault();
        start_offset = 0;
        query = $('#edit-keyword').val();
        $('#film_list').html('');
        clearMapMarker();
        listItem(start_offset)
        return false;
    })

    /**
     * Load film item from API
     * @param start
     */
    function listItem(start) {

        var request = {
            "$limit": limit_page,
            "$offset": start,
            "$$app_token": API_KEY
        }

        if (query) {
            request.$q = query;
        }

        $.ajax({
            url: "https://data.sfgov.org/resource/wwmu-gmzc.json",
            type: "GET",
            data: request
        }).done(function (data) {
            if(data.length>0){
                for (var i = 0; i < data.length; i++) {
                    var id = start_offset + i;
                    addFilmToList(data[i], id);
                    createMaker(id, data[i].title, data[i].locations);
                }
            }else {
                // not found
                if(start_offset == 0) {
                    display_404();
                }
            }

        });
    }

    /**
     * Create google Marker
     * @param i
     * @param title
     * @param address
     */
    function createMaker(i, title, address) {
        var geocoder = new google.maps.Geocoder();
        var latitude = '';
        var longitude = '';
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                var LatLng = {lat: latitude, lng: longitude}

                var marker = new google.maps.Marker({
                    position: LatLng,
                    map: map,
                    title: title
                });
                aryMarker[i] = marker;

                marker.addListener('click', function () {
                    if (infowindow) {
                        infowindow.close();
                    }
                    infowindow = new google.maps.InfoWindow({
                        content: '<div><b style="font-size: 15px;">' + title + '</b><div>' + address + '</div></div>'
                    });
                    infowindow.open(map, marker);
                    $('#film_list .filmItemSelected').removeClass('filmItemSelected');
                    $("#item_" + i).addClass('filmItemSelected');
                    $("#film_list").scrollTo("#item_" + i, 1000);
                });


            }
        });

    }

    /**
     * Add film items to list film
     * @param item
     * @param i
     */
    function addFilmToList(item, i) {
        // console.log(item);
        var div = $('<div class="row filmItem" id="item_' + i + '"><div class="col-md-4"><div class="film_avatar"></div></div>' +
            '<div class="col-md-8">' +
            '<h2 class="title">' + item.title + '</h2>' +
            '<div class="locations"><i class="fa fa-circle"></i> Location: ' + item.locations + '</div>' +
            '<div class="director"><i class="fa fa-circle"></i> Director: ' + item.director + '</div>' +
            '<div class="production"><i class="fa fa-circle"></i> Production: ' + item.production_company + '</div>' +
            '<div class="actor"><i class="fa fa-circle"></i> Actors: ' + item.actor_1 + ' ' + item.actor_2 + ' ' + item.actor_3 + '</div>' +
            '<div class="writer"><i class="fa fa-circle"></i> Writer: ' + item.writer + '</div>' +
            '<div class="release"><i class="fa fa-circle"></i> Release: ' + item.release_year + '</div>' +
            '</div>');

        div.click(function () {
            $('#film_list .filmItemSelected').removeClass('filmItemSelected');
            $(this).toggleClass('filmItemSelected');
        });

        $('#film_list').append(div);
    }

    /**
     * Display not found
     */

    function display_404() {
        console.log('Not found.');
        var div = $('<div class="row filmItem not_found"><div class="col-md-12"> No film found.</div></div>');
        $('#film_list').html(div);
    }

    /**
     * Clear Map Marker
     */
    function clearMapMarker() {
        //console.log(aryMarker);
        for (var i = 0; i < aryMarker.length; i++) {
            if (aryMarker[i]) aryMarker[i].setMap(null);
        }
        aryMarker = [];
    }


})(jQuery);


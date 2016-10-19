	$(document).ready(function() {
	    $.get("/getAllPosts", function(data) {
	        data.forEach(function(value, key) {
	            $("#books").append('\<div class="block">\
				<div class="col-xs-10 ">\
		<div class="col-xs-4 ">\
			<h4>' + value.title + '</h4>\
			<img src= "' + value.img + '"></div>\
			<p class="content">' + value.note + '</p>\
			<div class="bottom_data">\
			<p class="pull-left">Author : ' + value.an + '</p>\
			<p class="pull-right">Date : ' + value.doc + '</p>\
			</div>\
		</div>\
		<div class="col-xs-1"></div>\
		<div class="clear"></div>\
	</div>');

	            $("#books1").append('\<div class="block">\
				<div class="col-xs-10 ">\
		<div class="col-xs-4 ">\
			<h4>' + value.title + '</h4>\
			<img src= "' + value.img + '"></div>\
			<p class="content">' + value.note + '</p>\
			<div class="bottom_data">\
			<p class="pull-left">Author : ' + value.an + '</p>\
			<p class="pull-right">Date : ' + value.doc + '</p>\
			</div>\
		</div>\
		<a href="#" class="edit glyphicon glyphicon-edit">Edit</a>\
		<a href="#" class="save glyphicon glyphicon-edit">Save</a>\
		<div class="col-xs-1"></div>\
		<div class="clear"></div>\
	</div>');
	        })
	    })
	    $(function() {
	        $("#logg").click(function() {
	            alert("Welcome " + $('#send_user').val());
	        });
	        $(document).on('click', '.edit', function() {
	            document.getElementById('books1').contentEditable = true;
	        });
	        $(document).on('click', '.save', function() {
	            document.getElementById('books1').contentEditable = false;
	        });
	    })
	});
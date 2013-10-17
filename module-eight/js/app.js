$(function(){
	var data=[
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"},
		{title: "superman",
		synopsis: "",
		rating: "PG-123"
		},
		{title: "alamat ng kamagong",
		synopsis: "hahaha",
		rating: "PG-13"}		
	];

	$('#results').append(Handlebars.compile($('#template').html())(data));

	$('.clicker').click(function(){

		$('#selected').empty();
		$('#selected').append($(this).children()[0].textContent + "<br/>" + $(this).children()[1].textContent).css('display', 'block');
	});

	$('.clicker').hover(function(){

		$('aside').empty();
		$('aside').append($(this).children()[0].textContent + "<br/>" + $(this).children()[1].textContent).css('display', 'block');
	});
});
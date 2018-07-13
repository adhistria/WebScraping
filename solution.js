const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
let base_url= 'https://www.bankmega.com/ajax.promolainnya.php?product=0';
let base_url2 = 'https://www.bankmega.com/'
let sub_cat = [];
let categories_data = [];

const options = {
  uri: `https://www.bankmega.com/promolainnya.php`,
  transform: function (body) {
    return cheerio.load(body);
  }
}

rp(options)
  .then(($) => {
	  $('#subcatpromo div').each(function(i,value){
	  		img = $(value).find('img');
	  		detail_url = base_url+"&subcat="+(i+1)
	  		categories_data.push({title:img[0].attribs['title'],url:detail_url,data_promo: []});
	  	});	
	  // console.log(categories_data);
	  // add_promo_to_category($,)
	 (add_promo_to_category(categories_data));
	  // get per category
	  // sub_cat.forEach(function(value){
	  // 	detail_url = options.uri+"/product=1&subcat="+value
	  // 	console.log(detail_url);
	  // });
	  // 
	  // console.log($('.tablepaging tbody tr td').length)
	  // $('.tablepaging tbody tr td').each(function(i,value){
	  // 	console.log(($(value).find('a')));

	  // 	console.log('COBAIN YA ');
	  // });

	  // get link of promo detail
	  // array_of_link = [];
	  // $('#promolain li').each(function(i,value){
	  // 		link = ($(value).find('a'));
	  // 		promotion_url = base_url+link[0].attribs['href'];
	  // 		console.log(promotion_url);
	  // 		// array_of_link.push(link[0].attribs['href']);
	  // });
  })
  .catch((err) => {
    console.log('ERROR DISINI 1');
  });

  console.log('BERES')
  console.log(categories_data);
// Request URL: https://www.bankmega.com/ajax.promolainnya.php?product=&subcat=1&page=2

  // const check_paging_category($,categories_data) => {
  // 	if($('.tablepaging tbody tr td').length== 0 ){
  // 		return 0
  // 	}
  // }

  function add_promo_to_category(categories_data) {  	
  	// console.log(123);
  	console.log(categories_data)
  	console.log(categories_data[0].title);
  	categories_data.forEach(function(category,i){
  		let page_url = '';
  		let arr_url_pagination = [];
		var options = {
			uri : category.url,
			transform: body => cheerio.load(body)
	  	}
	  	return rp(options)
	  		.then(function ($){
	  			count_page = $('.tablepaging tbody tr td').length
	  			if(count_page == 0 ){
			  		console.log('Ga Ada Data Cuy');
			  	}
			  	else{
			  		count_page-= 2;
			  		page_url = category.url.replace("=0",'=');
				  	for (var j = 1; j <= count_page; j++) {
				  		new_url=page_url+"&page="+j;
				  		arr_url_pagination.push(new_url);
				  		categories_data[i].data_promo.push(new_url)
			  			// console.log(new_url);
			  		}
			  		console.log('PROSES ADD PROMO TO CATEGORY');
			  		console.log(arr_url_pagination);
			  		console.log('=======================');
			  		get_data_from_pagination(arr_url_pagination);
			  	}
	  		})
	  		.catch((err)=>{
	  			console.log('ERROR DISINI 2')
	  		})
	  	// console(categories_data)
  	});
  	console.log('BERES')
  	// console.log(data);
  }

  function get_data_from_pagination(arr_url_pagination){
  	
  	arr_url_pagination.forEach(function(value){

  		var options = {
  			uri : value,
  			transform :body => cheerio.load(body)
  		}
  		rp(options)
  			.then(function($){
  				arr_promotion_url = [];
  				$('#promolain li').each(function(i,value){
  					// console.log(value);
			  		link = ($(value).find('a'));
			  		// console.log(link[0]);
			  		if(link[0].attribs['href'].includes("http") == false){
			  			promotion_url = base_url2+link[0].attribs['href'];
			  			arr_promotion_url.push(promotion_url);
			  		}
	  			});
	  			console.log('GET DATA FROM PAGINATION')
	  			console.log(arr_promotion_url)
	  			console.log('=================')
	  			get_detail_promotion(arr_promotion_url);
  			})
		.catch((err) => {
		    console.log('ERROR DISINI 3 : ',err);
		  });
  		// var options = {
  		// 	uri : value,
  		// 	transform : body => cheerio.load(body)
  		// }


  	})
  }

  function get_detail_promotion(arr_promotion_url){
  	console.log('GET DETAIL PROMOTION');

  	arr_promotion_url.forEach(function(value){
  		var options = {
  			uri :value,
  			transform : body=>cheerio.load(body)
  		}
  		rp(options)
  			.then(function($){
  				console.log($('.titleinside h3').text());
  				console.log($('.area b').text());
  				let periode = '';
  				$('.periode b').each(function(i,value){
  					// console.log(value);
  					periode += $(value).text();
  				})
  				console.log(periode);
  			})
  			.catch((err)=>{
  				console.log('ERROR DISINI 4 : '+value)
  				// console.log('error',err);
  			})
  	});
  	
  }


// let url = 'https://www.bankmega.com/promolainnya.php';
// let url = 'https://www.bankmega.com/ajax.promolainnya.php?product=1&subcat=2';
// let arr_url = []
// let title = []
// let base_url= 'https://www.bankmega.com/';
// // let base_url_promo_lainnya = 'https://www.bankmega.com/';
// request(url, function (err, res, body) {
//   if (err && res.statusCode !== 200) throw err;
//   let $ = cheerio.load(body);
//   let sub_cat = []
//   $('#subcatpromo div').each(function(i,value){
//   		img = $(value).find('img');
//   		sub_cat.push(i+1);
//   		title.push(img[0].attribs['title']);
//   	});	
//   // get per category
//   sub_cat.forEach(function(value){
//   	detail_url = url+"/product=1&subcat="+value
//   	console.log(detail_url);
//   });
//   // 
//   console.log($('.tablepaging tbody tr td').length)
//   // $('.tablepaging tbody tr td').each(function(i,value){
//   // 	console.log(($(value).find('a')));

//   // 	console.log('COBAIN YA ');
//   // });

//   // get link of promo detail
//   array_of_link = [];
//   $('#promolain li').each(function(i,value){
//   		link = ($(value).find('a'));
//   		promotion_url = base_url+link[0].attribs['href'];
//   		console.log(promotion_url);
//   		// array_of_link.push(link[0].attribs['href']);
//   });
//   // console.log('COBAIN YA ');
//   // console.log($('.tablepaging tbody tr td'));

//   // $('.tablepaging tbody tr ').each(function(i,value){
//   // 	$(value).find()
//   // });
//   // total of pagination
//   // console.log($('.tablepaging tr td:last-child'));
//   // last_page = $('.tablepaging tr td:last-child');
//   // last_page = $(".tablepaging tr td").eq(-3); // gets "li-9"

//   // console.log(last_page.find('a'));
//   // console.log(title.length);
//   // console.log(num_product);
// });

// title.each(function(i,value){
// 	console.log(value)
// })

// Request URL: https://www.bankmega.com/ajax.promolainnya.php?product=1&subcat=1&page=2
// Request URL: https://www.bankmega.com/ajax.promolainnya.php?product=1&subcat=2
// Request URL: https://www.bankmega.com/ajax.promolainnya.php?product=1&subcat=2&page=2
// Request URL: https://www.bankmega.com/ajax.promolainnya.php?product=1&subcat=6



// console.log($('body').html());

// let $ =cheerio.load(body);
// console.log($('body').html());

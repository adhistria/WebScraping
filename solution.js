
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
let arr_url = [];
let title = [];
let base_url= 'https://www.bankmega.com/';
let sub_cat = [];
let categories_data = [];
const options = {
  uri: `https://www.bankmega.com/promolainnya.php`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
	  $('#subcatpromo div').each(function(i,value){
	  		img = $(value).find('img');
	  		detail_url = options.uri+"/product=1&subcat="+(i+1)
	  		categories_data.push({title:img[0].attribs['title'],url:detail_url});
	  	});	
	 console.log(categories_data);
	  // get per category
	  // sub_cat.forEach(function(value){
	  // 	detail_url = options.uri+"/product=1&subcat="+value
	  // 	console.log(detail_url);
	  // });
	  // 
	  console.log($('.tablepaging tbody tr td').length)
	  // $('.tablepaging tbody tr td').each(function(i,value){
	  // 	console.log(($(value).find('a')));

	  // 	console.log('COBAIN YA ');
	  // });

	  // get link of promo detail
	  array_of_link = [];
	  $('#promolain li').each(function(i,value){
	  		link = ($(value).find('a'));
	  		promotion_url = base_url+link[0].attribs['href'];
	  		console.log(promotion_url);
	  		// array_of_link.push(link[0].attribs['href']);
	  });
  })
  .catch((err) => {
    console.log(err);
  });


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

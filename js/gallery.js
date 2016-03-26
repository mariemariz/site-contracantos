// Hover move listing
//$(document).ready(function() {

	var qtdFotosPagina = 16;

	//GALLERY setup
	//Adicionar objetos nessa lista com o nome (name), nome da pasta (tag) e a quantidade de fotos que vai varrer
	var tags = [
	{
		name: 'Paço do Frevo',
		tag: 'paco-frevo',
		ext: '.jpg',
		size: 59,
		firstPattern: true
	},
	{
		name: 'O Pescador e sua Alma',
		tag: 'pescador',
		ext: '.jpg',
		size: 56,
		firstPattern: false
	},
	{
		name: 'História',
		tag: 'historia',
		ext: '.png',
		size: 58,
		firstPattern: true
	}
	];

	var filter = $('#portfolio-filter li')[1];
	var foto = $('#portfolio-list li')[0];

	//Varre todas as tags (pastas cadastradas no objeto tags)
	for(var i = 0;i < tags.length;i++){
		$(filter).clone().appendTo('#portfolio-filter').find('a').attr('href','#filter-'+tags[i].tag).find('span').html(tags[i].name);
		for(var j = 1; j <= tags[i].size;j++){

			var name = "foto";
			if(tags[i].firstPattern){
				name += j + tags[i].ext;
			}else{
				name += " (" + j + ")" + tags[i].ext;
			}

			$(foto).clone().appendTo('#portfolio-list').attr('class','filter-'+tags[i].tag)
				.find('a')
					.attr('href','img/gallery/'+tags[i].tag+'/'+name)
					.attr('title',tags[i].name)
				.find('img')
					.attr('src','img/gallery/'+tags[i].tag+'/small/'+name)
					.attr('alt',tags[i].name)
					.attr('title',tags[i].name);
		}
	}
	$(foto).remove();

	Cufon.now();

	//função da paginação, muda a página, escondendo uns elementos e mostrando outros
	function goToPage(page){
		var filter = '';
		if(window.location.hash != '' && window.location.hash != '#all'){
			filter = window.location.hash.replace('#','.');
		}

		var list = $('#portfolio-list li' + filter);
		for (var x = 0;x < list.length;x++){
			var offset = (page-1)*qtdFotosPagina;
			if(x >= offset && x < qtdFotosPagina+offset){
				$(list[x]).show();
			}else{
				$(list[x]).hide();
			}
		}

		var listPages = $('.holder.pagination .gallery-pager li');
		listPages.removeClass('active');
		for(var i = 0;i < listPages.length;i++){
			if(i == page){
				$(listPages[i]).addClass('active');
			}
			if(i == 0){
				$(listPages[i]).find('a').attr('href','javascript:goToPage('+Math.max(1,page-1)+');');
			}else if(i == listPages.length-1){
				$(listPages[i]).find('a').attr('href','javascript:goToPage('+Math.min(listPages.length-2,page+1)+');');
			}
		}
	}

	//função que constrói as páginas no rodapé
	function makePagination(){
		var filter = '';
		if(window.location.hash != '' && window.location.hash != '#all'){
			filter = window.location.hash.replace('#filter-','');
		}
		var qtdTotalFts = 0;
		for(var i = 0;i < tags.length;i++){
			if(filter == '' || filter == tags[i].tag){
				qtdTotalFts += tags[i].size;
			}
		}

		var qtdPaginas = Math.ceil(qtdTotalFts/qtdFotosPagina);

		var firstPage = $('.holder.pagination .gallery-pager li')[0];
		$('.holder.pagination .gallery-pager li.page-number').remove()
		for(i = 1;i <= qtdPaginas;i++){
			$(firstPage).clone().insertBefore('.holder.pagination .gallery-pager .last-child')
				.addClass('page-number')
				.find('a')
					.attr('href','javascript:goToPage('+i+');')
					.html(i);
		}

		setTimeout(function(){goToPage(1);},500);
	}

	function delayMakePagination(){
		setTimeout(makePagination,1);
	}

	$(document).ready(function($) {
		makePagination();
		$('#portfolio-filter li a').click(delayMakePagination);
	});


//close
//});

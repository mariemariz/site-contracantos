// Hover move listing
//$(document).ready(function() {

	//GALLERY setup
	//Adicionar objetos nessa lista com o nome (name), nome da pasta (tag) e a quantidade de fotos que vai varrer
	var tags = [
	{
		name: 'História',
		tag: 'historia',
		ext: '.png',
		size: 58
	},
	{
		name: 'Sessão de fotos',
		tag: 'sessao',
		ext: '.jpg',
		size: 6
	}
	];

	var filter = $('#portfolio-filter li')[1];
	var foto = $('#portfolio-list li')[0];
	
	//Varre todas as tags (pastas cadastradas no objeto tags)
	for(var i = 0;i < tags.length;i++){
		$(filter).clone().appendTo('#portfolio-filter').find('a').attr('href','#filter-'+tags[i].tag).find('span').html(tags[i].name);
		for(var j = 1; j <= tags[i].size;j++){
			$(foto).clone().appendTo('#portfolio-list').attr('class','filter-'+tags[i].tag)
				.find('a')
					.attr('href','img/gallery/'+tags[i].tag+'/foto'+j+tags[i].ext)
					.attr('title',tags[i].name)
				.find('img')
					.attr('src','img/gallery/'+tags[i].tag+'/small/foto'+j+tags[i].ext)
					.attr('alt',tags[i].name)
					.attr('title',tags[i].name);
		}
	}
	$(foto).remove();
	
	 Cufon.now(); 
//close			
//});
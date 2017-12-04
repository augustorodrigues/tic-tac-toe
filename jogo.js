var rodada = 1;
var matrizJogo = Array(3);

matrizJogo['a'] = Array(3);
matrizJogo['b'] = Array(3);
matrizJogo['c'] = Array(3);

/*matrizJogo['a'][1] = 0;
matrizJogo['a'][2] = 0;
matrizJogo['a'][3] = 0;

matrizJogo['b'][1] = 0;
matrizJogo['b'][2] = 0;
matrizJogo['b'][3] = 0;

matrizJogo['c'][1] = 0;
matrizJogo['c'][2] = 0;
matrizJogo['c'][3] = 0;*/

var i = 1;

while (i <= 3) {
	matrizJogo['a'][i] = 0;
	matrizJogo['b'][i] = 0;
	matrizJogo['c'][i] = 0;
	i++;
}

$(document).ready( function() {
	$('#btn_iniciar_jogo').click(function() {
		// valida a digitação dos apelidos dos jogadores
		if ($('#apelido_jogador_1').val() == '') {
			alert('Apelido do jogador 1 não foi preenchido');
			return false;
		}

		if ($('#apelido_jogador_2').val() == '') {
			alert('Apelido do jogador 2 não foi preenchido');
			return false;
		}

		// exibir os apelidos
		$('#nome_jogador_1').html($('#apelido_jogador_1').val());
		$('#nome_jogador_2').html($('#apelido_jogador_2').val());

		// controla visualização das divs/seções
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();

	});

	$('.jogada').click( function() {
		var idCampoClicado = this.id;
		$('#'+idCampoClicado).off();
		jogada(idCampoClicado);

	});

	function jogada(id) {
		var icone = '';
		var ponto = 0;

		if((rodada % 2) == 1) {		// vez do jogador 1
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		} else {					// vez do jogador 2
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}

		rodada++;

		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('_');

		matrizJogo[linha_coluna[0]][linha_coluna[1]] = ponto;		

		verificaCombinacao();

	}

	function verificaCombinacao() {
		
		// verifica na horizontal
		var pontos = 0;
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matrizJogo['a'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matrizJogo['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matrizJogo['c'][i];
		}
		ganhador(pontos);

		// verifica na vertical		
		for (var l = 0; l < 3; l++) {
			pontos = 0;
			pontos = pontos + matrizJogo['a'][l];
			pontos = pontos + matrizJogo['b'][l];
			pontos = pontos + matrizJogo['c'][l];

			ganhador(pontos);
		}

		// verifica na diagonal
		pontos = 0;
		pontos = matrizJogo['a'][1] + matrizJogo['b'][2] + matrizJogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matrizJogo['a'][3] + matrizJogo['b'][2] + matrizJogo['c'][1];
		ganhador(pontos);
	}

	function ganhador(pontos) {
		if (pontos == -3) {
			var jogador_1 = $('#apelido_jogador_1').val();
			alert(jogador_1 +' venceu esta rodada!');
			$('.jogada').off();
		} else if (pontos == 3) {
			var jogador_2 = $('#apelido_jogador_2').val();
			alert(jogador_2 +' venceu esta rodada!');
			$('.jogada').off();
		}
	}
	

});

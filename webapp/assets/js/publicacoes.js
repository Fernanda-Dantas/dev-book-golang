$('#nova-publicacao').on('submit', criarPublicacao);
$('.curtir-publicacao').on('click', curtirPublicacao);

$(document).on('click', '.curtir-publicacao', curtirPublicacao);
$(document).on('click', '.descurtir-publicacao', descurtirPublicacao);

$('#atualizar-publicacao').on('click', atualizarPublicacao);
$('.deletar-publicacao').on('click', deletarPublicacao);

function criarPublicacao(event) {
  event.preventDefault();

  $.ajax({
    url: "/publicacoes",
    method: "POST",
    data: {
      titulo: $('#titulo').val(),
      conteudo: $('#conteudo').val(),
    }
  }).done(function () {
    window.location = "/home";
  }).fail(function () {
    alert("Erro ao criar publicação!");
  })
}

function curtirPublicacao(event) {
  event.preventDefault();

  const click = $(event.target);
  const publicacaoId = click.closest('div').data('publicacao-id');

  click.prop('disabled', true);
  $.ajax({
    url: `/publicacoes/${publicacaoId}/curtir`,
    method: "POST"
  }).done(function () {
    const contadorDeCurtidas = click.next('span');
    const quantidadeDeCurtidas = parseInt(contadorDeCurtidas.text());

    contadorDeCurtidas.text(quantidadeDeCurtidas + 1);

    click.addClass('descurtir-publicacao');
    click.addClass('text-danger');
    click.removeClass('curtir-publicacao');

  }).fail(function () {
    alert('Erro ao curtir publicação');
  }).always(function () {
    click.prop('disabled', false);
  });

}

function descurtirPublicacao(event) {
  event.preventDefault();

  const click = $(event.target);
  const publicacaoId = click.closest('div').data('publicacao-id');

  click.prop('disabled', true);
  $.ajax({
    url: `/publicacoes/${publicacaoId}/descurtir`,
    method: "POST"
  }).done(function () {
    const contadorDeCurtidas = click.next('span');
    const quantidadeDeCurtidas = parseInt(contadorDeCurtidas.text());

    contadorDeCurtidas.text(quantidadeDeCurtidas - 1);

    click.removeClass('descurtir-publicacao');
    click.removeClass('text-danger');
    click.addClass('curtir-publicacao');

  }).fail(function () {
    alert('Erro ao curtir publicação');
  }).always(function () {
    click.prop('disabled', false);
  });
}

function atualizarPublicacao() {
  $(this).prop('disabled', true);

  const publicacaoId = $(this).data('publicacao-id');

  $.ajax({
    url: `/publicacoes/${publicacaoId}`,
    method: "PUT",
    data: {
      titulo: $('#titulo').val(),
      conteudo: $('#conteudo').val()
    }
  }).done(function () {
    alert("Publicação editada com sucesso")
  }).fail(function () {
    alert("Erro ao editar.")
  }).always(function () {
    $('#atualizar-publicacao').prop('disabled', false);
  })
}

function deletarPublicacao(event) {
  event.preventDefault();

  const click = $(event.target);
  const publicacao = click.closest('div')
  const publicacaoId = publicacao.data('publicacao-id');

  click.prop('disabled', true);
  $.ajax({
    url: `/publicacoes/${publicacaoId}`,
    method: "DELETE"
  }).done(function () {
    publicacao.fadeOut("slow", function () {
      $(this).remove();
    });
  }).fail(function () {
    alert("Erro ao deletar a publicação.");
  });


}
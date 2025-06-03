function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Imagem')
    .addItem('Fazer Upload de Imagem', 'mostrarDialogoUpload')
    .addToUi();
}

function mostrarDialogoUpload() {
  const htmlOutput = HtmlService.createHtmlOutputFromFile('upload')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Upload de Imagem');
}

function fazerUploadImagem(imagem) {

  //Define a celula ativa
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const cell = sheet.getActiveCell();

  const folderId = '1ifnshhgYk87Fzpua6C1OcCoxEFbL8_mM';  // ID da pasta correta, não coloque nada a mais do que no exemplo
  const folder = DriveApp.getFolderById(folderId);

  //converte o base64 em bytes
  const decoded = Utilities.base64Decode(imagem.base64);

  //cria o blob
  const blob = Utilities.newBlob(decoded, MimeType.PNG, imagem.nome);

  //salva no Drive
  const file = folder.createFile(blob);
  file.setName(imagem.nome);

  //torna o arquivo público
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  //extrai o ID do arquivo
  const fileId = file.getId();

  //gera o link direto para visualização da imagem
  //indicado para hiperlink
  const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  /indicado para exibição em célula com a tag image()
  const imageUrl2 = `https://lh3.google.com/u/0/d/${fileId}=k`;



  //insere a fórmula na célula ativa
  //cell.setFormula(`=IMAGE("${imageUrl}")`);
  cell.setValue(imageUrl);

  return imageUrl;
}



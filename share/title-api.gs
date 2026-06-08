/**
 * Title API — endpoint mínimo para o /share buscar o nome de um relatório.
 *
 * Deploy:
 *   1. script.google.com → Novo projeto → cole este código.
 *   2. Implantar → Nova implantação → tipo "App da Web".
 *        - Executar como: Eu
 *        - Quem tem acesso: Qualquer pessoa
 *   3. Copie a URL terminada em /exec e cole em TITLE_API no share/index.html.
 *
 * Chamada: GET .../exec?id=<fileId|publishId>&type=<slides-edit|slides|docs|docs-pub|looker>
 * Resposta: { "title": "Nome do relatório" }   (string vazia se não encontrar)
 */

function doGet(e) {
  var p = (e && e.parameter) || {};
  var id = String(p.id || '').trim();
  var type = String(p.type || '').trim();
  var title = '';
  try { title = resolveTitle(id, type); } catch (err) { title = ''; }
  return ContentService
    .createTextOutput(JSON.stringify({ title: title }))
    .setMimeType(ContentService.MimeType.JSON);
}

function resolveTitle(id, type) {
  if (!id) return '';

  // 1) Arquivos do Drive (edit/looker): nome limpo e funciona até em privados que você possui.
  if (type === 'slides-edit' || type === 'docs' || type === 'looker' || type === '') {
    var driveId = id.split('/')[0]; // looker pode vir "uuid/page/xxxx"
    try {
      var name = DriveApp.getFileById(driveId).getName();
      if (name) return name.trim();
    } catch (e1) { /* sem acesso ou não é arquivo do Drive → cai no fallback */ }
  }

  // 2) Fallback: busca o HTML público e extrai o <title>.
  var url = publicUrl(id, type);
  if (!url) return '';
  var resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
  if (resp.getResponseCode() !== 200) return '';
  var m = resp.getContentText().match(/<title>([^<]*)<\/title>/i);
  return m ? cleanTitle(m[1]) : '';
}

function publicUrl(id, type) {
  if (type === 'slides')      return 'https://docs.google.com/presentation/d/e/' + id + '/pubembed';
  if (type === 'slides-edit') return 'https://docs.google.com/presentation/d/' + id + '/edit';
  if (type === 'docs-pub')    return 'https://docs.google.com/document/d/e/' + id + '/pub';
  if (type === 'docs')        return 'https://docs.google.com/document/d/' + id + '/edit';
  return '';
}

// remove sufixos do tipo " - Google Slides" / " - Google Apresentações"
function cleanTitle(t) {
  return String(t).replace(/\s*[-–]\s*Google[^-–]*$/i, '').trim();
}

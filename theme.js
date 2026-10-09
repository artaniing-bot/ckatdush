// Tema e errët / e çelët — ruhet në shfletues. Ekzekutohet herët që të mos pulsojë faqja.
(function(){
  var t = null;
  try{ t = localStorage.getItem('theme'); }catch(e){}
  if(t === 'dark') document.documentElement.setAttribute('data-theme','dark');
})();
function themeIsDark(){ return document.documentElement.getAttribute('data-theme') === 'dark'; }
function syncThemeBtn(){
  var b = document.getElementById('themeBtn');
  if(b){ b.textContent = themeIsDark() ? '☀️' : '🌙'; b.setAttribute('aria-label', themeIsDark() ? 'Tema e çelët' : 'Tema e errët'); }
}
function toggleTheme(){
  if(themeIsDark()) document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme','dark');
  try{ localStorage.setItem('theme', themeIsDark() ? 'dark' : 'light'); }catch(e){}
  syncThemeBtn();
}
document.addEventListener('DOMContentLoaded', syncThemeBtn);

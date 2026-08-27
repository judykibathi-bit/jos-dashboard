(function(){
  function serviceYearInfo(date){
    var d=date||new Date(), y=d.getFullYear(), m=d.getMonth();
    var startYear=m>=8?y:y-1;
    var start=new Date(startYear,8,1), end=new Date(startYear+1,7,31,23,59,59,999);
    var monthIndex=(m>=8?m-8:m+4);
    return {startYear:startYear,start:start,end:end,monthIndex:monthIndex,label:startYear+'/'+String(startYear+1).slice(-2),full:start.toLocaleDateString([], {day:'numeric',month:'long',year:'numeric'})+' – '+end.toLocaleDateString([], {day:'numeric',month:'long',year:'numeric'})};
  }
  function render(){
    var info=serviceYearInfo();
    var old=document.getElementById('josServiceYear');
    if(old) old.remove();
    var months=['SEP','OCT','NOV','DEC','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG'];
    var panel=document.createElement('section'); panel.id='josServiceYear'; panel.className='panel';
    var pct=Math.max(0,Math.min(100,((Date.now()-info.start.getTime())/(info.end.getTime()-info.start.getTime()))*100));
    panel.innerHTML='<div class="head"><div><div class="title">Service Year</div><h2 style="margin:6px 0">'+info.label+'</h2></div><div class="sub">'+info.full+'</div></div>'+
      '<div class="row" style="justify-content:space-between"><span class="meta">September → August</span><strong id="josSYMonth">'+months[info.monthIndex]+'</strong></div>'+
      '<div style="display:grid;grid-template-columns:repeat(12,1fr);gap:4px;margin:12px 0 8px">'+months.map(function(x,i){return '<div style="text-align:center;font:10px IBM Plex Mono;color:'+(i===info.monthIndex?'var(--ink)':'var(--faint)')+';padding:7px 2px;border-bottom:'+(i===info.monthIndex?'2px solid var(--green)':'1px solid var(--border)')+'">'+x+'</div>'}).join('')+'</div>'+
      '<div class="progress"><div class="fill" style="width:'+pct.toFixed(1)+'%"></div></div><div class="meta">'+pct.toFixed(0)+'% of the service year elapsed</div>';
    var app=document.getElementById('app'); if(app) app.insertBefore(panel,app.children[1]||null);
    window.JOSServiceYear=info;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
})();

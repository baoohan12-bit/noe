// NOE · Meta Pixel cho trang vé webinar
(function(){
 var C=window.NOE_PAY||{}, ID=C.PIXEL_ID; if(!ID) return;
 !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
 s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
 var o={}; try{o=JSON.parse(sessionStorage.getItem('noe_order')||'{}');}catch(x){}
 // Advanced matching: Meta tự băm email trước khi gửi
 if(o.email) fbq('init',ID,{em:o.email}); else fbq('init',ID);
 fbq('track','PageView');
 window.noeTrack=function(ev,params,opts){try{fbq('track',ev,params||{},opts||{});}catch(x){}};
})();

$(document).ready(function() {
     $('#key').bind('cut copy paste', function(event) {
         event.preventDefault();
     }); 
 });

 $(document).ready(function() {
     $('#code').bind('cut copy', function(event) {
         event.preventDefault();
     }); 
 });
 
var senha = $('#key');
var olho= $("#olho");

olho.mousedown(function() {
  senha.attr("type", "text");
});

olho.mouseup(function() {
  senha.attr("type", "password");
});
  $("#olho" ).mouseout(function() { 
  $("#key").attr("type", "password");
});

function genNumAndLetter2(cont) {
    let randomNum = Math.round(Math.random() * (cont-1));
    return randomNum
}

function seqNumLetra() {
    var letra_num = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","!","@","#","$","%","&","_","-","+","=","/","?",":",";",".","<",">"];
    var client;
    var vetor =[];
    var y=0;
    var x=0;
    var flag=0;
    while(x<18){
        vetor[x]=letra_num[genNumAndLetter2(letra_num.length)]; 
        while(y<x && flag==0 && x>=1) {
            if (vetor[x] == vetor[y]){
                flag=1;
            }
            else{
                y++;
            }
        }
        if(flag==0){
            x++;
        }
        y=0;
        flag=0;
    }
    client = vetor.join('');
    document.getElementById('gerado').innerText = client;
}

function cryptar() {
    var text = document.getElementById('gerado').value;
    var textBytes = aesjs.utils.utf8.toBytes(text);
    var keyAsText = document.getElementById('key').value;
    if(keyAsText.length<16){
        for(x=keyAsText.length;x<16;x++){
            keyAsText = keyAsText.concat('*');
        }
    }
    if(keyAsText.length>16){
        document.getElementById('encriptada').innerText="ERRO!!! A CHAVE DEVE CONTER NO MÁXIMO 16 CARCTERES";;
    }
    else{
        var key = aesjs.utils.utf8.toBytes(keyAsText);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        var base64String = hexToBase64(encryptedHex);
        document.getElementById('encriptada').innerText = base64String;                    
    }
}

function decryptar() {
    var keyAsText = document.getElementById('key').value;
    if(keyAsText.length<16){
        for(x=keyAsText.length;x<16;x++){
            keyAsText = keyAsText.concat('*');
        }
    }
    if(keyAsText.length>16){
        document.getElementById('desencriptada').innerText="ERRO!!! A CHAVE DEVE CONTER NO MÁXIMO 16 CARCTERES";
    }
    else{
        var key = aesjs.utils.utf8.toBytes(keyAsText);
        var codigo = document.getElementById('code').value;
        var encryptedHex = base64ToHex(codigo);

        var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        document.getElementById('desencriptada').innerText = decryptedText;
    }
}

var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}


function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
      str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}
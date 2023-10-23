var checked = []
var count=0;
var all = []
for (var i=0;i<25;i++){
all.push(document.getElementById((i+1).toString()));
}
var value=1;
var num;
var mode = confirm("Do you want me to pick the numbers for you?")
if(mode){
    document.getElementById('game').textContent="Game Mode: Random Mode"
num = 0
}else{num=[]
         document.getElementById('game').textContent="Game Mode: Custom Mode"
}

if(mode){
    num=[];
for(var i = 1;i<=25;i++){
       
    num.push(i)

}
  num.sort(() => Math.random() - 0.5);

}

var clicked=[]


var dones = []

for(var i = 0;i<25;i++){
    console.log(i);
        dones.push(false);
        if(mode){
    all[i].textContent = num[i];}
}

function init(wh){
    if(!clicked[wh]){
        all[wh].textContent=value;
        clicked[wh]=true;
        value++;
        num++;
    }else{
        alert('This box\'s value has already been set. It is '+all[wh].textContent+'. You need to click '+value+".")
    }
}

function chk_d1(){
    for (var r=0;r<25;r+=6){
        if(dones[r]==false){
            return 0;
        }      
    }
 return 1
}

function chk_d2(){
    for (var r=4;r<=20;r+=4){
        if(dones[r]==false){
           return 0;
        }      
    }return 1;
    
}

function chk_h(row){
    //debugger;
    var b=row*5,f=0;
    for(var i =b;i<b+5;i++){
        if(dones[i]==false){
            return 0;
        }
    }
    return 1;
    
}

function chk_v(col){
    var end=col+20;
    for(var i =col;i<=end;i+=5){
        if(dones[i]==false){
            return 0;
        }
    }
    return 1;
    
}

function minus_count(wch){
    var minus=0;var row,col;
    row=parseInt(which/5);
    col=which%5;
    minus+=chk_h(row)+chk_v(col);
    if(row==col){
        if(row==2){
        minus+=chk_d2();
        }
        minus+=chk_d1();
    }
    else if(row+col==4){
    minus+=chk_d2();
    }
    count-=minus;
    if(minus>0){
        document.getElementById('finished1').textContent=""}

}

function chk_bingo(){

    var z = "BINGO"
    document.getElementById('finished').textContent=z.substr(0,count);
    
if(count==5){
    document.getElementById('finished1').textContent="GAME OVER"
}
}
var which;
function change(wh){
    //debugger;
    if(mode){num=25;}
        which=wh;
    if(num<25){
        init(wh)
        return
        }

    if(!dones[which]){
        all[which].classList.add('other')
        dones[which]=true;
    }else{
        var permit;
        permit=confirm('Do you want to unmark '+all[wh].textContent)//yes or no 
            
        if(permit){//--yes
        minus_count(which)
        all[which].classList.remove('other')
        dones[which]=false;
        }else{return}
    }
    var row,col;
    row=parseInt(which/5);
    col=which%5;
    count+=chk_h(row)+chk_v(col);
    if(row==col){
        if(row==2){
        count+=chk_d2();
        }
        count+=chk_d1();
    }
    else if(row+col==4){
    count+=chk_d2();
    }
    chk_bingo();
}
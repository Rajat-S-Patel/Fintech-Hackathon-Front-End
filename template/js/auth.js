async function login(){
    let username = document.getElementById('exampleInputEmail1').value;
    let password = document.getElementById('exampleInputPassword1').value;

    await fetch("http://localhost:8080/login", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        username,password
        })
    }).then(data=>{
        if(data.status == 200){
        return data.text();
        }else{
        alert("Invalid username or password");
        }
    }).then(data=>{
        data = JSON.parse(data);
        if(data.jwt){
        localStorage.setItem("jwt",data.jwt);
        window.location="../../main-page.html";
        
        }
        else{
        alert("Invalid username or password");
        }
    });
}
function logout(){
    localStorage.removeItem("jwt");
    window.location.href="/pages/forms/login.html";
}

function getHeader(){
    let token = localStorage.getItem("jwt");
    return {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    };
}

async function getUserName(){
    const userName = await fetch('http://localhost:8080/user',{
        method:'GET',
        headers:getHeader()
    }).then(res=> {
        return res.text();
    });

    document.getElementById('username').innerHTML=userName;
   
}
function test(){
    fetch("http://localhost:5050/search/APPL",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then(res=>{
        return res.text();
    }).then(data=>{
        console.log(JSON.parse(data));
    });
}
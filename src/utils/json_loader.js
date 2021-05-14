var jsonLoader = (url,callback)=>{
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = ()=>{
        if (request.status==200){
            var json = JSON.parse(request.responseText);
            console.log("json load success");
            if (callback){
                console.log("json callback");
                callback(json);
            }
        }
    }
}
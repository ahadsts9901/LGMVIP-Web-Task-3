function getnumber (num) {
    
    let result = document.getElementById("number");

    result.value += num

}

function Clear() {
    let result = document.getElementById("number")

    result.value = ""
}

function Result() {
    let result = document.getElementById("number")
    
    result.value = eval(result.value)
    
}

function Back() {

    var str = document.getElementById('number').value
    str = str.substr(0,str.length-1)
    document.getElementById('number').value = str

}
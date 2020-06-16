var res = {
  data: {
    code: 400,
    msg: "123",
    data:null,
  },
  config: {
    url: "url1"
  }
}

var {code, msg} =res.data
test(code, msg)
var {data:{code, msg}, config} =res


function test(code, msg) {
  console.log(code)
  console.log(msg)
}

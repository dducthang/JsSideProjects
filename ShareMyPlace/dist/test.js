function returnResult(result){
    setTimeout(() => {
      result = 'result';
    }, 2000);
  }
async function resolveAfter2Seconds() {
    let result = 'hello mother fucker';
    
    result = await returnResult();
    return result;
  }
  
  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }
  
  asyncCall();
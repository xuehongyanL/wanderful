function colorValidator(value){
  let pat = /#[0-9abcdefABCDEF]{6}/;
  return pat.test(value);
}

export default colorValidator;
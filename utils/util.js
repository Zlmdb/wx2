function indexData(data){
  let newData = data.map((value, index, array) =>
  // console.log(value)
  {
    let data1 = value.update('estimated_yearly_return', value => (parseFloat(value)).toFixed(4) * 100 + '%')
    let data2 = data1.update('bedrooms_min', value => parseInt(value))
    let data4 = data2.update('bedrooms_max', value => parseInt(value))
    // let data4 = data3.update('photo_json', value => JSON.parse(value))
    let property_type = data4.get('property_type')
    switch (property_type) {
      case 'house':
        return data4.set('property_type_zh', '独栋别墅');
        break;
      case 'apartmenet':
        return data4.set('property_type_zh', '公寓');
        break;
      case 'townhouse':
        return data4.set('property_type_zh', '联排别墅');
        break;
      case 'multi-family house':
        return data4.set('property_type_zh', '多户住宅');
        break;
    }
  }
  )
  return newData
}
// exports.indexData=indexData
module.exports = {
  indexData: indexData
};
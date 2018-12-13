
let instance
class Config {
  constructor() {
    if (instance)
      return instance
    instance = this
    //----------------------------
    this.UpdateRate = 60
    this.CtrlLayers = {   //玩家操控层
      Background: {
        DefaultActive: false
      }
    }
    this.Bullet = {
      Speed: 10,  //每次数据更新，并非每个单位时间 //IMPROVE
      Type: 'single'
    }
    this.GodMode = false
    //----------------------------
  }
}

const subscription = new Map()  //propName --> callbackSet
const propNameStack = []
const observable = obj => {
  return (obj.__isProxy !== undefined) ? obj : //already a Proxy
    new Proxy(obj, {
      get(target, key, receiver) {
        //return Config[key]
        if (key === '__isProxy') //Proxy property
          return true
        if (key === 'subscribe') //Proxy public function
          return this.subscribe
        const result = Reflect.get(target, key, receiver)
        if (typeof result === 'object' && !result.__isProxy) {
          const observableResult = observable(result)
          Reflect.set(target, key, observableResult, receiver)
          observableResult.keyStroke = (target.keyStroke === undefined) ? key : target.keyStroke + '.' + key
          return observableResult
        }
        return result
      },
      set(target, key, value, receiver) {
        if (target[key] != value){
          let oldValue = target[key]
          let res = Reflect.set(target, key, value, receiver)
          if (!res)
            return false
          if (!value.__isProxy){
            let propName = (target.keyStroke === undefined) ? key : target.keyStroke + '.' + key
            this.onPropertyChanged(propName, value, oldValue)
          }
          return res
        }
        return true
      },
      subscribe(propName, callback) {
        let callbackSet = subscription.get(propName)
          || subscription.set(propName, new Set()).get(propName) //cannot use WeakSet
        callbackSet.add(callback)
      },
      onPropertyChanged(name, value, oldValue) {
        let callbackSet = subscription.get(name)
        if (callbackSet !== undefined)
          for (let callback of callbackSet) {
            callback(name, value, oldValue) //IMPROVE: allow interruption
          }
      }
    })
}

const configProxy = observable(new Config())

//NOTE: cannot use ES6 style export
// export {
//   Config as configProxy
// }
module.exports = {
  Config: configProxy
}
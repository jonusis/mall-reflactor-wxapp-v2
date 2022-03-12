import { Component } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro';
import ph0 from '../../static/image/fenxiang.png'
import ph1 from '../../static/image/gerenxinxi.png'
import ph2 from '../../static/image/wodedingdan.png'
import '../../static/image/sharepp.png'
import { UserBto } from 'src/common/resultType/user';
import { AtIcon } from 'taro-ui';

interface IndexProps{
}
interface IndexState{
  userInfo:UserBto,
  isLogin:boolean
}
export default class Index extends Component<IndexProps,IndexState> {

  constructor(props:IndexProps){
    super(props);
    this.state={
      userInfo:{} as UserBto,
      isLogin:false
    }
  }
  componentWillMount () { }

  componentDidMount () {
    const hasLogin = Taro.getStorageSync('userInfo');
    if(hasLogin){
      const data = Taro.getStorageSync('userInfo');
      this.setState({userInfo:data,isLogin:true});
    }else{
      Taro.navigateTo({url: "/pages/login/index"});
    }
   }
   onLogin(){
    Taro.navigateTo({url: "/pages/login/index"});
  }
  toPageMessage() {
    Taro.navigateTo({
      url: '/pages/personMessage/index',
    })
  }
  toPageRecord() {
    const {userInfo} = this.state;
    Taro.navigateTo({
      url: `/pages/record/index?id=${userInfo.uid}`,
    })
  }
  componentWillUnmount () { }

  componentDidShow () {
    const hasLogin = Taro.getStorageSync('userInfo');
    if(hasLogin){
      const data = Taro.getStorageSync('userInfo');
      this.setState({userInfo:data,isLogin:true});
    }else{
      Taro.navigateTo({url: "/pages/login/index"});
    }
  }

  componentDidHide () { }

  onShareAppMessage (res) { //放在父组件上执行，子组件上不被执行！
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '校园拼单小程序',
      path: 'pages/person/index',
      imageUrl: '../../static/image/sharepp.png',
    }
  }

  render () {
      const {userInfo,isLogin} = this.state;
      return (
        <View>
          <View className='user'>
            {isLogin === false ? <View className="avatar" onClick={this.onLogin.bind(this)}></View> : <View className='avatar'><Image className='avater-img' src={userInfo.headPicture}></Image> </View>}
            {isLogin  === false ? <View className="name" >请登录</View> : <View className="name" style={{color:'pink'}}>{userInfo.name}</View>}
          </View>
          <View className='choose-box'>
          <View className='page-section' onClick={()=>this.toPageRecord()}>
            <View className='line'>
              <Image className='pho' src={ph2} />
              <Text className='address'>我的订单</Text>
            </View>
              <AtIcon className='icon-chevron' value='chevron-right' size='20' color='grew'></AtIcon>
            </View>
            <View className='page-section'onClick={()=>this.toPageMessage()}>
            <View className='line'>
              <Image className='pho' src={ph1} />
              <Text className='address'>个人信息</Text>
            </View>
              <AtIcon className='icon-chevron' value='chevron-right' size='20' color='grew'></AtIcon>
            </View>
            <Button openType="share">
            <View className='page-section'>
              <View className='line'>
              <Image className='pho' src={ph0}></Image>
              <Text className='address'>分享小程序</Text>
              </View>
              <AtIcon className='icon-chevron' value='chevron-right' size='20' color='grew'></AtIcon>
            </View>
          </Button>
          </View>
        </View>
    )
  }
}

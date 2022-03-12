import { Component } from 'react'
import { View, Text,Image,Button } from '@tarojs/components'
import  threeman from '../../static/image/three-people.png';
import './index.scss'
import Taro from '@tarojs/taro';

interface IndexProps{
}
interface IndexState{
}
export default class Index extends Component<IndexProps,IndexState> {
  constructor(props:IndexProps){
    super(props);
    this.state={
    }
  }
  toPageBuy(){
    const hasLogin = Taro.getStorageSync('userInfo');
    if(hasLogin){
      Taro.navigateTo({
        url: `/pages/add/add`
      })
    }else{
      Taro.showToast({
        title:'登陆后才能进行下面操作',
        duration:2000
      })
      Taro.navigateTo({url:'/pages/login/login'})
    }
}
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
        <View className='bac1'>
        <View className='pic1'>
        <Image src={threeman} className='threeman1'></Image>
        </View>
        <View className='btn_choose1'>
        <Button className='footer1' onClick={this.toPageBuy}>发起拼单</Button>
      </View>
      <Text className={"tips1"}>快来发起拼单吧～</Text>
    </View>
    )
  }
}

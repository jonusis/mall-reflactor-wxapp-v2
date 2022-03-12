/* eslint-disable react/no-unescaped-entities */
import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { OrderBuyArrayBto } from 'src/common/resultType/OrderBuy'
import './nopic-tab.scss'
import '../../static/image/full.png'

interface NopicTabProps{
  orderList:OrderBuyArrayBto
}
interface NopicTabState{
  full:boolean
}
export default class NopicTab extends PureComponent<NopicTabProps,NopicTabState> {

  constructor(props:NopicTabProps){
    super(props);
    this.state = {
      full:false
    }
  }

  changPage = () => {
    const id = this.props.orderList.id
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + `${id}`
  })
}
toPage = () => {
  const id = this.props.orderList.id
  Taro.navigateTo({
    url: '/pages/publish_two/publish_two?id=' + `${id}`
})
}

componentWillMount () {
  const {orderList}=this.props
  if(orderList.numExist == orderList.numNeed){
    this.setState({
      full:true
    })
  }
 }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {orderList}=this.props;
    const {full} = this.state;
    return (
      <View className='box' onClick={this.changPage.bind(this)}>
      <View className='header'>
        <View className='numberOfpinpin' >已拼{orderList.numExist}/{orderList.numNeed} 
      </View>
      </View>
        <View className='description'>
        <Image className={full?'pic':'none'} src='../../static/image/full.png'></Image>
        <View className='title1'>{orderList.heading}</View>
        <View className='cont'>{orderList.content}</View>
        <View className='time'>下单时间：{new Date(parseInt(orderList.datetime)).toLocaleString().replace(/:\d{1,2}$/,' ')}</View>
        <View className='place'>地点：{orderList.location}</View>
        </View>
        <View className='button-box'>
        </View>
      </View>
    )
  }
}

/* eslint-disable react/no-unescaped-entities */
import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './small-tab.scss'
import '../../static/image/full.png'
import { OrderBuyArrayBto } from 'src/common/resultType/OrderBuy'

interface SmallTabProps{
  orderList:OrderBuyArrayBto
}
interface SmallTabState{
  full:boolean
}
export default class SmallTab extends PureComponent<SmallTabProps,SmallTabState> {

  constructor(props:SmallTabProps){
    super(props);
    this.state = {
      full:false
      }
    }

  changPage(){
    var id = this.props.orderList.id
    Taro.navigateTo({
      url: '../detail/index?id=' + `${id}`
  })
}
  toPage(){
    var id = this.props.orderList.id
    Taro.navigateTo({
      url: '../publish_two/publish_two?id=' + `${id}`
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
    const {orderList}=this.props
    const {full} = this.state
    return (
      <View className='box' onClick={this.changPage.bind(this)}>
      <View className='header'>
        <View className='numberOfpinpin' >已拼{orderList.numExist}/{orderList.numNeed} 
      </View>
      </View>
      <View className='cnt_box'>
        <Image className='description-picture'
        src={orderList.picture}
      ></Image>
        <View className='descriptionx'>
        <View className='title2'>{orderList.heading}</View>
        <View className='cont'>{orderList.content}</View>
        </View>
        </View>
        <View className='time'>下单时间：{new Date(parseInt(orderList.datetime)).toLocaleString().replace(/:\d{1,2}$/,' ')}</View>
        <View className='place'>地点：{orderList.location}</View>
        <View className='button-box'>
        </View>
      </View>
      // <View className='box' onClick={this.changPage.bind(this)} data-id={orderList.id}>
      // <View className='header'>
      // <View className='numberOfpinpin' >已拼{orderList.numExist}/{orderList.numNeed} 
      // </View>
      // </View>
      // <View className='cnt_box'>
      // <Image className='description-picture'
      //   src={orderList.picture}
      // ></Image>
      //   <View className='description'>
      //   <View className='title'>{orderList.heading}</View>
      //   <View className='time'>下单时间：{new Date(parseInt(orderList.datetime)).toLocaleString().replace(/:\d{1,2}$/,' ')}</View>
      //   <View className='place'>地点：{orderList.location}</View>
      //   </View>
      //   </View>
      //   <Image className={orderList.full === 1?'pic':'none'} src='../../static/image/full.png'></Image>
      // </View>
    )
  }
}

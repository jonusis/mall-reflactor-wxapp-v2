import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtGrid, AtSearchBar } from 'taro-ui'
import swiper1 from '../../static/image/pintuans3.png'
import swiper2 from '../../static/image/pintuans4.png'
import waimai from '../../static/image/waimai.png'
import shop from '../../static/image/shop.png'
import travel from '../../static/image/travel.png'
import huiyuan from '../../static/image/huiyuan.png'
import qita from '../../static/image/qita.png'




import './index.scss'
import Taro from '@tarojs/taro'

interface IndexProps{

}
interface IndexState{
  searchBar:string
}
export default class Index extends Component<IndexProps,IndexState> {
  constructor(props:IndexProps){
    super(props);
    this.state={
      searchBar:""
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChangeSearchBar = (value: string) => {
    this.setState({
      searchBar:value
    })
  }

  render () {
    const {searchBar} = this.state;
    return (
      <View className='index'>
        <AtSearchBar
        value={searchBar} 
        onChange={this.onChangeSearchBar}
        />
        <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots>
            <SwiperItem>
              <View className='demo-text-1'>
                <Image
                  style='width: 100%;height: 150px;background: #fff;'
                  src={swiper1}
                />
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text-2' style={{display: 'flex',justifyContent:'center'}}>
                <Image
                  style='width: 220px;height: 160px;background: #fff;'
                  src={swiper2}
                />
              </View>
            </SwiperItem>
          </Swiper>
          <AtGrid data={
            [
              {
                image: travel,
                value: '拼团旅行',
                onClick:(index:number):void => {Taro.navigateTo({url:`tab/list?id=${index}`})}
              },
              {
                image: waimai,
                value: '拼团外卖',
                onClick:(index:number):void => {Taro.navigateTo({url:`tab/list?id=${index}`})}
              },
              {
                image: shop,
                value: '拼团购物',
                onClick:(index:number):void => {Taro.navigateTo({url:`tab/list?id=${index}`})}
              },
              {
                image: huiyuan,
                value: '会员账号',
                onClick:(index:number):void => {Taro.navigateTo({url:`tab/list?id=${index}`})}
              },
              {
                image: qita,
                value: '其他'
              },
            ]
          } />
            <View className='recommend_title'>推荐</View>
      </View>
    )
  }
}
